#!/bin/bash

# Claude Code chat logger script
# Bu script Claude Code'u çalıştırır ve tüm input/output'u kaydeder
# Kullanım: ./claude-chat-logger.sh "your prompt here"

# Parametre kontrolü
if [ -z "$1" ]; then
    echo "Hata: Prompt parametresi gerekli!"
    echo "Kullanım: $0 \"your prompt here\""
    exit 1
fi

# Script dizinine göre system_prompt.md dosyasını bul
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SYSTEM_PROMPT_FILE="$SCRIPT_DIR/system_prompt.md"

# System prompt dosyasını kontrol et
if [ ! -f "$SYSTEM_PROMPT_FILE" ]; then
    echo "Uyarı: $SYSTEM_PROMPT_FILE bulunamadı!"
    exit 1
fi

# System prompt'u oku
SYSTEM_PROMPT=$(cat "$SYSTEM_PROMPT_FILE")

# Kullanıcı prompt'unu al
USER_PROMPT="$1"

# System prompt ve user prompt'u birleştir
COMBINED_PROMPT="$SYSTEM_PROMPT

User request: $USER_PROMPT"

LOG_DIR="$HOME/claude-logs"
mkdir -p "$LOG_DIR"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$LOG_DIR/claude_chat_$TIMESTAMP.log"
TEMP_FILE="/tmp/claude_output_$TIMESTAMP.txt"

# Claude Code'u headless modda çalıştır ve çıktıyı kaydet
# Her zaman script kullan (TTY simülasyonu için)
script -q -f "$LOG_FILE" -c "/usr/bin/claude --dangerously-skip-permissions -p '$COMBINED_PROMPT'" > "$TEMP_FILE" 2>&1

# JSON çıktısını yakala ve göster (markdown code block'ları arasındaki JSON)
cat "$TEMP_FILE" | sed -n '/^```json/,/^```/p' | sed '1d;$d'

# Temizlik
rm -f "$TEMP_FILE"

echo "" >&2
echo "Chat kaydedildi: $LOG_FILE" >&2
