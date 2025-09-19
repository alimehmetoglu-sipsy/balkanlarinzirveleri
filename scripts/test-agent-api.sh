#!/bin/bash

echo "=== Claude API Agent Test ==="
echo

# Test 1: Yeni format - ayrı agent parametresi
echo "Test 1: Yeni format (agent parametresi ayrı)"
echo "--------------------------------------------"
curl -X POST http://localhost:3000/api/claude/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Theth köyünde güzel bir dağ manzarası var görselde. https://balkanlarinzirveleri.vercel.app/rotada/theth-valbone bu websitesindeki içerikte theth köyünü anlatıyor buradanda yardım al.",
    "agent": "instagram-content-creator"
  }'

echo
echo
echo "Test 2: Eski format (prompt içinde agent)"
echo "--------------------------------------------"
curl -X POST http://localhost:3000/api/claude/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "/instagram-content-creator agentını kullan. Theth köyünde güzel bir dağ manzarası var görselde. https://balkanlarinzirveleri.vercel.app/rotada/theth-valbone bu websitesindeki içerikte theth köyünü anlatıyor buradanda yardım al."
  }'

echo
echo
echo "Test 3: Agent parametresi olmadan"
echo "--------------------------------------------"
curl -X POST http://localhost:3000/api/claude/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Merhaba, nasılsın?"
  }'