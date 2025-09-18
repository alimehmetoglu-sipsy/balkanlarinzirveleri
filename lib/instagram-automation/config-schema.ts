// Configuration validation schemas using Zod

import { z } from 'zod';

export const InstagramCredentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  twoFactorSecret: z.string().optional(),
});

export const ScheduleConfigSchema = z.object({
  enabled: z.boolean(),
  times: z.array(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)),
  timezone: z.string().default('UTC'),
  days: z.array(z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])).optional(),
});

export const PostContentSchema = z.object({
  id: z.string(),
  imagePath: z.string().optional(),
  videoPath: z.string().optional(),
  caption: z.string().max(2200), // Instagram caption limit
  hashtags: z.array(z.string()).max(30), // Instagram hashtag limit
  location: z.string().optional(),
  tagUsers: z.array(z.string()).max(20).optional(), // Instagram tag limit
  scheduledTime: z.date().optional(),
  status: z.enum(['pending', 'posted', 'failed']).default('pending'),
  postedAt: z.date().optional(),
  postUrl: z.string().url().optional(),
  error: z.string().optional(),
});

export const CommentTemplateSchema = z.object({
  id: z.string(),
  category: z.string(),
  templates: z.array(z.string()),
  useEmojis: z.boolean().default(true),
  contextKeywords: z.array(z.string()).optional(),
});

export const HashtagEngagementConfigSchema = z.object({
  enabled: z.boolean(),
  hashtags: z.array(z.string()),
  actions: z.object({
    like: z.boolean(),
    comment: z.boolean(),
    follow: z.boolean(),
  }),
  limits: z.object({
    maxLikesPerHashtag: z.number().max(30),
    maxCommentsPerHashtag: z.number().max(10),
    maxFollowsPerHashtag: z.number().max(10),
    maxActionsPerDay: z.number().max(500),
  }),
  filters: z.object({
    minLikes: z.number().optional(),
    maxLikes: z.number().optional(),
    minFollowers: z.number().optional(),
    maxFollowers: z.number().optional(),
    excludeVerified: z.boolean().optional(),
    mustHaveProfilePic: z.boolean().optional(),
    minAccountAge: z.number().optional(),
  }),
  commentTemplates: z.array(CommentTemplateSchema),
  checkInterval: z.number().min(5).max(1440), // 5 minutes to 24 hours
});

export const MessageRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  triggers: z.array(z.string()),
  response: z.string(),
  priority: z.number(),
  requireHumanReview: z.boolean().optional(),
  maxUsesPerUser: z.number().optional(),
});

export const DirectMessageConfigSchema = z.object({
  enabled: z.boolean(),
  checkInterval: z.number().min(1).max(60), // 1 to 60 minutes
  autoReply: z.object({
    enabled: z.boolean(),
    welcomeMessage: z.string().optional(),
    rules: z.array(MessageRuleSchema),
  }),
  filters: z.object({
    onlyFollowers: z.boolean().optional(),
    onlyVerified: z.boolean().optional(),
    blockSpam: z.boolean().default(true),
  }),
});

export const TriggerActionSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  trigger: z.object({
    type: z.enum(['follower_milestone', 'mention', 'tag', 'story_mention', 'comment_received', 'dm_keyword']),
    value: z.union([z.string(), z.number()]).optional(),
  }),
  actions: z.object({
    postContent: PostContentSchema.optional(),
    sendDM: z.object({
      message: z.string(),
      targetUsers: z.array(z.string()).optional(),
    }).optional(),
    likePost: z.boolean().optional(),
    commentOnPost: z.object({
      template: z.string(),
    }).optional(),
    followUser: z.boolean().optional(),
  }),
  cooldown: z.number().optional(),
  lastTriggered: z.date().optional(),
});

export const AutomationConfigSchema = z.object({
  credentials: InstagramCredentialsSchema,
  posting: z.object({
    schedule: ScheduleConfigSchema,
    queue: z.array(PostContentSchema),
    defaultHashtags: z.array(z.string()).optional(),
  }),
  engagement: z.object({
    hashtag: HashtagEngagementConfigSchema,
    commentManagement: z.object({
      enabled: z.boolean(),
      autoLikePositive: z.boolean(),
      autoReplyTemplates: z.array(CommentTemplateSchema),
      hideNegative: z.boolean(),
      keywords: z.object({
        positive: z.array(z.string()),
        negative: z.array(z.string()),
        spam: z.array(z.string()),
      }),
    }),
  }),
  directMessages: DirectMessageConfigSchema,
  triggers: z.array(TriggerActionSchema),
  safety: z.object({
    rateLimits: z.object({
      maxLikesPerHour: z.number().max(60),
      maxCommentsPerHour: z.number().max(20),
      maxFollowsPerHour: z.number().max(20),
      maxDMsPerHour: z.number().max(20),
      maxActionsPerDay: z.number().max(500),
    }),
    delays: z.object({
      minActionDelay: z.number().min(2),
      maxActionDelay: z.number().max(60),
      afterLogin: z.number().min(5),
      betweenHashtags: z.number().min(30),
    }),
    antiDetection: z.object({
      randomizeTimings: z.boolean(),
      simulateHumanBehavior: z.boolean(),
      pauseOnWeekends: z.boolean().optional(),
      nightTimeHours: z.object({
        start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      }).optional(),
    }),
  }),
  monitoring: z.object({
    logLevel: z.enum(['debug', 'info', 'warn', 'error']),
    logFile: z.string().optional(),
    notifications: z.object({
      email: z.string().email().optional(),
      webhook: z.string().url().optional(),
      onError: z.boolean(),
      onSuccess: z.boolean(),
      dailySummary: z.boolean(),
    }),
  }),
});

export type ValidatedAutomationConfig = z.infer<typeof AutomationConfigSchema>;