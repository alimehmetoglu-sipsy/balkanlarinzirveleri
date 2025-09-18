// Engagement Manager for hashtag and comment interactions

import { logger } from './logger';
import { InstagramBrowserController } from './browser-controller';
import {
  HashtagEngagementConfig,
  CommentTemplate,
  ActionLog,
  AutomationConfig
} from './types';

export class EngagementManager {
  private actionHistory: Map<string, Date> = new Map();
  private dailyActionCounts: {
    likes: number;
    comments: number;
    follows: number;
    date: string;
  };

  constructor(
    private browser: InstagramBrowserController,
    private config: AutomationConfig
  ) {
    this.dailyActionCounts = {
      likes: 0,
      comments: 0,
      follows: 0,
      date: new Date().toDateString()
    };
  }

  async engageWithHashtag(hashtag: string): Promise<ActionLog[]> {
    const logs: ActionLog[] = [];
    const sessionId = `hashtag_${hashtag}_${Date.now()}`;

    try {
      logger.info(`Starting hashtag engagement for #${hashtag}`);

      // Check rate limits
      if (!this.checkRateLimits()) {
        logger.warn('Rate limits reached, skipping engagement');
        return logs;
      }

      // Get posts for hashtag
      const posts = await this.browser.getHashtagPosts(
        hashtag,
        this.config.engagement.hashtag.limits.maxLikesPerHashtag
      );

      if (posts.length === 0) {
        logger.info(`No posts found for #${hashtag}`);
        return logs;
      }

      for (const postUrl of posts) {
        // Check if we've already interacted with this post
        if (this.hasRecentlyInteracted(postUrl)) {
          logger.debug(`Already interacted with ${postUrl}, skipping`);
          continue;
        }

        // Random delay between actions
        await this.humanDelay();

        // Perform engagement actions based on config
        const hashtagConfig = this.config.engagement.hashtag;

        if (hashtagConfig.actions.like && this.canPerformAction('like')) {
          const success = await this.likePost(postUrl);
          logs.push(this.createActionLog('like', postUrl, success, sessionId));

          if (success) {
            this.dailyActionCounts.likes++;
            this.recordInteraction(postUrl);
          }
        }

        if (hashtagConfig.actions.comment && this.canPerformAction('comment')) {
          const comment = this.generateComment(hashtag);
          const success = await this.commentOnPost(postUrl, comment);
          logs.push(this.createActionLog('comment', postUrl, success, sessionId, { comment }));

          if (success) {
            this.dailyActionCounts.comments++;
            this.recordInteraction(`${postUrl}_comment`);
          }
        }

        if (hashtagConfig.actions.follow && this.canPerformAction('follow')) {
          // Extract username from post URL (simplified)
          const username = this.extractUsernameFromPost(postUrl);
          if (username) {
            const success = await this.followUser(username);
            logs.push(this.createActionLog('follow', username, success, sessionId));

            if (success) {
              this.dailyActionCounts.follows++;
              this.recordInteraction(`follow_${username}`);
            }
          }
        }

        // Check if we've reached limits for this hashtag
        const hashtagActions = logs.filter(log => log.sessionId === sessionId);
        if (hashtagActions.filter(log => log.action === 'like' && log.success).length >= hashtagConfig.limits.maxLikesPerHashtag) {
          logger.info(`Reached like limit for #${hashtag}`);
          break;
        }
        if (hashtagActions.filter(log => log.action === 'comment' && log.success).length >= hashtagConfig.limits.maxCommentsPerHashtag) {
          logger.info(`Reached comment limit for #${hashtag}`);
          break;
        }
      }

      logger.info(`Completed hashtag engagement for #${hashtag}. Actions: ${logs.length}`);
    } catch (error) {
      logger.error(`Failed hashtag engagement for #${hashtag}`, error);
      logs.push(this.createActionLog('hashtag_engagement', hashtag, false, sessionId, { error }));
    }

    return logs;
  }

  async engageWithAllHashtags(): Promise<ActionLog[]> {
    const allLogs: ActionLog[] = [];
    const hashtags = this.config.engagement.hashtag.hashtags;

    for (const hashtag of hashtags) {
      // Check if we should pause (night time or weekend)
      if (this.shouldPause()) {
        logger.info('Pausing engagement due to schedule restrictions');
        break;
      }

      const logs = await this.engageWithHashtag(hashtag);
      allLogs.push(...logs);

      // Delay between hashtags
      await this.wait(this.config.safety.delays.betweenHashtags * 1000);
    }

    return allLogs;
  }

  private generateComment(hashtag: string): string {
    const templates = this.config.engagement.hashtag.commentTemplates;

    // Find relevant templates based on hashtag/category
    let relevantTemplates = templates.filter(t =>
      t.category.toLowerCase() === hashtag.toLowerCase() ||
      t.contextKeywords?.some(keyword => hashtag.includes(keyword))
    );

    // Fall back to all templates if no specific match
    if (relevantTemplates.length === 0) {
      relevantTemplates = templates;
    }

    if (relevantTemplates.length === 0) {
      // Default comments if no templates configured
      const defaults = [
        'Amazing view!',
        'Beautiful capture!',
        'Love this!',
        'Stunning!',
        'Incredible shot!'
      ];
      return defaults[Math.floor(Math.random() * defaults.length)];
    }

    // Select random template category
    const template = relevantTemplates[Math.floor(Math.random() * relevantTemplates.length)];

    // Select random comment from template
    const comment = template.templates[Math.floor(Math.random() * template.templates.length)];

    // Add emojis if enabled
    if (template.useEmojis) {
      const emojis = ['🔥', '❤️', '😍', '🙌', '💯', '✨', '🎉', '👏', '🌟', '💪'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      return `${comment} ${randomEmoji}`;
    }

    return comment;
  }

  async manageComments(): Promise<ActionLog[]> {
    const logs: ActionLog[] = [];
    const sessionId = `comment_management_${Date.now()}`;

    try {
      logger.info('Starting comment management');

      // This would fetch recent comments on user's posts
      // For now, we'll simulate with mock data
      const comments = await this.fetchRecentComments();

      for (const comment of comments) {
        const sentiment = this.analyzeCommentSentiment(comment.text);

        if (sentiment === 'positive' && this.config.engagement.commentManagement.autoLikePositive) {
          // Like positive comments
          const success = await this.likeComment(comment.id);
          logs.push(this.createActionLog('like_comment', comment.id, success, sessionId));
        }

        if (sentiment === 'negative' && this.config.engagement.commentManagement.hideNegative) {
          // Hide negative comments
          const success = await this.hideComment(comment.id);
          logs.push(this.createActionLog('hide_comment', comment.id, success, sessionId));
        }

        // Auto-reply if templates match
        const reply = this.generateAutoReply(comment.text);
        if (reply) {
          const success = await this.replyToComment(comment.id, reply);
          logs.push(this.createActionLog('reply_comment', comment.id, success, sessionId, { reply }));
        }
      }

      logger.info(`Completed comment management. Processed ${comments.length} comments`);
    } catch (error) {
      logger.error('Failed comment management', error);
      logs.push(this.createActionLog('comment_management', 'all', false, sessionId, { error }));
    }

    return logs;
  }

  private analyzeCommentSentiment(text: string): 'positive' | 'negative' | 'neutral' | 'spam' {
    const lowerText = text.toLowerCase();
    const { keywords } = this.config.engagement.commentManagement;

    // Check for spam
    if (keywords.spam.some(keyword => lowerText.includes(keyword))) {
      return 'spam';
    }

    // Check for negative sentiment
    if (keywords.negative.some(keyword => lowerText.includes(keyword))) {
      return 'negative';
    }

    // Check for positive sentiment
    if (keywords.positive.some(keyword => lowerText.includes(keyword))) {
      return 'positive';
    }

    return 'neutral';
  }

  private generateAutoReply(commentText: string): string | null {
    const templates = this.config.engagement.commentManagement.autoReplyTemplates;

    for (const template of templates) {
      if (template.contextKeywords?.some(keyword =>
        commentText.toLowerCase().includes(keyword.toLowerCase())
      )) {
        const replies = template.templates;
        return replies[Math.floor(Math.random() * replies.length)];
      }
    }

    return null;
  }

  private async fetchRecentComments(): Promise<any[]> {
    // This would fetch real comments from Instagram
    // For now, return mock data
    return [
      { id: 'comment1', text: 'Beautiful mountain views!', author: 'user1' },
      { id: 'comment2', text: 'Love your content', author: 'user2' }
    ];
  }

  private async likeComment(commentId: string): Promise<boolean> {
    // Implementation would use browser controller
    logger.debug(`Liking comment: ${commentId}`);
    return true;
  }

  private async hideComment(commentId: string): Promise<boolean> {
    // Implementation would use browser controller
    logger.debug(`Hiding comment: ${commentId}`);
    return true;
  }

  private async replyToComment(commentId: string, reply: string): Promise<boolean> {
    // Implementation would use browser controller
    logger.debug(`Replying to comment ${commentId}: ${reply}`);
    return true;
  }

  private async likePost(postUrl: string): Promise<boolean> {
    return await this.browser.likePost(postUrl);
  }

  private async commentOnPost(postUrl: string, comment: string): Promise<boolean> {
    return await this.browser.commentOnPost(postUrl, comment);
  }

  private async followUser(username: string): Promise<boolean> {
    return await this.browser.followUser(username);
  }

  private extractUsernameFromPost(postUrl: string): string | null {
    // Extract username from Instagram post URL
    const match = postUrl.match(/instagram\.com\/p\/[^\/]+\/?\??.*?\/([^\/\?]+)/);
    if (match) return match[1];

    // Try alternative pattern
    const match2 = postUrl.match(/instagram\.com\/([^\/]+)\/p\//);
    if (match2) return match2[1];

    return null;
  }

  private hasRecentlyInteracted(identifier: string): boolean {
    const lastInteraction = this.actionHistory.get(identifier);
    if (!lastInteraction) return false;

    const hoursSinceInteraction = (Date.now() - lastInteraction.getTime()) / (1000 * 60 * 60);
    return hoursSinceInteraction < 24; // Don't re-interact within 24 hours
  }

  private recordInteraction(identifier: string) {
    this.actionHistory.set(identifier, new Date());

    // Clean up old entries (older than 7 days)
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    for (const [key, date] of this.actionHistory.entries()) {
      if (date.getTime() < weekAgo) {
        this.actionHistory.delete(key);
      }
    }
  }

  private checkRateLimits(): boolean {
    this.resetDailyCountsIfNeeded();

    const { rateLimits } = this.config.safety;

    if (this.dailyActionCounts.likes >= rateLimits.maxLikesPerHour * 24) return false;
    if (this.dailyActionCounts.comments >= rateLimits.maxCommentsPerHour * 24) return false;
    if (this.dailyActionCounts.follows >= rateLimits.maxFollowsPerHour * 24) return false;

    const totalActions = this.dailyActionCounts.likes +
                        this.dailyActionCounts.comments +
                        this.dailyActionCounts.follows;

    return totalActions < rateLimits.maxActionsPerDay;
  }

  private canPerformAction(action: 'like' | 'comment' | 'follow'): boolean {
    this.resetDailyCountsIfNeeded();

    const { rateLimits } = this.config.safety;
    const hourlyCount = this.getHourlyActionCount(action);

    switch (action) {
      case 'like':
        return hourlyCount < rateLimits.maxLikesPerHour;
      case 'comment':
        return hourlyCount < rateLimits.maxCommentsPerHour;
      case 'follow':
        return hourlyCount < rateLimits.maxFollowsPerHour;
    }
  }

  private getHourlyActionCount(action: 'like' | 'comment' | 'follow'): number {
    // This is simplified - in production, track hourly counts properly
    const dailyCount = this.dailyActionCounts[`${action}s` as keyof typeof this.dailyActionCounts];
    return Math.floor(dailyCount / 24);
  }

  private resetDailyCountsIfNeeded() {
    const today = new Date().toDateString();
    if (this.dailyActionCounts.date !== today) {
      this.dailyActionCounts = {
        likes: 0,
        comments: 0,
        follows: 0,
        date: today
      };
    }
  }

  private shouldPause(): boolean {
    const { antiDetection } = this.config.safety;

    // Check night time
    if (antiDetection.nightTimeHours) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentTime = `${currentHour.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const { start, end } = antiDetection.nightTimeHours;
      if (start > end) {
        // Night time spans midnight
        if (currentTime >= start || currentTime <= end) return true;
      } else {
        if (currentTime >= start && currentTime <= end) return true;
      }
    }

    // Check weekend
    if (antiDetection.pauseOnWeekends) {
      const dayOfWeek = new Date().getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) return true;
    }

    return false;
  }

  private async humanDelay() {
    const { minActionDelay, maxActionDelay } = this.config.safety.delays;
    const delay = Math.floor(Math.random() * (maxActionDelay - minActionDelay) + minActionDelay) * 1000;
    await this.wait(delay);
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private createActionLog(
    action: string,
    target: string,
    success: boolean,
    sessionId: string,
    details?: any
  ): ActionLog {
    return {
      id: `${action}_${Date.now()}`,
      timestamp: new Date(),
      action,
      target,
      success,
      details,
      sessionId
    };
  }

  getStats() {
    return {
      daily: this.dailyActionCounts,
      recentInteractions: this.actionHistory.size,
      lastUpdate: new Date()
    };
  }
}