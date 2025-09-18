# Instagram Otomasyonu - Claude Code + Playwright MCP

## 🚀 Kurulum ve Kullanım

### Gereksinimler
- Claude Code CLI (`claude` komutu)
- Playwright MCP aktif
- Node.js v18+
- Instagram hesabı

### Hızlı Başlangıç

1. **Ortam değişkenlerini ayarlayın:**
```bash
cp .env.local.example .env.local
# .env.local dosyasına Instagram bilgilerinizi girin
```

2. **Otomasyonu başlatın:**
```bash
./scripts/run-instagram-automation.sh
```

## 📋 Özellikler

### Otomatik İşlemler (5 dakikada bir)
- ✉️ **DM Kontrolü**: Yeni mesajları kontrol eder ve otomatik yanıt verir
- 🔔 **Mention Takibi**: Bahsedilmeleri takip eder ve yanıtlar
- 💬 **Yorum Yönetimi**: Yorumları kontrol eder, pozitif yorumları beğenir

### Zamanlanmış İşlemler
- 📸 **Gönderi Paylaşımı** (09:00 ve 18:00): Yerel görsellerle otomatik paylaşım
- #️⃣ **Hashtag Etkileşimi** (30 dakikada bir): Türkçe hashtagleri takip eder
- 📊 **Analitik Takibi** (Saatte bir): Gönderi performansını analiz eder

## 🎯 Takip Edilen Türkçe Hashtagler
- `#dağcılık`
- `#doğayürüyüşü`
- `#türkiyedağcılık`
- `#kampçılık`
- `#doğasporları`
- `#trekkingtürkiye`
- `#balkanlar`
- `#balkanlarinzirveleri`

## 🖼️ Kullanılan Görseller
Proje içindeki `/public/images/rotada/` klasöründeki .webp görseller:
- Theth Vadisi
- Vusanje rotaları
- Grebaje Vadisi
- Talijanka Zirvesi
- ve daha fazlası...

## 🤖 Claude Code Komutları

Otomasyon şu Claude Code komutlarını kullanır:
```bash
claude --dangerously-skip-permissions "Playwright MCP ile Instagram'a giriş yap ve DM'leri kontrol et"
```

### Manuel Komutlar
```bash
# DM kontrolü
node scripts/instagram-claude-automation.js --run-once

# Sürekli mod (5 dakikada bir)
node scripts/instagram-claude-automation.js

# Cron job kurulumu
node scripts/instagram-claude-automation.js --setup
```

## ⚙️ Yapılandırma

### Güvenlik Limitleri
- Saatte maksimum 30 beğeni
- Saatte maksimum 10 yorum
- Saatte maksimum 10 takip
- Saatte maksimum 15 DM
- Eylemler arası 3-10 saniye rastgele gecikme

### Otomatik Yanıt Kuralları

#### DM Yanıtları
- **Rota bilgisi**: "rota", "patika", "yürüyüş" → Site yönlendirmesi
- **Güvenlik**: "güvenlik", "ekipman" → Güvenlik önerileri
- **İşbirliği**: "işbirliği", "sponsor" → Manuel inceleme için işaretleme
- **Selamlama**: "merhaba", "selam" → Hoş geldin mesajı

#### Yorum Şablonları
- Dağ fotoğrafları için Türkçe yorumlar
- Yürüyüş paylaşımları için teşvik edici mesajlar
- Balkan içerikleri için özel yorumlar

## 📊 Loglar ve İzleme

Tüm işlemler `/logs/instagram-automation.log` dosyasına kaydedilir:
```bash
# Son logları görüntüleme
tail -f logs/instagram-automation.log

# Hataları filtreleme
grep ERROR logs/instagram-automation.log
```

## 🛡️ Güvenlik ve İpuçları

1. **İlk kullanımda** düşük limitlerle başlayın
2. **Gece modu** 23:00-06:00 arası aktivite azalır
3. **Hafta sonu** opsiyonel duraklama mevcut
4. **Rate limiting** Instagram kurallarına uyumlu
5. **İnsan benzeri davranış** rastgele gecikmeler ve doğal akış

## 🔧 Sorun Giderme

### Claude Code bulunamadı hatası
```bash
# Claude Code kurulumu
npm install -g @anthropic/claude-cli
```

### Playwright MCP bağlantı hatası
```bash
# MCP'nin aktif olduğunu kontrol edin
claude --list-mcps
```

### Instagram giriş hatası
- 2FA varsa `.env.local` dosyasına ekleyin
- Tarayıcı çerezlerini temizleyin

## 📝 Notlar

- Otomasyon her 5 dakikada bir çalışır
- Görseller otomatik olarak yerel klasörden seçilir
- Tüm yanıtlar Türkçe olarak yapılandırılmıştır
- Google Drive görselleri de desteklenir

## 🚦 Durum Kontrolü

```bash
# Otomasyonu durumu
./scripts/run-instagram-automation.sh
# Seçenek 4'ü seçin

# Cron job kontrolü
crontab -l | grep instagram

# Process kontrolü
ps aux | grep instagram-automation
```

---

💡 **İpucu**: İlk kurulumda test modunda çalıştırın ve logları izleyin!