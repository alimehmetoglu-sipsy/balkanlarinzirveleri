// Main Instagram Automation Manager

import { logger } from './logger';
import { InstagramBrowserController } from './browser-controller';
import { TaskScheduler } from './scheduler';
import { EngagementManager } from './engagement-manager';
import { DirectMessageManager } from './dm-manager';
import { AutomationConfigSchema } from './config-schema';
import {
  AutomationConfig,
  AutomationSession,
  PostContent,
  TriggerAction,
  ActionLog
} from './types';

export class InstagramAutomationManager {
  private browser: InstagramBrowserController;
  private scheduler: TaskScheduler;
  private engagementManager: EngagementManager;
  private dmManager: DirectMessageManager;
  private config: AutomationConfig;
  private session?: AutomationSession;
  private isRunning: boolean = false;
  private scheduledTasks: Map<string, string> = new Map();

  constructor(config: AutomationConfig) {
    // Validate configuration
    const validatedConfig = AutomationConfigSchema.parse(config);
    this.config = validatedConfig;

    // Initialize components
    this.browser = new InstagramBrowserController(config.credentials);
    this.scheduler = new TaskScheduler();
    this.engagementManager = new EngagementManager(this.browser, config);
    this.dmManager = new DirectMessageManager(this.browser, config);

    // Configure logger
    logger.configure(config.monitoring);
  }

  async start(): Promise<boolean> {
    if (this.isRunning) {
      logger.warn('Automation manager is already running');
      return false;
    }

    try {
      logger.info('Starting Instagram automation manager...');

      // Connect to Instagram
      const connected = await this.browser.connect();
      if (!connected) {
        throw new Error('Failed to connect to Instagram');
      }

      // Wait after login for safety
      await this.wait(this.config.safety.delays.afterLogin * 1000);

      // Create new session
      this.session = {
        id: `session_${Date.now()}`,
        startTime: new Date(),
        isActive: true,
        stats: {
          postsCreated: 0,
          likesGiven: 0,
          commentsPosted: 0,
          followsInitiated: 0,
          dmsProcessed: 0,
          errorsEncountered: 0
        },
        tasks: []
      };

      // Schedule all tasks
      this.scheduleAllTasks();

      // Set up trigger monitoring
      this.setupTriggerMonitoring();

      this.isRunning = true;

      logger.info('Instagram automation manager started successfully');
      logger.action('Automation Manager', 'Started', true, { sessionId: this.session.id });

      return true;
    } catch (error) {
      logger.error('Failed to start automation manager', error);
      this.isRunning = false;
      return false;
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) {
      logger.warn('Automation manager is not running');
      return;
    }

    try {
      logger.info('Stopping Instagram automation manager...');

      // Stop all scheduled tasks
      this.scheduler.stopAll();

      // Clear scheduled task references
      this.scheduledTasks.clear();

      // Generate session summary
      if (this.session) {
        this.session.endTime = new Date();
        this.session.isActive = false;

        const summary = await logger.generateDailySummary(this.session.stats);
        logger.info('Session summary', { summary, session: this.session });
      }

      // Disconnect from Instagram
      await this.browser.disconnect();

      this.isRunning = false;

      logger.info('Instagram automation manager stopped');
      logger.action('Automation Manager', 'Stopped', true, {
        sessionDuration: this.session ? this.session.endTime!.getTime() - this.session.startTime.getTime() : 0
      });
    } catch (error) {
      logger.error('Error stopping automation manager', error);
    }
  }

  private scheduleAllTasks() {
    logger.info('Scheduling automation tasks...');

    // Schedule posting tasks
    if (this.config.posting.schedule.enabled) {
      const postingTaskId = this.scheduler.schedulePostingTask(
        this.config.posting.schedule,
        async () => await this.processPostingQueue()
      );
      this.scheduledTasks.set('posting', postingTaskId);
    }

    // Schedule hashtag engagement
    if (this.config.engagement.hashtag.enabled) {
      const hashtagTaskId = this.scheduler.scheduleHashtagEngagement(
        this.config.engagement.hashtag.checkInterval,
        async () => await this.processHashtagEngagement()
      );
      this.scheduledTasks.set('hashtag_engagement', hashtagTaskId);
    }

    // Schedule DM checks
    if (this.config.directMessages.enabled) {
      const dmTaskId = this.scheduler.scheduleDMCheck(
        this.config.directMessages.checkInterval,
        async () => await this.processDMCheck()
      );
      this.scheduledTasks.set('dm_check', dmTaskId);
    }

    // Schedule comment management
    if (this.config.engagement.commentManagement.enabled) {
      const commentTaskId = this.scheduler.scheduleCommentManagement(
        30, // Check every 30 minutes
        async () => await this.processCommentManagement()
      );
      this.scheduledTasks.set('comment_management', commentTaskId);
    }

    logger.info(`Scheduled ${this.scheduledTasks.size} automation tasks`);
  }

  private setupTriggerMonitoring() {
    const activeTriggers = this.config.triggers.filter(t => t.enabled);

    if (activeTriggers.length === 0) {
      logger.info('No active triggers configured');
      return;
    }

    logger.info(`Setting up ${activeTriggers.length} triggers`);

    // Set up periodic check for triggers (every 5 minutes)
    const triggerCheckId = this.scheduler.scheduleHashtagEngagement(
      5,
      async () => await this.checkTriggers()
    );
    this.scheduledTasks.set('trigger_check', triggerCheckId);
  }

  private async processPostingQueue(): Promise<void> {
    try {
      logger.info('Processing posting queue...');

      const pendingPosts = this.config.posting.queue.filter(p => p.status === 'pending');

      if (pendingPosts.length === 0) {
        logger.info('No pending posts in queue');
        return;
      }

      // Find the next scheduled post
      const now = new Date();
      const nextPost = pendingPosts.find(p =>
        !p.scheduledTime || p.scheduledTime <= now
      );

      if (!nextPost) {
        logger.info('No posts ready to be published');
        return;
      }

      // Create the post
      const success = await this.createPost(nextPost);

      if (success) {
        nextPost.status = 'posted';
        nextPost.postedAt = new Date();
        this.session!.stats.postsCreated++;
        logger.info(`Post created successfully: ${nextPost.id}`);
      } else {
        nextPost.status = 'failed';
        nextPost.error = 'Failed to create post';
        this.session!.stats.errorsEncountered++;
        logger.error(`Failed to create post: ${nextPost.id}`);
      }
    } catch (error) {
      logger.error('Error processing posting queue', error);
      this.session!.stats.errorsEncountered++;
    }
  }

  private async createPost(post: PostContent): Promise<boolean> {
    try {
      // Prepare full caption with hashtags
      const hashtags = [...post.hashtags];
      if (this.config.posting.defaultHashtags) {
        hashtags.push(...this.config.posting.defaultHashtags);
      }

      // Create post using browser controller
      const imagePath = post.imagePath || post.videoPath;
      if (!imagePath) {
        logger.error('No media file specified for post');
        return false;
      }

      return await this.browser.createPost(imagePath, post.caption, hashtags);
    } catch (error) {
      logger.error('Error creating post', error);
      return false;
    }
  }

  private async processHashtagEngagement(): Promise<void> {
    try {
      logger.info('Processing hashtag engagement...');

      const logs = await this.engagementManager.engageWithAllHashtags();

      // Update session stats
      if (this.session) {
        const likes = logs.filter(l => l.action === 'like' && l.success).length;
        const comments = logs.filter(l => l.action === 'comment' && l.success).length;
        const follows = logs.filter(l => l.action === 'follow' && l.success).length;
        const errors = logs.filter(l => !l.success).length;

        this.session.stats.likesGiven += likes;
        this.session.stats.commentsPosted += comments;
        this.session.stats.followsInitiated += follows;
        this.session.stats.errorsEncountered += errors;
      }

      logger.info(`Hashtag engagement completed. Actions: ${logs.length}`);
    } catch (error) {
      logger.error('Error during hashtag engagement', error);
      this.session!.stats.errorsEncountered++;
    }
  }

  private async processDMCheck(): Promise<void> {
    try {
      logger.info('Processing DM check...');

      const logs = await this.dmManager.checkAndProcessMessages();

      // Update session stats
      if (this.session) {
        const processed = logs.filter(l => l.action === 'process_dm' && l.success).length;
        const errors = logs.filter(l => !l.success).length;

        this.session.stats.dmsProcessed += processed;
        this.session.stats.errorsEncountered += errors;
      }

      logger.info(`DM check completed. Processed: ${logs.length} messages`);
    } catch (error) {
      logger.error('Error during DM check', error);
      this.session!.stats.errorsEncountered++;
    }
  }

  private async processCommentManagement(): Promise<void> {
    try {
      logger.info('Processing comment management...');

      const logs = await this.engagementManager.manageComments();

      // Update session stats
      if (this.session) {
        const errors = logs.filter(l => !l.success).length;
        this.session.stats.errorsEncountered += errors;
      }

      logger.info(`Comment management completed. Actions: ${logs.length}`);
    } catch (error) {
      logger.error('Error during comment management', error);
      this.session!.stats.errorsEncountered++;
    }
  }

  private async checkTriggers(): Promise<void> {
    try {
      const activeTriggers = this.config.triggers.filter(t => t.enabled);

      for (const trigger of activeTriggers) {
        // Check cooldown
        if (trigger.lastTriggered && trigger.cooldown) {
          const minutesSinceLastTrigger = (Date.now() - trigger.lastTriggered.getTime()) / (1000 * 60);
          if (minutesSinceLastTrigger < trigger.cooldown) {
            continue;
          }
        }

        // Check trigger condition
        const shouldTrigger = await this.checkTriggerCondition(trigger);

        if (shouldTrigger) {
          logger.info(`Trigger activated: ${trigger.name}`);
          await this.executeTriggerActions(trigger);
          trigger.lastTriggered = new Date();
        }
      }
    } catch (error) {
      logger.error('Error checking triggers', error);
    }
  }

  private async checkTriggerCondition(trigger: TriggerAction): Promise<boolean> {
    // This would implement actual trigger checking logic
    // For now, return false to prevent automatic triggering
    return false;
  }

  private async executeTriggerActions(trigger: TriggerAction): Promise<void> {
    try {
      const { actions } = trigger;

      if (actions.postContent) {
        await this.createPost(actions.postContent);
      }

      if (actions.sendDM) {
        const targets = actions.sendDM.targetUsers || [];
        await this.dmManager.sendBroadcastMessage(targets, actions.sendDM.message);
      }

      if (actions.followUser) {
        // Implementation would follow specific users based on trigger
      }

      logger.info(`Executed actions for trigger: ${trigger.name}`);
    } catch (error) {
      logger.error(`Failed to execute trigger actions: ${trigger.name}`, error);
    }
  }

  // Public API methods

  async addPost(post: PostContent): Promise<void> {
    this.config.posting.queue.push(post);
    logger.info(`Added post to queue: ${post.id}`);
  }

  async removePost(postId: string): Promise<boolean> {
    const index = this.config.posting.queue.findIndex(p => p.id === postId);
    if (index > -1) {
      this.config.posting.queue.splice(index, 1);
      logger.info(`Removed post from queue: ${postId}`);
      return true;
    }
    return false;
  }

  async pauseTask(taskType: string): Promise<boolean> {
    const taskId = this.scheduledTasks.get(taskType);
    if (taskId) {
      return this.scheduler.pauseTask(taskId);
    }
    return false;
  }

  async resumeTask(taskType: string): Promise<boolean> {
    const taskId = this.scheduledTasks.get(taskType);
    if (taskId) {
      return this.scheduler.resumeTask(taskId);
    }
    return false;
  }

  getStatus(): {
    isRunning: boolean;
    session: AutomationSession | undefined;
    scheduledTasks: string[];
    queueStatus: any;
    engagementStats: any;
    dmStats: any;
  } {
    return {
      isRunning: this.isRunning,
      session: this.session,
      scheduledTasks: Array.from(this.scheduledTasks.keys()),
      queueStatus: this.scheduler.getQueueStatus(),
      engagementStats: this.engagementManager.getStats(),
      dmStats: this.dmManager.getStats()
    };
  }

  async takeScreenshot(filename?: string): Promise<string> {
    return await this.browser.takeScreenshot(filename);
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}