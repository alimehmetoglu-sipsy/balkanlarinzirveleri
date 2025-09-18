// Task Scheduler for Instagram Automation

import * as cron from 'node-cron';
import { format, addMinutes, isWithinInterval, parseISO } from 'date-fns';
import { logger } from './logger';
import { AutomationTask, ScheduleConfig } from './types';

export class TaskScheduler {
  private tasks: Map<string, cron.ScheduledTask> = new Map();
  private taskQueue: AutomationTask[] = [];
  private isRunning: boolean = false;
  private currentTask: AutomationTask | null = null;

  constructor() {
    // Start the main task processor
    this.startTaskProcessor();
  }

  private startTaskProcessor() {
    // Process tasks every minute
    cron.schedule('* * * * *', async () => {
      if (!this.isRunning) {
        await this.processNextTask();
      }
    });

    logger.info('Task scheduler initialized');
  }

  schedulePostingTask(schedule: ScheduleConfig, callback: () => Promise<void>): string {
    const taskId = `posting_${Date.now()}`;

    if (!schedule.enabled) {
      logger.info('Posting schedule is disabled');
      return taskId;
    }

    // Schedule for each time in the schedule
    schedule.times.forEach((time, index) => {
      const [hour, minute] = time.split(':');
      const cronExpression = `${minute} ${hour} * * ${schedule.days ? this.getDaysCronExpression(schedule.days) : '*'}`;

      const task = cron.schedule(cronExpression, async () => {
        const automationTask: AutomationTask = {
          id: `${taskId}_${index}_${Date.now()}`,
          type: 'post',
          scheduledTime: new Date(),
          priority: 1,
          status: 'pending',
          attempts: 0
        };

        this.addToQueue(automationTask);
        logger.info(`Posting task scheduled for ${time}`);

        try {
          await callback();
        } catch (error) {
          logger.error('Posting task failed', error);
        }
      }, {
        timezone: schedule.timezone
      });

      this.tasks.set(`${taskId}_${index}`, task);
      logger.info(`Scheduled posting task at ${time} in ${schedule.timezone}`);
    });

    return taskId;
  }

  scheduleHashtagEngagement(intervalMinutes: number, callback: () => Promise<void>): string {
    const taskId = `hashtag_engagement_${Date.now()}`;

    const task = cron.schedule(`*/${intervalMinutes} * * * *`, async () => {
      const automationTask: AutomationTask = {
        id: `${taskId}_${Date.now()}`,
        type: 'engage_hashtag',
        scheduledTime: new Date(),
        priority: 2,
        status: 'pending',
        attempts: 0
      };

      this.addToQueue(automationTask);
      logger.info(`Hashtag engagement task triggered (every ${intervalMinutes} minutes)`);

      try {
        await callback();
      } catch (error) {
        logger.error('Hashtag engagement task failed', error);
      }
    });

    this.tasks.set(taskId, task);
    logger.info(`Scheduled hashtag engagement every ${intervalMinutes} minutes`);

    return taskId;
  }

  scheduleDMCheck(intervalMinutes: number, callback: () => Promise<void>): string {
    const taskId = `dm_check_${Date.now()}`;

    const task = cron.schedule(`*/${intervalMinutes} * * * *`, async () => {
      const automationTask: AutomationTask = {
        id: `${taskId}_${Date.now()}`,
        type: 'check_dm',
        scheduledTime: new Date(),
        priority: 3,
        status: 'pending',
        attempts: 0
      };

      this.addToQueue(automationTask);
      logger.info(`DM check task triggered (every ${intervalMinutes} minutes)`);

      try {
        await callback();
      } catch (error) {
        logger.error('DM check task failed', error);
      }
    });

    this.tasks.set(taskId, task);
    logger.info(`Scheduled DM check every ${intervalMinutes} minutes`);

    return taskId;
  }

  scheduleCommentManagement(intervalMinutes: number, callback: () => Promise<void>): string {
    const taskId = `comment_management_${Date.now()}`;

    const task = cron.schedule(`*/${intervalMinutes} * * * *`, async () => {
      const automationTask: AutomationTask = {
        id: `${taskId}_${Date.now()}`,
        type: 'manage_comments',
        scheduledTime: new Date(),
        priority: 4,
        status: 'pending',
        attempts: 0
      };

      this.addToQueue(automationTask);
      logger.info(`Comment management task triggered (every ${intervalMinutes} minutes)`);

      try {
        await callback();
      } catch (error) {
        logger.error('Comment management task failed', error);
      }
    });

    this.tasks.set(taskId, task);
    logger.info(`Scheduled comment management every ${intervalMinutes} minutes`);

    return taskId;
  }

  addToQueue(task: AutomationTask) {
    // Add task to queue sorted by priority and scheduled time
    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority; // Lower number = higher priority
      }
      return a.scheduledTime.getTime() - b.scheduledTime.getTime();
    });

    logger.debug(`Task added to queue: ${task.type} (Priority: ${task.priority})`);
  }

  private async processNextTask() {
    if (this.isRunning || this.taskQueue.length === 0) {
      return;
    }

    const now = new Date();
    const nextTask = this.taskQueue.find(task =>
      task.status === 'pending' && task.scheduledTime <= now
    );

    if (!nextTask) {
      return;
    }

    this.isRunning = true;
    this.currentTask = nextTask;
    nextTask.status = 'running';
    nextTask.lastAttempt = now;
    nextTask.attempts++;

    try {
      logger.info(`Processing task: ${nextTask.type} (ID: ${nextTask.id})`);

      // Add random delay for human-like behavior
      const delay = this.getRandomDelay();
      await this.wait(delay);

      // Task would be processed here by the automation manager
      // For now, we'll just mark it as completed
      nextTask.status = 'completed';

      logger.info(`Task completed: ${nextTask.type} (ID: ${nextTask.id})`);
    } catch (error) {
      logger.error(`Task failed: ${nextTask.type}`, error);
      nextTask.status = 'failed';
      nextTask.error = error instanceof Error ? error.message : String(error);

      // Retry logic
      if (nextTask.attempts < 3) {
        nextTask.status = 'pending';
        nextTask.scheduledTime = addMinutes(now, 5 * nextTask.attempts); // Exponential backoff
        logger.info(`Retrying task ${nextTask.id} in ${5 * nextTask.attempts} minutes`);
      }
    } finally {
      this.isRunning = false;
      this.currentTask = null;

      // Remove completed or permanently failed tasks
      if (nextTask.status === 'completed' || (nextTask.status === 'failed' && nextTask.attempts >= 3)) {
        const index = this.taskQueue.indexOf(nextTask);
        if (index > -1) {
          this.taskQueue.splice(index, 1);
        }
      }
    }
  }

  private getRandomDelay(): number {
    // Random delay between 2-10 seconds for human-like behavior
    return Math.floor(Math.random() * 8000) + 2000;
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getDaysCronExpression(days: string[]): string {
    const dayMap: { [key: string]: number } = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };

    const cronDays = days.map(day => dayMap[day]).filter(d => d !== undefined);
    return cronDays.join(',');
  }

  pauseTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (task) {
      task.stop();
      logger.info(`Task paused: ${taskId}`);
      return true;
    }
    return false;
  }

  resumeTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (task) {
      task.start();
      logger.info(`Task resumed: ${taskId}`);
      return true;
    }
    return false;
  }

  cancelTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (task) {
      task.stop();
      this.tasks.delete(taskId);
      logger.info(`Task cancelled: ${taskId}`);
      return true;
    }
    return false;
  }

  getQueueStatus(): {
    queueLength: number;
    currentTask: AutomationTask | null;
    pendingTasks: AutomationTask[];
    isProcessing: boolean;
  } {
    return {
      queueLength: this.taskQueue.length,
      currentTask: this.currentTask,
      pendingTasks: this.taskQueue.filter(t => t.status === 'pending'),
      isProcessing: this.isRunning
    };
  }

  isNightTime(nightTimeHours?: { start: string; end: string }): boolean {
    if (!nightTimeHours) return false;

    const now = new Date();
    const currentTime = format(now, 'HH:mm');

    const { start, end } = nightTimeHours;

    // Handle cases where night time spans midnight
    if (start > end) {
      return currentTime >= start || currentTime <= end;
    } else {
      return currentTime >= start && currentTime <= end;
    }
  }

  shouldPauseForWeekend(pauseOnWeekends?: boolean): boolean {
    if (!pauseOnWeekends) return false;

    const now = new Date();
    const dayOfWeek = now.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  }

  clearQueue() {
    this.taskQueue = [];
    logger.info('Task queue cleared');
  }

  stopAll() {
    this.tasks.forEach((task, taskId) => {
      task.stop();
      logger.info(`Stopped task: ${taskId}`);
    });
    this.tasks.clear();
    this.clearQueue();
    logger.info('All tasks stopped');
  }
}