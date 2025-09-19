#!/bin/bash

echo "=== Instagram Hashtag Analyzer Test ==="
echo
echo "Testing hashtag analysis via Claude API agent"
echo "============================================"
echo

# Test 1: Direct hashtag analysis
echo "Test 1: Analyzing hashtag #dağcılık"
echo "------------------------------------"
curl -X POST http://localhost:3001/api/instagram/hashtag-analyze \
  -H "Content-Type: application/json" \
  -d '{
    "hashtag": "dağcılık"
  }' | jq '.'

echo
echo

# Test 2: Test with hashtag that includes # symbol
echo "Test 2: Analyzing hashtag with # symbol (#trekking)"
echo "---------------------------------------------------"
curl -X POST http://localhost:3001/api/instagram/hashtag-analyze \
  -H "Content-Type: application/json" \
  -d '{
    "hashtag": "#trekking"
  }' | jq '.'

echo
echo

# Test 3: Test via Claude chat endpoint with agent
echo "Test 3: Using Claude chat endpoint with instagram-hashtag-analyzer agent"
echo "------------------------------------------------------------------------"
curl -X POST http://localhost:3000/api/claude/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "#outdoor",
    "agent": "instagram-hashtag-analyzer"
  }' | jq '.'

echo
echo

# Test 4: Start monitoring (which will trigger analysis for all active hashtags)
echo "Test 4: Starting monitoring for all active hashtags"
echo "---------------------------------------------------"
curl -X POST http://localhost:3001/api/instagram/start-monitoring \
  -H "Content-Type: application/json" | jq '.'

echo
echo
echo "=== Tests Complete ==="