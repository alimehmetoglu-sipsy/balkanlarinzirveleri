import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function PlavVusanje() {
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
            <span className="text-gray-600">Karadağ</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Plav - Vusanje
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">22 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">8-9 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">866m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2 rotate-180" />
              <div className="text-2xl font-bold">806m</div>
              <div className="text-sm text-gray-600">İniş</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-display font-bold mb-4">Hızlı Bilgiler</h2>
              <div className="space-y-3 text-sm">
                <div><strong>Minimum Yükseklik:</strong> 906 metre</div>
                <div><strong>Maksimum Yükseklik:</strong> 1,694 metre</div>
                <div><strong>Zorluk Seviyesi:</strong> Orta</div>
                <div><strong>İşaretleme:</strong> Beyaz/Kırmızı/Beyaz</div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-display font-bold mb-4">Rota Açıklaması</h2>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                      <div>
                        <h3 className="font-semibold mb-2">Genel Güzergah</h3>
                        <p>
                          Bu etap <strong>Plav'dan</strong> başlayıp Prokletije Milli Parkı içindeki
                          <strong>Vusanje köyüne</strong> ulaşır. Rota, Plav Gölü kıyısından
                          başlayarak dağlık alanlara doğru tırmanır.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                      <div>
                        <h3 className="font-semibold mb-2">Alternatif Seçenekler</h3>
                        <p>
                          Uzun mesafe nedeniyle, rotanın bir kısmı taksi veya otostop ile
                          kısaltılabilir. Özellikle Plav-Vusanje ana yolu kullanılabilir.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">Detaylı Güzergah</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">A</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Plav Merkezi</h4>
                      <p>
                        Yürüyüş Plav kasabasının merkezinden başlar. İlk bölüm göl kıyısını
                        takip ederek batıya doğru ilerler.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">B</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Göl Kıyısı Yürüyüşü</h4>
                      <p>
                        Yaklaşık 5 km boyunca Plav Gölü'nün kuzey kıyısı takip edilir.
                        Bu bölüm düz ve rahat bir yürüyüş sunar.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">C</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dağlara Tırmanış</h4>
                      <p>
                        Göl bitiminde rota güneybatıya dönerek dağlara tırmanmaya başlar.
                        Bu bölüm daha zorlayıcıdır ve yaklaşık 800 metre yükseklik kazanılır.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">D</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Taş Geçidi</h4>
                      <p>
                        1,694 metre yükseklikteki geçide ulaşılır. Buradan Prokletije
                        Dağları'nın muhteşem manzarası görülür.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">E</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Vusanje'ye İniş</h4>
                      <p>
                        Geçitten sonra Vusanje vadisine doğru iniş başlar.
                        Rota, Vusanje köyünün üst mahallelerinde son bulur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-900">Zorluk Seviyesi</h3>
                <p className="text-yellow-800 mb-3">
                  Bu etap <strong>orta</strong> zorluk seviyesindedir.
                  Uzun mesafe ve belirgin tırmanış nedeniyle iyi kondisyon gerektirir.
                </p>
                <h4 className="font-semibold mb-2">Dikkat Edilecek Hususlar:</h4>
                <ul className="list-disc list-inside text-yellow-800 space-y-1">
                  <li>Uzun mesafe - erken başlayın</li>
                  <li>Yeterli su ve yiyecek taşıyın</li>
                  <li>Hava değişimine hazırlıklı olun</li>
                  <li>Geçit bölgesinde rüzgar olabilir</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Pratik Bilgiler</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• En iyi ziyaret zamanı: Haziran - Eylül</li>
                  <li>• Su kaynağı: Rota boyunca birkaç kaynak mevcut</li>
                  <li>• Konaklama: Vusanje'de guesthouse seçenekleri</li>
                  <li>• Alternatif: Plav-Vusanje arası taksi mevcut</li>
                </ul>
              </div>

              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-red-900">Uyarılar ve Tavsiyeler</h3>
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                      <li>Uzun etap - sabah erken başlayın</li>
                      <li>Geçit bölgesinde sis olabilir</li>
                      <li>Yağmurlu havalarda kayalıklar kaygan olur</li>
                      <li>Acil durum: 112 (Karadağ)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-12 mb-4">UTM Waypoint'leri</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-4">Koordinatlara tıklayarak Google Maps'te açabilirsiniz</p>
                <div className="space-y-2 text-sm">
                  <p><strong>WP 1:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.90987,19.94672" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T438090 4749337</a>, 906m - Plav merkez</p>
                  <p><strong>WP 2:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.91543,19.92156" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T436000 4749955</a>, 910m - Göl batı ucu</p>
                  <p><strong>WP 3:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.90234,19.88976" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T433260 4748500</a>, 1243m - Dağ yolu başlangıcı</p>
                  <p><strong>WP 4:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.88765,19.85432" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T430120 4746870</a>, 1694m - Taş Geçidi</p>
                  <p><strong>WP 5:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.87234,19.82987" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T428000 4745180</a>, 1350m - İniş başlangıcı</p>
                  <p><strong>WP 6:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.85432,19.80234" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T425670 4743180</a>, 970m - Vusanje köyü</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-12">
            <Link href="/rotada" className="btn btn-secondary">
              Tüm Etaplara Dön
            </Link>
            <Link href="/rotada/vusanje-theth" className="btn btn-primary">
              Sonraki Etap: Vusanje - Theth (Final)
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}