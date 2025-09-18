// Instagram Automation Types and Interfaces

export interface InstagramCredentials {
  username: string;
  password: string;
  twoFactorSecret?: string;
}

export interface ScheduleConfig {
  enabled: boolean;
  times: string[]; // Array of times in 24h format: ["09:00", "18:00"]
  timezone: string;
  days?: string[]; // Optional: specific days ["Monday", "Tuesday"] or leave empty for daily
}

export interface PostContent {
  id: string;
  imagePath?: string;
  videoPath?: string;
  caption: string;
  hashtags: string[];
  location?: string;
  tagUsers?: string[];
  scheduledTime?: Date;
  status: 'pending' | 'posted' | 'failed';
  postedAt?: Date;
  postUrl?: string;
  error?: string;
}

export interface HashtagEngagementConfig {
  enabled: boolean;
  hashtags: string[];
  actions: {
    like: boolean;
    comment: boolean;
    follow: boolean;
  };
  limits: {
    maxLikesPerHashtag: number;
    maxCommentsPerHashtag: number;
    maxFollowsPerHashtag: number;
    maxActionsPerDay: number;
  };
  filters: {
    minLikes?: number;
    maxLikes?: number;
    minFollowers?: number;
    maxFollowers?: number;
    excludeVerified?: boolean;
    mustHaveProfilePic?: boolean;
    minAccountAge?: number; // days
  };
  commentTemplates: CommentTemplate[];
  checkInterval: number; // minutes
}

export interface CommentTemplate {
  id: string;
  category: string; // "mountain", "nature", "travel", etc.
  templates: string[];
  useEmojis: boolean;
  contextKeywords?: string[]; // Keywords to match in post caption
}

export interface DirectMessageConfig {
  enabled: boolean;
  checkInterval: number; // minutes
  autoReply: {
    enabled: boolean;
    welcomeMessage?: string;
    rules: MessageRule[];
  };
  filters: {
    onlyFollowers?: boolean;
    onlyVerified?: boolean;
    blockSpam: boolean;
  };
}

export interface MessageRule {
  id: string;
  name: string;
  triggers: string[]; // Keywords or patterns
  response: string;
  priority: number;
  requireHumanReview?: boolean;
  maxUsesPerUser?: number;
}

export interface TriggerAction {
  id: string;
  name: string;
  enabled: boolean;
  trigger: {
    type: 'follower_milestone' | 'mention' | 'tag' | 'story_mention' | 'comment_received' | 'dm_keyword';
    value?: string | number;
  };
  actions: {
    postContent?: PostContent;
    sendDM?: {
      message: string;
      targetUsers?: string[];
    };
    likePost?: boolean;
    commentOnPost?: {
      template: string;
    };
    followUser?: boolean;
  };
  cooldown?: number; // minutes
  lastTriggered?: Date;
}

export interface AutomationConfig {
  credentials: InstagramCredentials;
  posting: {
    schedule: ScheduleConfig;
    queue: PostContent[];
    defaultHashtags?: string[];
  };
  engagement: {
    hashtag: HashtagEngagementConfig;
    commentManagement: {
      enabled: boolean;
      autoLikePositive: boolean;
      autoReplyTemplates: CommentTemplate[];
      hideNegative: boolean;
      keywords: {
        positive: string[];
        negative: string[];
        spam: string[];
      };
    };
  };
  directMessages: DirectMessageConfig;
  triggers: TriggerAction[];
  safety: {
    rateLimits: {
      maxLikesPerHour: number;
      maxCommentsPerHour: number;
      maxFollowsPerHour: number;
      maxDMsPerHour: number;
      maxActionsPerDay: number;
    };
    delays: {
      minActionDelay: number; // seconds
      maxActionDelay: number; // seconds
      afterLogin: number; // seconds
      betweenHashtags: number; // seconds
    };
    antiDetection: {
      randomizeTimings: boolean;
      simulateHumanBehavior: boolean;
      pauseOnWeekends?: boolean;
      nightTimeHours?: {
        start: string; // "22:00"
        end: string; // "06:00"
      };
    };
  };
  monitoring: {
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    logFile?: string;
    notifications: {
      email?: string;
      webhook?: string;
      onError: boolean;
      onSuccess: boolean;
      dailySummary: boolean;
    };
  };
}

export interface AutomationTask {
  id: string;
  type: 'post' | 'engage_hashtag' | 'check_dm' | 'manage_comments' | 'trigger_action';
  scheduledTime: Date;
  priority: number;
  data?: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  attempts: number;
  lastAttempt?: Date;
  error?: string;
}

export interface AutomationSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  stats: {
    postsCreated: number;
    likesGiven: number;
    commentsPosted: number;
    followsInitiated: number;
    dmsProcessed: number;
    errorsEncountered: number;
  };
  tasks: AutomationTask[];
}

export interface ActionLog {
  id: string;
  timestamp: Date;
  action: string;
  target?: string;
  success: boolean;
  details?: any;
  error?: string;
  sessionId: string;
}