#!/bin/bash

# Instagram Automation Script using Claude Code
# This script runs every 5 minutes to check DMs, post scheduled content, and track analytics

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Log file
LOG_FILE="logs/instagram-automation.log"
mkdir -p logs

# Function to log messages
log_message() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to run Claude Code command
run_claude_command() {
    local command=$1
    local description=$2

    log_message "${YELLOW}Running: $description${NC}"

    # Execute Claude Code with dangerous permissions flag
    output=$(claude --dangerously-skip-permissions "$command" 2>&1)

    if [ $? -eq 0 ]; then
        log_message "${GREEN}✓ $description completed successfully${NC}"
        echo "$output" >> "$LOG_FILE"
        return 0
    else
        log_message "${RED}✗ $description failed${NC}"
        echo "$output" >> "$LOG_FILE"
        return 1
    fi
}

# Main automation loop
main() {
    log_message "${GREEN}========================================${NC}"
    log_message "${GREEN}Starting Instagram Automation Cycle${NC}"
    log_message "${GREEN}========================================${NC}"

    # Check current time for scheduling
    CURRENT_HOUR=$(date +%H)
    CURRENT_MIN=$(date +%M)
    CURRENT_TIME=$(date +%H:%M)

    # Task 1: Check and respond to DMs (every 5 minutes)
    run_claude_command "instagram-check-dms" "Checking Instagram DMs"

    # Task 2: Check for mentions and respond (every 5 minutes)
    run_claude_command "instagram-check-mentions" "Checking mentions"

    # Task 3: Hashtag engagement (every 30 minutes)
    if [ $((CURRENT_MIN % 30)) -eq 0 ]; then
        run_claude_command "instagram-hashtag-engagement" "Engaging with hashtag posts"
    fi

    # Task 4: Scheduled posting (at specific times)
    if [[ "$CURRENT_TIME" == "09:00" ]] || [[ "$CURRENT_TIME" == "18:00" ]]; then
        run_claude_command "instagram-post-scheduled" "Posting scheduled content"
    fi

    # Task 5: Analytics tracking (every hour)
    if [ "$CURRENT_MIN" -eq "00" ]; then
        run_claude_command "instagram-track-analytics" "Tracking post analytics"
    fi

    # Task 6: Comment management (every 10 minutes)
    if [ $((CURRENT_MIN % 10)) -eq 0 ]; then
        run_claude_command "instagram-manage-comments" "Managing comments"
    fi

    log_message "${GREEN}Automation cycle completed${NC}"
}

# Run main function
main

# Exit successfully
exit 0