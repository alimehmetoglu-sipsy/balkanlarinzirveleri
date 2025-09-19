#!/bin/bash
# API için tmux üzerinden Claude çalıştırır

PROMPT="$1"
SESSION="claude-api-session"
TIMESTAMP=$(date +"%s%N")
OUTPUT_FILE="/tmp/claude-${TIMESTAMP}.json"

# Session kontrolü
if ! tmux has-session -t $SESSION 2>/dev/null; then
    tmux new-session -d -s $SESSION
    sleep 1
fi

# Prompt'u escape et
ESCAPED_PROMPT=$(printf '%q' "$PROMPT")

# Komutu tmux'ta çalıştır
tmux send-keys -t $SESSION C-c C-m
tmux send-keys -t $SESSION "cd /home/ali/balkanlarinzirveleri/scripts && ./claude-chat-logger.sh $ESCAPED_PROMPT > $OUTPUT_FILE 2>&1" C-m

# Dosyanın oluşmasını bekle (5 dakika = 300 saniye)
for i in {1..300}; do
    if [ -f "$OUTPUT_FILE" ] && grep -q "response" "$OUTPUT_FILE" 2>/dev/null; then
        cat "$OUTPUT_FILE"
        rm -f "$OUTPUT_FILE"
        exit 0
    fi
    sleep 1
done

echo '{"error": "Timeout after 5 minutes"}'