# Instagram Automation Manager

A comprehensive Instagram automation system for the Balkan Mountains project with support for scheduled posting, hashtag engagement, comment management, and direct message automation.

## Features

### 1. **Scheduled Posting**
- Schedule posts at specific times (e.g., 9 AM and 6 PM daily)
- Support for specific days of the week
- Queue management for multiple posts
- Image and video support
- Location tagging and user mentions
- Automatic hashtag management

### 2. **Hashtag Engagement**
- Monitor and engage with specific hashtags
- Configurable actions (like, comment, follow)
- Smart filtering based on account metrics
- Context-aware comment generation
- Rate limiting and safety measures

### 3. **Comment Management**
- Auto-like positive comments
- Auto-reply with templates
- Sentiment analysis
- Spam detection
- Hide negative comments option

### 4. **Direct Message Automation**
- Configurable check intervals
- Rule-based auto-replies
- Welcome messages for new conversations
- Spam filtering
- Usage limits per user

### 5. **Trigger-Based Actions**
- Follower milestone celebrations
- Respond to mentions and tags
- Story mention reactions
- Custom trigger conditions

## Installation

```bash
npm install node-cron zod winston date-fns
npm install -D @types/node-cron
```

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
INSTAGRAM_USERNAME=your_instagram_username
INSTAGRAM_PASSWORD=your_instagram_password
INSTAGRAM_2FA_SECRET=your_2fa_secret_key  # Optional
```

### Basic Setup

```typescript
import { createAutomationManager } from '@/lib/instagram-automation';

const manager = createAutomationManager({
  credentials: {
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD
  }
});

// Start automation
await manager.start();

// Check status
const status = manager.getStatus();

// Stop automation
await manager.stop();
```

## API Endpoints

### Start Automation
```http
POST /api/instagram/start
Content-Type: application/json

{
  "config": {
    "credentials": {
      "username": "your_username",
      "password": "your_password"
    }
  }
}
```

### Stop Automation
```http
POST /api/instagram/stop
```

### Get Status
```http
GET /api/instagram/status
```

### Add Post to Queue
```http
POST /api/instagram/post
Content-Type: application/json

{
  "id": "unique_post_id",
  "imagePath": "/path/to/image.jpg",
  "caption": "Your caption here",
  "hashtags": ["#mountain", "#hiking"],
  "status": "pending"
}
```

### Remove Post from Queue
```http
DELETE /api/instagram/post?id=post_id
```

## Configuration Options

### Posting Schedule
```typescript
posting: {
  schedule: {
    enabled: true,
    times: ['09:00', '18:00'],  // 24-hour format
    timezone: 'Europe/Istanbul',
    days: ['Monday', 'Wednesday', 'Friday']  // Optional
  },
  queue: [],  // Array of PostContent
  defaultHashtags: ['#balkans', '#hiking']
}
```

### Hashtag Engagement
```typescript
engagement: {
  hashtag: {
    enabled: true,
    hashtags: ['hiking', 'mountains'],
    actions: {
      like: true,
      comment: true,
      follow: false
    },
    limits: {
      maxLikesPerHashtag: 10,
      maxCommentsPerHashtag: 3,
      maxFollowsPerHashtag: 2,
      maxActionsPerDay: 200
    },
    filters: {
      minLikes: 10,
      maxLikes: 10000,
      minFollowers: 100,
      excludeVerified: false
    },
    checkInterval: 30  // minutes
  }
}
```

### Direct Messages
```typescript
directMessages: {
  enabled: true,
  checkInterval: 5,  // minutes
  autoReply: {
    enabled: true,
    welcomeMessage: 'Thanks for your message!',
    rules: [
      {
        id: 'route_info',
        name: 'Route Information',
        triggers: ['route', 'trail'],
        response: 'Visit our website for details!',
        priority: 10
      }
    ]
  },
  filters: {
    onlyFollowers: false,
    blockSpam: true
  }
}
```

### Safety Settings
```typescript
safety: {
  rateLimits: {
    maxLikesPerHour: 30,
    maxCommentsPerHour: 10,
    maxFollowsPerHour: 10,
    maxDMsPerHour: 15,
    maxActionsPerDay: 200
  },
  delays: {
    minActionDelay: 3,  // seconds
    maxActionDelay: 10,
    afterLogin: 10,
    betweenHashtags: 60
  },
  antiDetection: {
    randomizeTimings: true,
    simulateHumanBehavior: true,
    nightTimeHours: {
      start: '23:00',
      end: '06:00'
    }
  }
}
```

## Safety and Compliance

The system implements Instagram-safe automation practices:

- **Rate Limiting**: Respects Instagram's rate limits (max 200 likes, 60 comments, 60 follows per day)
- **Random Delays**: 2-10 seconds between actions for human-like behavior
- **Night Mode**: Optional pause during night hours
- **Weekend Pause**: Optional weekend automation pause
- **Error Handling**: Exponential backoff for failed requests
- **Session Management**: Proper login/logout handling

## Monitoring and Logs

- Configurable log levels (debug, info, warn, error)
- File-based logging with rotation
- Real-time status monitoring
- Daily summary reports
- Webhook and email notifications

## Example Posts

The system includes pre-configured example posts for the Balkan Mountains project:

```typescript
import { examplePosts } from '@/lib/instagram-automation';

// Use example posts
manager.addPost(examplePosts[0]);
```

## Playwright MCP Integration

The system is designed to work with Playwright MCP for browser automation. When fully integrated with Playwright MCP, it will:

1. Handle Instagram login with 2FA support
2. Navigate Instagram's interface
3. Upload images and videos
4. Interact with posts (like, comment, follow)
5. Read and send direct messages
6. Take screenshots for monitoring

## Development Status

Current implementation includes:
- ✅ Complete configuration structure
- ✅ Task scheduling system
- ✅ Engagement manager
- ✅ DM automation
- ✅ Safety measures
- ✅ API endpoints
- ✅ Logging system
- ⚠️ Playwright MCP integration (prepared for connection)

## Best Practices

1. **Start Small**: Begin with conservative limits and gradually increase
2. **Monitor Regularly**: Check logs and status daily
3. **Content Quality**: Focus on quality over quantity
4. **Authentic Engagement**: Use contextual comments and genuine interactions
5. **Respect Limits**: Never exceed Instagram's daily action limits
6. **Test First**: Test with a secondary account before using on main account

## Troubleshooting

### Connection Issues
- Verify credentials are correct
- Check for 2FA requirements
- Ensure stable internet connection

### Rate Limiting
- Reduce action limits in configuration
- Increase delays between actions
- Enable night time pause

### Login Challenges
- May need to verify account via email
- Complete any security checkpoints manually
- Consider using app-specific passwords

## Support

For issues or questions related to the Instagram automation system, please check:
1. The logs in `/logs/instagram-automation/`
2. The status endpoint for current state
3. The example usage files for implementation patterns

## Disclaimer

This automation system should be used responsibly and in accordance with Instagram's Terms of Service. The system includes safety measures to prevent spam-like behavior, but users are responsible for ensuring their usage complies with platform policies.