import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function PlavVusanjePage() {
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
              Etap 9
            </span>
            <span className="text-gray-600">Karada</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Plav - Vusanje
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">27.4 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">10-11 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">1138m</div>
              <div className="text-sm text-gray-600">T1rman1_</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">1084m</div>
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
              backgroundImage: `url('/images/rotada/vusanje-zogs.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4">H1zl1 Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Minimum Yükseklik:</strong> 968 metre</div>
              <div><strong>Maksimum Yükseklik:</strong> 2.106 metre (Bor Tepesi)</div>
              <div><strong>Zorluk Seviyesi:</strong> Orta</div>
              <div><strong>0_aretleme:</strong> K1rm1z1 daire/Beyaz dolgu</div>
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
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Bor Tepesi Rotas1</h3>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Plav'dan</strong> ba_layarak Bor Tepesine (2.106 m) t1rman1r.
                        Prokletije Milli Park1 içinden geçerek ladin, köknar ve kay1n
                        kar1_1k ormanlar1ndan ilerler. Birkaç katun (çoban yerle_imi) ve
                        küçük göllerin yan1ndan geçerek <strong>Vusanje köyüne</strong> iner.
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
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Doal Güzellikler</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Rota boyunca Grlja nehrindeki _elale, yabani yaban mersini toplama
                        imkan1 ve muhte_em da manzaralar1 bulunur.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Alternatif:</strong> Zla Kolata zirvesine yan gezi (alpin ekipman gerekli)
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
                    Bu etap <strong>orta</strong> zorluk seviyesindedir. Uzun mesafe ve yüksek
                    t1rman1_ nedeniyle zorlu say1labilir.
                  </p>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Dikkat Edilecek Hususlar:</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>" Kolenovica Katun'da geceleme mümkün</li>
                      <li>" Su kaynaklar1: Radunov laz, Katun Paljvukaj, Katun Grlata</li>
                      <li>" Yaz1n katunlarda konaklama imkan1</li>
                      <li>" Zorlu bölümler için yerel rehber önerilir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>En iyi ziyaret zaman1: Haziran - Eylül</li>
                <li>Su kayna1: Birkaç katunda mevcut</li>
                <li>Konaklama: Katunlarda yaz aylar1nda</li>
                <li>Doal ürünler: Yabani yaban mersini</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada/babino-polje-plav"
              className="btn-secondary text-center"
            >
              Önceki: Babino Polje - Plav
            </Link>
            <Link
              href="/rotada/vusanje-theth"
              className="btn-primary text-center"
            >
              Sonraki: Vusanje - Theth
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}