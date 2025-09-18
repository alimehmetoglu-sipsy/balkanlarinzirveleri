// Logging utility for Instagram automation

import winston from 'winston';
import path from 'path';
import { AutomationConfig } from './types';

class AutomationLogger {
  private logger: winston.Logger;
  private config?: AutomationConfig['monitoring'];

  constructor() {
    this.logger = this.createDefaultLogger();
  }

  private createDefaultLogger(): winston.Logger {
    const logDir = path.join(process.cwd(), 'logs', 'instagram-automation');

    return winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      defaultMeta: { service: 'instagram-automation' },
      transports: [
        // Console transport
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      ]
    });
  }

  configure(config: AutomationConfig['monitoring']) {
    this.config = config;

    // Update log level
    this.logger.level = config.logLevel;

    // Add file transport if logFile is specified
    if (config.logFile) {
      this.logger.add(new winston.transports.File({
        filename: config.logFile,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      }));
    }

    // Add error file transport
    this.logger.add(new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'instagram-automation', 'error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }));

    // Add combined file transport
    this.logger.add(new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'instagram-automation', 'combined.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }));
  }

  // Log methods
  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
    this.checkNotifications('info', message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  error(message: string, error?: Error | any, meta?: any) {
    this.logger.error(message, { error: error?.stack || error, ...meta });
    this.checkNotifications('error', message, { error, ...meta });
  }

  task(taskType: string, status: 'start' | 'success' | 'failed', details?: any) {
    const message = `Task ${taskType}: ${status}`;
    const level = status === 'failed' ? 'error' : 'info';

    this.logger.log(level, message, {
      taskType,
      status,
      timestamp: new Date().toISOString(),
      ...details
    });

    if (status === 'success' && this.config?.notifications.onSuccess) {
      this.sendNotification('success', message, details);
    } else if (status === 'failed' && this.config?.notifications.onError) {
      this.sendNotification('error', message, details);
    }
  }

  action(action: string, target: string, success: boolean, details?: any) {
    const status = success ? 'SUCCESS' : 'FAILED';
    const message = `[${new Date().toISOString()}] ${action}: ${target}\nStatus: ${status}`;

    if (!success) {
      this.logger.error(message, details);
    } else {
      this.logger.info(message, details);
    }

    // Return formatted status for display
    return `${message}\nDetails: ${details ? JSON.stringify(details, null, 2) : 'N/A'}\nNext Run: ${this.getNextRunTime(action)}`;
  }

  private getNextRunTime(action: string): string {
    // This would be calculated based on the schedule configuration
    // For now, return a placeholder
    const nextRun = new Date();
    nextRun.setMinutes(nextRun.getMinutes() + 30);
    return nextRun.toLocaleString();
  }

  private checkNotifications(level: string, message: string, meta?: any) {
    if (!this.config?.notifications) return;

    const { onError, onSuccess } = this.config.notifications;

    if (level === 'error' && onError) {
      this.sendNotification('error', message, meta);
    } else if (level === 'info' && message.includes('success') && onSuccess) {
      this.sendNotification('success', message, meta);
    }
  }

  private async sendNotification(type: 'error' | 'success', message: string, details?: any) {
    const { webhook, email } = this.config?.notifications || {};

    // Webhook notification
    if (webhook) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            message,
            details,
            timestamp: new Date().toISOString(),
            service: 'instagram-automation'
          })
        });
      } catch (error) {
        this.logger.error('Failed to send webhook notification', error);
      }
    }

    // Email notification would be implemented here
    if (email) {
      // Implementation would depend on email service
      this.logger.info(`Email notification would be sent to: ${email}`);
    }
  }

  async generateDailySummary(stats: any): Promise<string> {
    const summary = `
=== Instagram Automation Daily Summary ===
Date: ${new Date().toLocaleDateString()}

Posts Created: ${stats.postsCreated || 0}
Likes Given: ${stats.likesGiven || 0}
Comments Posted: ${stats.commentsPosted || 0}
Follows Initiated: ${stats.followsInitiated || 0}
DMs Processed: ${stats.dmsProcessed || 0}
Errors Encountered: ${stats.errorsEncountered || 0}

========================================
    `;

    this.info('Daily summary generated', stats);

    if (this.config?.notifications.dailySummary) {
      await this.sendNotification('success', 'Daily Summary', { summary, stats });
    }

    return summary;
  }
}

// Export singleton instance
export const logger = new AutomationLogger();