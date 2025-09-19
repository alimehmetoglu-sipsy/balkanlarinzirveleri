#!/bin/bash
# /home/ali/balkanlarinzirveleri/scripts/init-claude-session.sh

# Tmux session oluştur (Terminal'de BİR KERE çalıştır)
SESSION_NAME="claude-api-session"

# Eğer session varsa, önce kapat
tmux has-session -t $SESSION_NAME 2>/dev/null && tmux kill-session -t $SESSION_NAME

# Yeni session oluştur
tmux new-session -d -s $SESSION_NAME bash -l

# Claude'un çalıştığından emin ol
tmux send-keys -t $SESSION_NAME "claude --version" C-m
sleep 2

# Session'ı kontrol et
echo "=== Claude API Session Başlatıldı ==="
tmux capture-pane -t $SESSION_NAME -p | tail -5

echo ""
echo "Session adı: $SESSION_NAME"
echo "Session durumu: $(tmux list-sessions | grep $SESSION_NAME)"
echo ""
echo "Claude API session hazır!"