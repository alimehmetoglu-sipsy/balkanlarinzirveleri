import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function BabinoPolje() {
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
              Etap 8
            </span>
            <span className="text-gray-600">Karadağ</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Babino Polje - Plav
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">15 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">5-6 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">382m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2 rotate-180" />
              <div className="text-2xl font-bold">641m</div>
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
                <div><strong>Maksimum Yükseklik:</strong> 1,415 metre</div>
                <div><strong>Zorluk Seviyesi:</strong> Kolay</div>
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
                          Bu etap <strong>Babino Polje'den</strong> başlayıp
                          Plav Gölü kıyısındaki <strong>Plav kasabasına</strong> iner.
                          Rota çoğunlukla ormanlık alanlardan geçer ve kolay bir iniş sunar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                      <div>
                        <h3 className="font-semibold mb-2">Konaklama Seçenekleri</h3>
                        <p>
                          Plav, bölgenin en büyük yerleşimlerinden biri olarak çeşitli konaklama
                          seçenekleri sunar. Oteller, pansiyonlar ve market imkanları mevcuttur.
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
                      <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Babino Polje</h4>
                      <p>
                        Yürüyüş Babino Polje köyünden başlar. İşaretli patika köyün
                        alt kısmından kuzeydoğuya doğru ilerler.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">B</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Orman Patikası</h4>
                      <p>
                        Rota orman içinde kademeli olarak iner. Patika iyi durumda ve
                        takip etmesi kolaydır. Yaklaşık 2 saat boyunca güzel orman
                        manzaraları eşliğinde yürünür.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">C</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Vusanje Yol Kavşağı</h4>
                      <p>
                        Orman sonunda Vusanje'ye giden ana yola ulaşılır.
                        Buradan Plav'a hem yürüyerek hem de otostop yaparak devam edilebilir.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">D</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Plav Gölü Kıyısı</h4>
                      <p>
                        Yol Plav Gölü'nün güney kıyısını takip eder.
                        Göl manzarası eşliğinde yaklaşık 5 km daha yürünür.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">E</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Plav Kasabası</h4>
                      <p>
                        Rota Plav kasabasının merkezinde son bulur.
                        Kasabada market, restoran, otel ve diğer tesisler mevcuttur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-900">Zorluk Seviyesi</h3>
                <p className="text-yellow-800 mb-3">
                  Bu etap <strong>kolay</strong> zorluk seviyesindedir.
                  Çoğunlukla iniş olan rota, yeni başlayanlar için uygundur.
                </p>
                <h4 className="font-semibold mb-2">Dikkat Edilecek Hususlar:</h4>
                <ul className="list-disc list-inside text-yellow-800 space-y-1">
                  <li>Orman patikası ıslak havalarda kaygan olabilir</li>
                  <li>Ana yolda araç trafiğine dikkat</li>
                  <li>Göl kıyısında rüzgar olabilir</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Pratik Bilgiler</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• En iyi ziyaret zamanı: Haziran - Ekim</li>
                  <li>• Su kaynağı: Yol boyunca sınırlı, yeterli su taşıyın</li>
                  <li>• Konaklama: Plav'da otel ve pansiyon seçenekleri</li>
                  <li>• Ulaşım: Plav'dan diğer şehirlere otobüs seferleri</li>
                </ul>
              </div>

              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-red-900">Uyarılar ve Tavsiyeler</h3>
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                      <li>Ana yolda yürürken trafik kurallarına uyun</li>
                      <li>Plav'da konaklama için önceden rezervasyon yapın</li>
                      <li>Göl kıyısında sivrisinek kovucu kullanın</li>
                      <li>Acil durum: 112 (Karadağ)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-12 mb-4">UTM Waypoint'leri</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-4">Koordinatlara tıklayarak Google Maps'te açabilirsiniz</p>
                <div className="space-y-2 text-sm">
                  <p><strong>WP 1:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.84890,19.95313" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T438625 4742580</a>, 1165m - Babino Polje başlangıç</p>
                  <p><strong>WP 2:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.85473,19.94287" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T437760 4743227</a>, 1088m - Orman girişi</p>
                  <p><strong>WP 3:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.86982,19.92853" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T436550 4744900</a>, 962m - Vusanje yol kavşağı</p>
                  <p><strong>WP 4:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.88234,19.93876" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T437420 4746287</a>, 915m - Göl kıyısı başlangıcı</p>
                  <p><strong>WP 5:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.90987,19.94672" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T438090 4749337</a>, 906m - Plav merkez</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-12">
            <Link href="/rotada" className="btn btn-secondary">
              Tüm Etaplara Dön
            </Link>
            <Link href="/rotada/plav-vusanje" className="btn btn-primary">
              Sonraki Etap: Plav - Vusanje
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}