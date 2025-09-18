// Instagram Automation Module - Main Export

export { InstagramAutomationManager } from './automation-manager';
export { logger } from './logger';
export { defaultConfig } from './config/default-config';
export { examplePosts } from './config/example-posts';

// Export types
export type {
  AutomationConfig,
  PostContent,
  HashtagEngagementConfig,
  DirectMessageConfig,
  TriggerAction,
  AutomationSession,
  ActionLog,
  CommentTemplate,
  MessageRule,
  InstagramCredentials,
  ScheduleConfig
} from './types';

// Export validation schemas
export {
  AutomationConfigSchema,
  PostContentSchema,
  InstagramCredentialsSchema
} from './config-schema';

// Utility function to create manager with default config
import { InstagramAutomationManager } from './automation-manager';
import { defaultConfig } from './config/default-config';
import { AutomationConfig } from './types';

export function createAutomationManager(customConfig?: Partial<AutomationConfig>): InstagramAutomationManager {
  const config: AutomationConfig = {
    ...defaultConfig,
    ...customConfig
  };

  return new InstagramAutomationManager(config);
}