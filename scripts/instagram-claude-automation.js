#!/usr/bin/env node

/**
 * Instagram Automation Script using Claude Code and Playwright MCP
 * Runs every 5 minutes to check DMs, post content, and analyze engagement
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);

// Configuration
const CONFIG = {
  checkInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
  instagramUrl: 'https://www.instagram.com/',
  logFile: path.join(process.cwd(), 'logs', 'instagram-automation.log'),
  postsDir: path.join(process.cwd(), 'public', 'images', 'rotada'),
  credentials: {
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD
  }
};

// Available local images
const LOCAL_IMAGES = [
  { file: 'theth-vadisi.webp', name: 'Theth Vadisi' },
  { file: 'theth-vusanje.webp', name: 'Theth-Vusanje Rotası' },
  { file: 'theth-vusanje2.webp', name: 'Theth-Vusanje Manzarası' },
  { file: 'theth-vusanje3.webp', name: 'Theth-Vusanje Patikası' },
  { file: 'theth-vusanje-runica.webp', name: 'Runica Geçidi' },
  { file: 'vusanje-zogs.webp', name: 'Vusanje-Zogs' },
  { file: 'grlase-lake-vusanje.webp', name: 'Grlase Gölü' },
  { file: 'oko-skakavice-vusanje.webp', name: 'Oko Skakavice' },
  { file: 'grebaje.webp', name: 'Grebaje Vadisi' },
  { file: 'grebaje-cow.webp', name: 'Grebaje Yaylaları' },
  { file: 'talijanka.webp', name: 'Talijanka Zirvesi' },
  { file: 'popodija-talijanka.webp', name: 'Popodija-Talijanka' }
];

// Claude Code commands to execute via Playwright MCP
const CLAUDE_COMMANDS = {
  checkDMs: `
    Use the Playwright MCP browser tools to:
    1. Navigate to Instagram (https://www.instagram.com/)
    2. Login if needed
    3. Go to Direct Messages
    4. Check for new messages
    5. Apply auto-reply rules from config
    6. Log all interactions
  `,

  checkMentions: `
    Use the Playwright MCP browser tools to:
    1. Navigate to Instagram activity/mentions
    2. Check for new mentions
    3. Like and respond to mentions based on config
    4. Track engagement metrics
  `,

  hashtagEngagement: `
    Use the Playwright MCP browser tools to:
    1. Search for Turkish hashtags: #dağcılık #doğayürüyüşü #balkanlar
    2. Like posts (max 10 per hashtag)
    3. Comment using Turkish templates
    4. Follow relevant accounts (max 5)
    5. Apply safety delays between actions
  `,

  postContent: (imagePath, caption) => `
    Use the Playwright MCP browser tools to:
    1. Navigate to Instagram
    2. Click "Create" button
    3. Upload image from: ${imagePath}
    4. Add caption: "${caption}"
    5. Add location: "Balkan Mountains"
    6. Share the post
    7. Log post ID and time
  `,

  analyzePost: (postUrl) => `
    Use the Playwright MCP browser tools to:
    1. Navigate to post: ${postUrl}
    2. Extract metrics (likes, comments, saves)
    3. Analyze comment sentiment
    4. Track follower growth
    5. Generate analytics report
  `,

  manageComments: `
    Use the Playwright MCP browser tools to:
    1. Navigate to recent posts
    2. Check new comments
    3. Like positive comments (Turkish: harika, muhteşem, güzel)
    4. Reply to questions using Turkish templates
    5. Hide spam comments
  `
};

// Logging function
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;

  // Ensure log directory exists
  const logDir = path.dirname(CONFIG.logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Write to log file
  fs.appendFileSync(CONFIG.logFile, logMessage);
  console.log(logMessage.trim());
}

// Execute Claude Code command with Playwright MCP
async function executeClaudeCommand(command, description) {
  try {
    log(`Executing: ${description}`);

    // Build the Claude command with dangerous permissions flag
    const claudeCmd = `echo '${command}' | claude --dangerously-skip-permissions`;

    const { stdout, stderr } = await execPromise(claudeCmd);

    if (stderr) {
      log(`Warning in ${description}: ${stderr}`, 'WARN');
    }

    log(`${description} completed successfully`);
    return stdout;
  } catch (error) {
    log(`Error in ${description}: ${error.message}`, 'ERROR');
    throw error;
  }
}

// Check and respond to DMs
async function checkDMs() {
  try {
    await executeClaudeCommand(CLAUDE_COMMANDS.checkDMs, 'Checking Instagram DMs');
  } catch (error) {
    log(`DM check failed: ${error.message}`, 'ERROR');
  }
}

// Check mentions
async function checkMentions() {
  try {
    await executeClaudeCommand(CLAUDE_COMMANDS.checkMentions, 'Checking mentions');
  } catch (error) {
    log(`Mention check failed: ${error.message}`, 'ERROR');
  }
}

// Hashtag engagement
async function hashtagEngagement() {
  try {
    await executeClaudeCommand(CLAUDE_COMMANDS.hashtagEngagement, 'Hashtag engagement');
  } catch (error) {
    log(`Hashtag engagement failed: ${error.message}`, 'ERROR');
  }
}

// Post scheduled content
async function postScheduledContent() {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  // Check if it's posting time (9:00 or 18:00)
  if ((hour === 9 || hour === 18) && minute === 0) {
    try {
      // Select a random image
      const randomImage = LOCAL_IMAGES[Math.floor(Math.random() * LOCAL_IMAGES.length)];
      const imagePath = path.join(CONFIG.postsDir, randomImage.file);

      // Generate caption
      const caption = `🏔️ ${randomImage.name}

Balkanların muhteşem doğası sizleri bekliyor!

📍 Peaks of the Balkans Trail
🥾 Zorluk: Orta
📸 Fotoğraf günü

#balkanlarinzirveleri #dağcılık #doğayürüyüşü #trekking #balkanlar #peaksofthebalkans`;

      await executeClaudeCommand(
        CLAUDE_COMMANDS.postContent(imagePath, caption),
        `Posting scheduled content: ${randomImage.name}`
      );

      log(`Posted: ${randomImage.name}`);
    } catch (error) {
      log(`Scheduled post failed: ${error.message}`, 'ERROR');
    }
  }
}

// Analyze post performance
async function analyzePostPerformance() {
  try {
    // This would analyze the latest posts
    const postUrl = 'https://www.instagram.com/p/latest'; // Replace with actual post URL
    await executeClaudeCommand(
      CLAUDE_COMMANDS.analyzePost(postUrl),
      'Analyzing post performance'
    );
  } catch (error) {
    log(`Analytics failed: ${error.message}`, 'ERROR');
  }
}

// Manage comments
async function manageComments() {
  try {
    await executeClaudeCommand(CLAUDE_COMMANDS.manageComments, 'Managing comments');
  } catch (error) {
    log(`Comment management failed: ${error.message}`, 'ERROR');
  }
}

// Main automation cycle
async function runAutomationCycle() {
  log('========================================');
  log('Starting Instagram Automation Cycle');
  log('========================================');

  const currentMinute = new Date().getMinutes();

  try {
    // Run every 5 minutes
    await checkDMs();
    await checkMentions();

    // Run every 10 minutes
    if (currentMinute % 10 === 0) {
      await manageComments();
    }

    // Run every 30 minutes
    if (currentMinute % 30 === 0) {
      await hashtagEngagement();
    }

    // Check for scheduled posts
    await postScheduledContent();

    // Run analytics every hour
    if (currentMinute === 0) {
      await analyzePostPerformance();
    }

    log('Automation cycle completed successfully');
  } catch (error) {
    log(`Automation cycle error: ${error.message}`, 'ERROR');
  }
}

// Setup cron job
async function setupCronJob() {
  try {
    log('Setting up cron job for automation');

    // Create cron entry for every 5 minutes
    const cronCommand = `*/5 * * * * cd ${process.cwd()} && node ${__filename}`;

    // Add to crontab
    const { stdout } = await execPromise('crontab -l 2>/dev/null || echo ""');
    const existingCrons = stdout.trim();

    if (!existingCrons.includes(__filename)) {
      const newCrons = existingCrons + '\n' + cronCommand + '\n';
      await execPromise(`echo "${newCrons}" | crontab -`);
      log('Cron job added successfully');
    } else {
      log('Cron job already exists');
    }
  } catch (error) {
    log(`Failed to setup cron job: ${error.message}`, 'ERROR');
  }
}

// Main execution
async function main() {
  // Check if running as cron job or manual
  const args = process.argv.slice(2);

  if (args.includes('--setup')) {
    await setupCronJob();
  } else if (args.includes('--run-once')) {
    await runAutomationCycle();
  } else {
    // Run continuously with interval
    log('Starting Instagram automation in continuous mode');

    // Run immediately
    await runAutomationCycle();

    // Set up interval for every 5 minutes
    setInterval(async () => {
      await runAutomationCycle();
    }, CONFIG.checkInterval);
  }
}

// Error handling
process.on('unhandledRejection', (error) => {
  log(`Unhandled rejection: ${error.message}`, 'ERROR');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  log(`Uncaught exception: ${error.message}`, 'ERROR');
  process.exit(1);
});

// Run the main function
main().catch((error) => {
  log(`Fatal error: ${error.message}`, 'ERROR');
  process.exit(1);
});