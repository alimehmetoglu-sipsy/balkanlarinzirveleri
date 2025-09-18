// Direct Message Manager for Instagram Automation

import { logger } from './logger';
import { InstagramBrowserController } from './browser-controller';
import {
  DirectMessageConfig,
  MessageRule,
  ActionLog,
  AutomationConfig
} from './types';

interface ProcessedMessage {
  id: string;
  from: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
  response?: string;
  requiresHumanReview?: boolean;
}

export class DirectMessageManager {
  private processedMessages: Set<string> = new Set();
  private userMessageCounts: Map<string, Map<string, number>> = new Map();
  private conversationHistory: Map<string, ProcessedMessage[]> = new Map();

  constructor(
    private browser: InstagramBrowserController,
    private config: AutomationConfig
  ) {}

  async checkAndProcessMessages(): Promise<ActionLog[]> {
    const logs: ActionLog[] = [];
    const sessionId = `dm_check_${Date.now()}`;

    if (!this.config.directMessages.enabled) {
      logger.info('Direct message automation is disabled');
      return logs;
    }

    try {
      logger.info('Checking direct messages...');

      // Fetch new messages
      const messages = await this.browser.checkDirectMessages();

      if (messages.length === 0) {
        logger.info('No new messages to process');
        return logs;
      }

      logger.info(`Found ${messages.length} new messages`);

      for (const message of messages) {
        // Skip if already processed
        const messageId = this.generateMessageId(message);
        if (this.processedMessages.has(messageId)) {
          logger.debug(`Message already processed: ${messageId}`);
          continue;
        }

        // Process the message
        const processed = await this.processMessage(message);
        logs.push(this.createActionLog(
          'process_dm',
          message.from,
          true,
          sessionId,
          { messageId, response: processed.response }
        ));

        // Store in history
        this.addToConversationHistory(message.from, processed);
        this.processedMessages.add(messageId);

        // Send auto-reply if configured and response generated
        if (processed.response && this.config.directMessages.autoReply.enabled) {
          const success = await this.sendAutoReply(message.from, processed.response);
          logs.push(this.createActionLog(
            'send_dm_reply',
            message.from,
            success,
            sessionId,
            { reply: processed.response }
          ));
        }

        // Flag for human review if needed
        if (processed.requiresHumanReview) {
          logger.warn(`Message from ${message.from} requires human review`, {
            message: message.text,
            reason: 'Matched review criteria'
          });

          logs.push(this.createActionLog(
            'flag_for_review',
            message.from,
            true,
            sessionId,
            { message: message.text }
          ));
        }

        // Add delay between processing messages
        await this.wait(3000 + Math.random() * 2000);
      }

      logger.info(`Processed ${messages.length} direct messages`);

      // Clean up old processed messages (older than 7 days)
      this.cleanupOldData();
    } catch (error) {
      logger.error('Failed to process direct messages', error);
      logs.push(this.createActionLog('dm_check', 'all', false, sessionId, { error }));
    }

    return logs;
  }

  private async processMessage(message: any): Promise<ProcessedMessage> {
    const processed: ProcessedMessage = {
      id: this.generateMessageId(message),
      from: message.from,
      text: message.text,
      timestamp: message.timestamp || new Date(),
      isRead: message.isRead || false
    };

    // Check filters
    if (!this.passesFilters(message)) {
      logger.debug(`Message from ${message.from} filtered out`);
      return processed;
    }

    // Check for spam
    if (this.isSpam(message.text)) {
      logger.warn(`Spam message detected from ${message.from}`);
      processed.response = undefined; // Don't respond to spam
      return processed;
    }

    // Find matching rule
    const matchingRule = this.findMatchingRule(message.text);

    if (matchingRule) {
      // Check usage limits
      if (!this.checkRuleUsageLimit(message.from, matchingRule)) {
        logger.debug(`Usage limit reached for rule ${matchingRule.name} for user ${message.from}`);
        return processed;
      }

      processed.response = this.processTemplate(matchingRule.response, message);
      processed.requiresHumanReview = matchingRule.requireHumanReview;

      // Record rule usage
      this.recordRuleUsage(message.from, matchingRule);

      logger.info(`Applied rule "${matchingRule.name}" for message from ${message.from}`);
    } else {
      // Use welcome message for new conversations
      if (this.isNewConversation(message.from) && this.config.directMessages.autoReply.welcomeMessage) {
        processed.response = this.config.directMessages.autoReply.welcomeMessage;
        logger.info(`Sending welcome message to ${message.from}`);
      }
    }

    return processed;
  }

  private findMatchingRule(messageText: string): MessageRule | null {
    const rules = this.config.directMessages.autoReply.rules;
    const lowerText = messageText.toLowerCase();

    // Sort rules by priority (higher priority first)
    const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);

    for (const rule of sortedRules) {
      for (const trigger of rule.triggers) {
        if (lowerText.includes(trigger.toLowerCase())) {
          return rule;
        }
      }
    }

    return null;
  }

  private passesFilters(message: any): boolean {
    const filters = this.config.directMessages.filters;

    // Check follower filter
    if (filters.onlyFollowers && !message.isFollower) {
      return false;
    }

    // Check verified filter
    if (filters.onlyVerified && !message.isVerified) {
      return false;
    }

    return true;
  }

  private isSpam(text: string): boolean {
    if (!this.config.directMessages.filters.blockSpam) {
      return false;
    }

    const spamKeywords = [
      'click here',
      'limited offer',
      'act now',
      'earn money',
      'work from home',
      'congratulations',
      'you won',
      'claim your',
      'free followers',
      'increase followers'
    ];

    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
  }

  private processTemplate(template: string, message: any): string {
    // Replace variables in template
    let processed = template;

    // Replace common variables
    processed = processed.replace('{username}', message.from);
    processed = processed.replace('{date}', new Date().toLocaleDateString());
    processed = processed.replace('{time}', new Date().toLocaleTimeString());

    // Add more sophisticated template processing as needed

    return processed;
  }

  private async sendAutoReply(username: string, message: string): Promise<boolean> {
    try {
      logger.info(`Sending auto-reply to ${username}`);

      // Add human-like delay
      await this.wait(5000 + Math.random() * 5000);

      const success = await this.browser.sendDirectMessage(username, message);

      if (success) {
        logger.info(`Auto-reply sent to ${username}`);
      } else {
        logger.error(`Failed to send auto-reply to ${username}`);
      }

      return success;
    } catch (error) {
      logger.error(`Error sending auto-reply to ${username}`, error);
      return false;
    }
  }

  private checkRuleUsageLimit(username: string, rule: MessageRule): boolean {
    if (!rule.maxUsesPerUser) return true;

    const userCounts = this.userMessageCounts.get(username);
    if (!userCounts) return true;

    const ruleCount = userCounts.get(rule.id) || 0;
    return ruleCount < rule.maxUsesPerUser;
  }

  private recordRuleUsage(username: string, rule: MessageRule) {
    if (!this.userMessageCounts.has(username)) {
      this.userMessageCounts.set(username, new Map());
    }

    const userCounts = this.userMessageCounts.get(username)!;
    const currentCount = userCounts.get(rule.id) || 0;
    userCounts.set(rule.id, currentCount + 1);
  }

  private isNewConversation(username: string): boolean {
    return !this.conversationHistory.has(username);
  }

  private addToConversationHistory(username: string, message: ProcessedMessage) {
    if (!this.conversationHistory.has(username)) {
      this.conversationHistory.set(username, []);
    }

    const history = this.conversationHistory.get(username)!;
    history.push(message);

    // Keep only last 50 messages per conversation
    if (history.length > 50) {
      history.shift();
    }
  }

  private generateMessageId(message: any): string {
    return `${message.from}_${message.timestamp || Date.now()}_${message.text.substring(0, 20)}`;
  }

  private cleanupOldData() {
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

    // Clean up processed messages
    // In production, this would check actual timestamps
    if (this.processedMessages.size > 10000) {
      this.processedMessages.clear();
      logger.info('Cleared processed messages cache');
    }

    // Clean up old conversations
    for (const [username, history] of this.conversationHistory.entries()) {
      const filtered = history.filter(msg =>
        msg.timestamp.getTime() > weekAgo
      );

      if (filtered.length === 0) {
        this.conversationHistory.delete(username);
      } else if (filtered.length < history.length) {
        this.conversationHistory.set(username, filtered);
      }
    }
  }

  async sendBroadcastMessage(usernames: string[], message: string): Promise<ActionLog[]> {
    const logs: ActionLog[] = [];
    const sessionId = `broadcast_${Date.now()}`;

    logger.info(`Starting broadcast to ${usernames.length} users`);

    for (const username of usernames) {
      try {
        // Add delay to avoid rate limiting
        await this.wait(10000 + Math.random() * 5000);

        const success = await this.browser.sendDirectMessage(username, message);

        logs.push(this.createActionLog(
          'broadcast_dm',
          username,
          success,
          sessionId,
          { message }
        ));

        if (success) {
          logger.info(`Broadcast sent to ${username}`);
        } else {
          logger.error(`Failed to send broadcast to ${username}`);
        }
      } catch (error) {
        logger.error(`Error sending broadcast to ${username}`, error);
        logs.push(this.createActionLog(
          'broadcast_dm',
          username,
          false,
          sessionId,
          { error }
        ));
      }
    }

    logger.info(`Broadcast completed. Sent to ${logs.filter(l => l.success).length}/${usernames.length} users`);

    return logs;
  }

  getConversationHistory(username: string): ProcessedMessage[] {
    return this.conversationHistory.get(username) || [];
  }

  getStats() {
    return {
      processedMessages: this.processedMessages.size,
      activeConversations: this.conversationHistory.size,
      rulesApplied: Array.from(this.userMessageCounts.values())
        .reduce((sum, counts) => sum + counts.size, 0)
    };
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
}