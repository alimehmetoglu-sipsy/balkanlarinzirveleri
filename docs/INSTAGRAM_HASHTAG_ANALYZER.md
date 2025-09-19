# Instagram Hashtag Analyzer System

## Özet
Instagram hashtag'lerini analiz eden ve veritabanına kaydeden bir sistem. Hem mock data hem de gerçek Instagram verisi (Claude Agent + Playwright MCP üzerinden) ile çalışabilir.

## Sistem Mimarisi

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Hashtag Page   │────▶│ start-monitoring │────▶│ hashtag-analyze │
│  (Frontend)     │     │     (API)        │     │     (API)       │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                           │
                                                           ▼
                               ┌──────────────────────────────────────┐
                               │         Claude Agent                 │
                               │  (instagram-hashtag-analyzer)        │
                               │                                      │
                               │  ┌────────────────────────────┐     │
                               │  │   Playwright MCP ile       │     │
                               │  │   Instagram'a bağlan       │     │
                               │  │   Hashtag verisi topla     │     │
                               │  └────────────────────────────┘     │
                               └──────────────────────────────────────┘
                                                           │
                                                           ▼
                                                 ┌──────────────┐
                                                 │   Database   │
                                                 │  (SQLite)    │
                                                 └──────────────┘
```

## API Endpoints

### 1. `/api/instagram/hashtag-analyze`
Tek bir hashtag'i analiz eder.

**Request:**
```json
POST /api/instagram/hashtag-analyze
{
  "hashtag": "dağcılık"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Hashtag #dağcılık analyzed successfully",
  "data": {
    "hashtag": "dağcılık",
    "stats": {
      "totalPosts": 125000,
      "avgLikes": 245,
      "avgComments": 12,
      "engagementRate": 3.5
    },
    "topPosts": [...],
    "relatedHashtags": ["doğa", "kamp", "trekking"],
    "postingFrequency": {...}
  }
}
```

### 2. `/api/instagram/start-monitoring`
Tüm aktif hashtag'leri analiz eder.

**Request:**
```json
POST /api/instagram/start-monitoring
```

**Response:**
```json
{
  "success": true,
  "message": "Started monitoring 3 active hashtags",
  "hashtagsMonitored": ["dağcılık", "trekking", "outdoor"],
  "analyzed": ["dağcılık", "trekking", "outdoor"],
  "results": 3
}
```

## Claude Agent Kurulumu

### 1. System Prompt
`scripts/system_prompt_hashtag_analyzer.md` dosyası agent'ın talimatlarını içerir.

### 2. Mock Mode vs Real Mode

#### Mock Mode (Şu anda aktif):
```javascript
// app/api/instagram/hashtag-analyze/route.ts
const USE_MOCK_DATA = true; // Mock data kullan
```

#### Real Mode (Claude + Playwright):
```javascript
const USE_MOCK_DATA = false; // Gerçek Instagram verisi
```

### 3. Tmux Session Kurulumu

Real mode için tmux session gerekli:

```bash
# Tmux session başlat
cd /home/ali/balkanlarinzirveleri/scripts
./init-claude-session.sh

# Claude login
tmux attach -t claude-api-session
claude login
# (Login olduktan sonra Ctrl+B, D ile çık)
```

### 4. Agent Testi

```bash
# Test script'i çalıştır
cd /home/ali/balkanlarinzirveleri/scripts
./test-hashtag-analyzer.sh
```

## Database Şeması

### instagram_hashtags Tablosu
```sql
CREATE TABLE instagram_hashtags (
  id INTEGER PRIMARY KEY,
  hashtag TEXT UNIQUE,
  is_active BOOLEAN,
  category TEXT,
  priority TEXT,
  language TEXT,
  posts_found INTEGER,
  comments_posted INTEGER,
  avg_engagement REAL,
  last_checked DATETIME,
  added_date DATETIME
);
```

### instagram_hashtag_analytics Tablosu
```sql
CREATE TABLE instagram_hashtag_analytics (
  id INTEGER PRIMARY KEY,
  hashtag_id INTEGER,
  analysis_date DATETIME,
  total_posts INTEGER,
  avg_likes INTEGER,
  avg_comments INTEGER,
  engagement_rate REAL,
  top_posts TEXT,         -- JSON array
  related_hashtags TEXT,  -- JSON array
  posting_frequency TEXT, -- JSON object
  FOREIGN KEY (hashtag_id) REFERENCES instagram_hashtags(id)
);
```

## Playwright MCP Komutları

Agent şu MCP komutlarını kullanır:

1. **Instagram'a Git:**
```javascript
mcp__playwright__browser_navigate("https://www.instagram.com")
```

2. **Hashtag Sayfasına Git:**
```javascript
mcp__playwright__browser_navigate(`https://www.instagram.com/explore/tags/${hashtag}/`)
```

3. **Veri Çek:**
```javascript
mcp__playwright__browser_evaluate({
  function: `() => {
    const postCount = document.querySelector('[selector]')?.textContent;
    return { totalPosts: postCount };
  }`
})
```

4. **Post Detayları:**
```javascript
mcp__playwright__browser_click({ ref: "post_ref", element: "Post" })
// Detayları al
mcp__playwright__browser_navigate_back()
```

## Kullanım Senaryoları

### Senaryo 1: Yeni Hashtag Ekle ve Analiz Et
1. Admin panel'den hashtag ekle
2. "İzlemeyi Başlat" butonuna tıkla
3. Sistem otomatik analiz yapar
4. Sonuçlar database'e kaydedilir

### Senaryo 2: Manuel Hashtag Analizi
```bash
curl -X POST http://localhost:3001/api/instagram/hashtag-analyze \
  -H "Content-Type: application/json" \
  -d '{"hashtag": "nature"}'
```

### Senaryo 3: Claude Agent ile Analiz
```bash
curl -X POST http://localhost:3000/api/claude/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "#outdoor",
    "agent": "instagram-hashtag-analyzer"
  }'
```

## Hata Durumları

### 1. Tmux Session Hatası
```
Error: Tmux session not found
Çözüm: ./init-claude-session.sh çalıştır
```

### 2. Claude Login Hatası
```
Error: Claude not authenticated
Çözüm: tmux attach -t claude-api-session && claude login
```

### 3. Instagram Rate Limit
```
Error: Rate limited by Instagram
Çözüm: 5-10 dakika bekle
```

## Geliştirilecek Özellikler

1. **Gerçek Instagram Login:**
   - Environment variables'dan credentials
   - Cookie persistence
   - Session management

2. **Gelişmiş Analiz:**
   - Competitor analysis
   - Trend detection
   - Engagement prediction

3. **Otomasyon:**
   - Scheduled analysis
   - Alert system
   - Auto-commenting based on analysis

4. **Raporlama:**
   - PDF export
   - Weekly/Monthly reports
   - Comparison charts

## Test Edilebilir Hashtag'ler

- Türkçe: #dağcılık, #kamp, #doğa, #trekking
- İngilizce: #hiking, #outdoor, #nature, #adventure
- Lokasyon: #theth, #valbona, #prokletije

---

*Son Güncelleme: 19 Eylül 2025*
*Geliştirici: Claude Code Assistant*