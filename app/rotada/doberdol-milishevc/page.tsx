import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function DoberdolMilishevcPage() {
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
              Etap 4
            </span>
            <span className="text-gray-600">Arnavutluk - Kosova</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Dobërdol - Milishevc
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">18.2 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">8-9 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">915m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">980m</div>
              <div className="text-sm text-gray-600">İniş</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="relative w-full h-96 rounded-2xl overflow-hidden mb-8"
            style={{
              backgroundImage: `url('/images/rotada/grebaje.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4">Hızlı Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Minimum Yükseklik:</strong> 1.534 metre</div>
              <div><strong>Maksimum Yükseklik:</strong> 2.290 metre</div>
              <div><strong>Zorluk Seviyesi:</strong> Orta</div>
              <div><strong>İşaretleme:</strong> Beyaz/Kırmızı/Beyaz (sınıra kadar), Kırmızı/Beyaz/Kırmızı (sınırdan sonra)</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <h2 className="font-display text-3xl font-bold mb-6 text-gray-900">Rota Açıklaması</h2>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Genel Güzergah</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Bu güzergah <strong>Dobërdol dağ kulübesinden (1.741 m)</strong> başlayarak
                        Arnavutluk, Kosova ve Karadağ arasındaki sınıra (2.218 m) tırmanır.
                        Maja e Qenit dağını geçerek Roshkodoli geçidinden <strong>Milishevc köyüne (1.743 m)</strong> iner.
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
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Alternatif Rota</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Bjeshka e Belegut üzerinden alternatif bir rota mevcuttur. Ana rota zorlayıcı
                        görünürse bu alternatif değerlendirilebilir.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Konaklama:</strong> Milishevc'te dağ kulübeleri, Roshkodol köyünde geceleme imkanı
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-display text-2xl font-bold mb-6 text-gray-900">Detaylı Güzergah</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Dobërdol</h4>
                    <p className="text-gray-700">
                      Yürüyüş Dobërdol dağ kulübesinden başlar. Sınıra doğru dik bir tırmanış başlar.
                      Yol boyunca muhteşem vadi manzaraları eşlik eder.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Üç Ülke Sınırı</h4>
                    <p className="text-gray-700">
                      2.218 metre yükseklikte Arnavutluk, Kosova ve Karadağ'in buluştuğu sınır noktasına
                      ulaşırız. Burada üç ülkeyi aynı anda görebilirsiniz.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Maja e Qenit ve Roshkodoli</h4>
                    <p className="text-gray-700">
                      Sınır boyunca ilerleyerek Maja e Qenit dağını geçeriz. Roshkodoli geçidinden
                      vadiye doğru iniş başlar. Bu bölümde dikkatli olunmalıdır.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">D</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Milishevc Köyü</h4>
                    <p className="text-gray-700">
                      Vadi boyunca inerek Milishevc köyüne ulaşırız. Köyde dağ kulübelerinde
                      konaklama imkanı bulunmaktadır.
                    </p>
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
                    Bu etap <strong>orta</strong> zorluk seviyesindedir. Yüksek rakım ve uzun mesafe
                    nedeniyle iyi kondisyon gerektirir.
                  </p>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Dikkat Edilecek Hususlar:</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>• Sınır geçişi - pasaport gerekli</li>
                      <li>• Yüksek rakımda hava değişken</li>
                      <li>• Alternatif rota seçeneği mevcut</li>
                      <li>• İki güne bölme imkanı</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>En iyi ziyaret zamanı: Haziran - Eylül</li>
                <li>Su kaynağı: Sınırlı, yeterli su taşıyın</li>
                <li>Konaklama: Milishevc dağ kulübeleri</li>
                <li>Sınır geçişi: Pasaport zorunlu</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-900 mt-0">Uyarılar ve Tavsiyeler</h3>
                  <ul className="text-amber-800 mb-0">
                    <li>Sınır geçişi için pasaportunuzu yanınızda bulundurun</li>
                    <li>Yüksek rakım nedeniyle sıcak giysiler alın</li>
                    <li>Hava koşullarını kontrol edin</li>
                    <li>Zorlanırsanız alternatif rotayı değerlendirin</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>UTM Waypoint'leri</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                Koordinatlara tıklayarak Google Maps'te açabilirsiniz
              </p>
              <div className="grid md:grid-cols-2 gap-2 font-mono text-xs">
                <p>WP 1: <a href="https://www.google.com/maps/search/?api=1&query=42.45493,20.13547" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T423294 4711127</a>, 1741m - Dobërdol dağ kulübesi</p>
                <p>WP 2: <a href="https://www.google.com/maps/search/?api=1&query=42.46234,20.14876" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T424390 4711950</a>, 1920m - Orman sınırı</p>
                <p>WP 3: <a href="https://www.google.com/maps/search/?api=1&query=42.47123,20.16543" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T425780 4712930</a>, 2218m - Üç ülke sınırı</p>
                <p>WP 4: <a href="https://www.google.com/maps/search/?api=1&query=42.47890,20.17234" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T426380 4713780</a>, 2290m - Maja e Qenit</p>
                <p>WP 5: <a href="https://www.google.com/maps/search/?api=1&query=42.48567,20.18123" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T427180 4714530</a>, 2150m - Roshkodoli geçidi</p>
                <p>WP 6: <a href="https://www.google.com/maps/search/?api=1&query=42.49234,20.19876" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T428630 4715270</a>, 1890m - İniş başlangıcı</p>
                <p>WP 7: <a href="https://www.google.com/maps/search/?api=1&query=42.49876,20.21234" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T429850 4715980</a>, 1743m - Milishevc köyü</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada/cerem-doberdol"
              className="btn-secondary text-center"
            >
              Önceki: Çerem - Dobërdol
            </Link>
            <Link
              href="/rotada/milishevc-reka-allages"
              className="btn-primary text-center"
            >
              Sonraki: Milishevc - Reka e Allagës
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}