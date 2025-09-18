import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function MilishevcRekaAllagesPage() {
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
              Etap 5
            </span>
            <span className="text-gray-600">Kosova</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Milishevc - Reka e Allagës
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">16.24 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">8-9 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">863m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">1277m</div>
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
              backgroundImage: `url('/images/rotada/popodija-talijanka.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4">Hızlı Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Minimum Yükseklik:</strong> 910 metre</div>
              <div><strong>Maksimum Yükseklik:</strong> 2.136 metre</div>
              <div><strong>Zorluk Seviyesi:</strong> Orta</div>
              <div><strong>İşaretleme:</strong> Kırmızı/Beyaz/Kırmızı</div>
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
                        Bu güzergah <strong>Milishevc köyünden</strong> başlayarak
                        Gjeravica Dağı manzaralı Lumbardhi sırtına tırmanır.
                        Pusi i Magareve küçük gölünü geçerek orman ve katır yollarından
                        dik inişle <strong>Rrugova Kamp Oteli</strong> ve <strong>Reka e Allagës köyüne</strong> ulaşır.
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
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Konaklama Seçenekleri</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Rrugova Kamp Otelde konaklama imkanı bulunur.
                        Reka e Allagës'te Mustafa Hakaj pansiyonunda geleneksel yemekler ve konaklama.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Alternatif:</strong> Yürüyüşü iki güne bölme imkanı
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
                    <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Milishevc</h4>
                    <p className="text-gray-700">
                      Milishevc köyü ana yolundan başlayarak Lumbardhi sırtına doğru tırmanış.
                      Gjeravica Dağı'nın muhteşem manzaraları eşlik eder.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pusi i Magareve Gölü</h4>
                    <p className="text-gray-700">
                      Küçük göl etrafında mola vermek için ideal. Buradan sonra ormanlık
                      alana girilerek dik iniş başlar.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Rrugova Kamp</h4>
                    <p className="text-gray-700">
                      Dik orman yolundan inerek Rrugova Kamp Otele ulaşılır.
                      İçecek molasi ve dinlenme için uygun.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">D</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Reka e Allagës Köyü</h4>
                    <p className="text-gray-700">
                      Çakıl yoldan devam ederek Reka e Allagës köyüne varılır.
                      Mustafa Hakaj pansiyonunda geleneksel Kosova mutfağı.
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
                    Bu etap <strong>orta</strong> zorluk seviyesindedir. Dik iniş nedeniyle
                    dikkatli olunmalıdır.
                  </p>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Dikkat Edilecek Hususlar:</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>• Dağ manzaraları için güzel fırsatlar</li>
                      <li>• İki güne bölebilirsiniz</li>
                      <li>• Rrugova Kamp'ta dinlenme imkanı</li>
                      <li>• Geleneksel yemekler mevcuttur</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>En iyi ziyaret zamanı: Haziran - Eylül</li>
                <li>Su kaynağı: Rrugova Kamp'ta mevcut</li>
                <li>Konaklama: Rrugova Kamp Otel, Mustafa Hakaj Pansiyonu</li>
                <li>Yemek: Her iki konaklamada geleneksel mutfak</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-900 mt-0">Uyarılar ve Tavsiyeler</h3>
                  <ul className="text-amber-800 mb-0">
                    <li>Dik inişlerde dikkatli olun</li>
                    <li>Gjeravica Dağı manzarası için fotoğraf makinesi hazırlayın</li>
                    <li>Tek günde yapabilirsiniz veya iki güne bölebilirsiniz</li>
                    <li>Yerel yemekleri tatmayı unutmayın</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada/doberdol-milishevc"
              className="btn-secondary text-center"
            >
              Önceki: Dobërdol - Milishevc
            </Link>
            <Link
              href="/rotada/reka-allages-kucishte"
              className="btn-primary text-center"
            >
              Sonraki: Reka e Allagës - Kuçishte
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}