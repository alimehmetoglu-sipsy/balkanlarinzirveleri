// Instagram Automation Usage Examples

import {
  createAutomationManager,
  defaultConfig,
  examplePosts,
  AutomationConfig,
  PostContent
} from '../index';

// Example 1: Basic Setup with Default Configuration
async function basicSetup() {
  // Create manager with default configuration
  const manager = createAutomationManager({
    credentials: {
      username: 'your_instagram_username',
      password: 'your_instagram_password',
      twoFactorSecret: 'optional_2fa_secret'
    }
  });

  // Start automation
  const started = await manager.start();

  if (started) {
    console.log('Automation started successfully!');

    // Get status
    const status = manager.getStatus();
    console.log('Current status:', status);

    // Stop after some time
    setTimeout(async () => {
      await manager.stop();
      console.log('Automation stopped');
    }, 60 * 60 * 1000); // Stop after 1 hour
  }
}

// Example 2: Custom Configuration for Specific Use Case
async function customConfiguration() {
  const customConfig: Partial<AutomationConfig> = {
    credentials: {
      username: process.env.INSTAGRAM_USERNAME!,
      password: process.env.INSTAGRAM_PASSWORD!
    },
    posting: {
      schedule: {
        enabled: true,
        times: ['08:00', '12:00', '20:00'], // Three times a day
        timezone: 'Europe/Istanbul',
        days: ['Monday', 'Wednesday', 'Friday'] // Only specific days
      },
      queue: examplePosts.slice(0, 5), // Add first 5 example posts
      defaultHashtags: ['#balkanhiking', '#mountainlife']
    },
    engagement: {
      hashtag: {
        enabled: true,
        hashtags: ['hiking', 'mountains', 'outdoors'],
        actions: {
          like: true,
          comment: false, // Disable commenting
          follow: false   // Disable following
        },
        limits: {
          maxLikesPerHashtag: 5,
          maxCommentsPerHashtag: 0,
          maxFollowsPerHashtag: 0,
          maxActionsPerDay: 100
        },
        filters: {
          minLikes: 50,
          maxLikes: 5000,
          excludeVerified: true
        },
        commentTemplates: [],
        checkInterval: 60 // Check every hour
      },
      commentManagement: {
        enabled: false, // Disable comment management
        autoLikePositive: false,
        autoReplyTemplates: [],
        hideNegative: false,
        keywords: {
          positive: [],
          negative: [],
          spam: []
        }
      }
    },
    directMessages: {
      enabled: true,
      checkInterval: 10, // Check every 10 minutes
      autoReply: {
        enabled: true,
        welcomeMessage: 'Thanks for your message! We will get back to you soon.',
        rules: []
      },
      filters: {
        onlyFollowers: true, // Only respond to followers
        blockSpam: true
      }
    },
    triggers: [], // No triggers
    safety: {
      ...defaultConfig.safety,
      rateLimits: {
        maxLikesPerHour: 20,
        maxCommentsPerHour: 0,
        maxFollowsPerHour: 0,
        maxDMsPerHour: 10,
        maxActionsPerDay: 100
      }
    },
    monitoring: {
      logLevel: 'debug', // More detailed logging
      logFile: 'logs/instagram-custom.log',
      notifications: {
        email: 'admin@example.com',
        webhook: 'https://your-webhook-url.com/instagram',
        onError: true,
        onSuccess: true,
        dailySummary: true
      }
    }
  };

  const manager = createAutomationManager(customConfig);
  await manager.start();
}

// Example 3: Adding Posts Dynamically
async function dynamicPostManagement() {
  const manager = createAutomationManager({
    credentials: {
      username: process.env.INSTAGRAM_USERNAME!,
      password: process.env.INSTAGRAM_PASSWORD!
    }
  });

  await manager.start();

  // Add a new post to the queue
  const newPost: PostContent = {
    id: `post_${Date.now()}`,
    imagePath: '/path/to/your/image.jpg',
    caption: 'Beautiful sunrise from the mountains!',
    hashtags: ['#sunrise', '#mountains', '#nature'],
    location: 'Mountain Peak',
    status: 'pending'
  };

  await manager.addPost(newPost);
  console.log('Post added to queue');

  // Remove a post from queue
  await manager.removePost(newPost.id);
  console.log('Post removed from queue');
}

// Example 4: Pause and Resume Tasks
async function taskControl() {
  const manager = createAutomationManager({
    credentials: {
      username: process.env.INSTAGRAM_USERNAME!,
      password: process.env.INSTAGRAM_PASSWORD!
    }
  });

  await manager.start();

  // Pause hashtag engagement
  await manager.pauseTask('hashtag_engagement');
  console.log('Hashtag engagement paused');

  // Resume after 30 minutes
  setTimeout(async () => {
    await manager.resumeTask('hashtag_engagement');
    console.log('Hashtag engagement resumed');
  }, 30 * 60 * 1000);
}

// Example 5: Using API Endpoints
async function apiUsage() {
  const baseUrl = 'http://localhost:3000/api/instagram';

  // Start automation
  const startResponse = await fetch(`${baseUrl}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      config: {
        credentials: {
          username: 'your_username',
          password: 'your_password'
        }
      }
    })
  });

  const startResult = await startResponse.json();
  console.log('Start result:', startResult);

  // Check status
  const statusResponse = await fetch(`${baseUrl}/status`);
  const status = await statusResponse.json();
  console.log('Status:', status);

  // Add a post
  const postResponse = await fetch(`${baseUrl}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: 'new_post_1',
      caption: 'Test post',
      hashtags: ['#test'],
      status: 'pending'
    })
  });

  const postResult = await postResponse.json();
  console.log('Post added:', postResult);

  // Stop automation
  const stopResponse = await fetch(`${baseUrl}/stop`, {
    method: 'POST'
  });

  const stopResult = await stopResponse.json();
  console.log('Stop result:', stopResult);
}

// Example 6: Environment-based Configuration
async function environmentConfig() {
  // Set these in your .env.local file:
  // INSTAGRAM_USERNAME=your_username
  // INSTAGRAM_PASSWORD=your_password
  // INSTAGRAM_2FA_SECRET=your_2fa_secret (optional)

  const manager = createAutomationManager();
  // Will use credentials from environment variables

  await manager.start();
}

// Export examples
export {
  basicSetup,
  customConfiguration,
  dynamicPostManagement,
  taskControl,
  apiUsage,
  environmentConfig
};