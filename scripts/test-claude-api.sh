#!/bin/bash

# Test script for Claude API endpoint

echo "Testing Claude API endpoint..."

# API endpoint URL
API_URL="http://localhost:3000/api/claude/chat"

# Test prompt
PROMPT="give me 1 to 10 even numbers"

# Send POST request
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"prompt\": \"$PROMPT\"}")

# Check if response is valid JSON
if echo "$response" | jq . >/dev/null 2>&1; then
    echo "✅ API Response (valid JSON):"
    echo "$response" | jq .
else
    echo "❌ Invalid response:"
    echo "$response"
fi