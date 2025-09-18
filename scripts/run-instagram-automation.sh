#!/bin/bash

# Instagram Automation Runner
# Starts the automation with Claude Code and Playwright MCP

echo "🚀 Instagram Automation Başlatılıyor..."
echo "======================================"

# Check if Claude is installed
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code kurulu değil!"
    echo "Kurulum için: https://claude.ai/code"
    exit 1
fi

# Check environment variables
if [ -z "$INSTAGRAM_USERNAME" ] || [ -z "$INSTAGRAM_PASSWORD" ]; then
    echo "⚠️  Instagram kimlik bilgileri eksik!"
    echo "Lütfen .env.local dosyasını kontrol edin:"
    echo "  INSTAGRAM_USERNAME=kullanici_adi"
    echo "  INSTAGRAM_PASSWORD=sifre"
    exit 1
fi

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
    echo "✅ Ortam değişkenleri yüklendi"
fi

# Create logs directory
mkdir -p logs

# Menu
echo ""
echo "Seçenekler:"
echo "1) Tek seferlik çalıştır"
echo "2) 5 dakikada bir otomatik çalıştır"
echo "3) Cron job olarak kur"
echo "4) Durumu kontrol et"
echo "5) Çıkış"
echo ""
read -p "Seçiminiz (1-5): " choice

case $choice in
    1)
        echo "📍 Tek seferlik çalıştırılıyor..."
        node scripts/instagram-claude-automation.js --run-once
        ;;
    2)
        echo "🔄 Sürekli mod başlatılıyor (5 dakikada bir)..."
        echo "Durdurmak için Ctrl+C"
        node scripts/instagram-claude-automation.js
        ;;
    3)
        echo "⏰ Cron job kuruluyor..."
        node scripts/instagram-claude-automation.js --setup
        echo "✅ Cron job kuruldu! Otomatik olarak 5 dakikada bir çalışacak."
        ;;
    4)
        echo "📊 Durum kontrol ediliyor..."
        echo ""
        echo "Son 10 log kaydı:"
        tail -n 10 logs/instagram-automation.log 2>/dev/null || echo "Henüz log yok"
        echo ""
        echo "Aktif cron job:"
        crontab -l 2>/dev/null | grep instagram || echo "Cron job bulunamadı"
        ;;
    5)
        echo "👋 Çıkılıyor..."
        exit 0
        ;;
    *)
        echo "❌ Geçersiz seçim!"
        exit 1
        ;;
esac

echo ""
echo "✅ İşlem tamamlandı!"