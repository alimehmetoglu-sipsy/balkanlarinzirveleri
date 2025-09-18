import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function VusanjeThethPage() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/rotada" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-5 h-5" />
            Rotaya Geri Dön
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Etap 10
            </span>
            <span className="text-gray-600">Karada - Arnavutluk</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Vusanje - Theth
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">21.35 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">8 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">1111m</div>
              <div className="text-sm text-gray-600">T1rman1_</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">1437m</div>
              <div className="text-sm text-gray-600">0ni_</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="relative w-full h-96 rounded-2xl overflow-hidden mb-8"
            style={{
              backgroundImage: `url('/images/rotada/theth-vusanje.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4">H1zl1 Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Minimum Yükseklik:</strong> 726 metre</div>
              <div><strong>Maksimum Yükseklik:</strong> 1.748 metre</div>
              <div><strong>Zorluk Seviyesi:</strong> Orta</div>
              <div><strong>0_aretleme:</strong> K1rm1z1 daire/Beyaz (Karada), K1rm1z1/Beyaz/K1rm1z1 (Arnavutluk)</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <h2 className="font-display text-3xl font-bold mb-6 text-gray-900">Rota Aç1klamas1</h2>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Final Etab1</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Balkanlar1n Zirveleri rotas1n1n son etab1 <strong>Vusanje'den</strong> ba_lar.
                        ^elale ve "mavi göz" gölünü geçtikten sonra Komünist dönemi piramidinin
                        bulunduu Arnavutluk s1n1r1na ula_1r. Me_e ve çam ormanlar1ndan geçerek
                        <strong>Pejës geçidinden</strong> muhte_em vadi manzaralar1yla
                        <strong>Theth köyüne</strong> iner.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Theth'te Görülecek Yerler</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Theth köyünde mavi göz, _elale, kan kulesi ve etnografik müze
                        ziyaret edilebilir. Okol ve Theth'te pansiyonlar mevcuttur.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Alternatif:</strong> Sheh i Bardh çay1r1nda geceleme imkan1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-bold mb-3 text-orange-900">Zorluk Seviyesi</h3>
                  <p className="text-orange-800 mb-4">
                    Bu etap <strong>orta</strong> zorluk seviyesindedir. Dik da arazisi
                    nedeniyle dikkatli olunmal1d1r.
                  </p>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Dikkat Edilecek Hususlar:</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>" 0ki güne bölme imkan1 var</li>
                      <li>" Su kaynaklar1 kontrol edilmeli</li>
                      <li>" S1n1r geçi_i için pasaport gerekli</li>
                      <li>" Yaz1n çobanlar mevcut olabilir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <h3 className="text-green-900 mt-0">Tebrikler!</h3>
              <p className="text-green-800 mb-0">
                Balkanlar1n Zirveleri rotas1n1 tamamlad1n1z! 192 kilometrelik bu muhte_em
                yolculukta üç ülke, onlarca köy ve say1s1z doal güzellik gördünüz.
                Theth'te dinlenip maceran1z1 kutlayabilirsiniz.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>En iyi ziyaret zaman1: Haziran - Eylül</li>
                <li>Su kayna1: Rota boyunca kontrol edilmeli</li>
                <li>Konaklama: Theth'te çok say1da pansiyon</li>
                <li>Ula_1m: Theth'ten Shkodra'ya minibüs servisi</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada/plav-vusanje"
              className="btn-secondary text-center"
            >
              Önceki: Plav - Vusanje
            </Link>
            <Link
              href="/rotada"
              className="btn-primary text-center"
            >
              Tüm Rotalara Dön
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}