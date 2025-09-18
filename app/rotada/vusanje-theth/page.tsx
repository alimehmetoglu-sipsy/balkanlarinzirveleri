import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function VusanjeTheth() {
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
            <span className="text-gray-600">Karadağ - Arnavutluk</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Vusanje - Theth
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">25 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">9-10 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1290m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2 rotate-180" />
              <div className="text-2xl font-bold">1460m</div>
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
                <div><strong>Minimum Yükseklik:</strong> 745 metre</div>
                <div><strong>Maksimum Yükseklik:</strong> 2,040 metre</div>
                <div><strong>Zorluk Seviyesi:</strong> Zor</div>
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
                          Rotanın son ve en uzun etabı, <strong>Vusanje'den</strong> başlayıp
                          Peja Geçidi (2040m) üzerinden <strong>Theth'e</strong> iner.
                          Bu etap rotanın döngüsünü tamamlar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                      <div>
                        <h3 className="font-semibold mb-2">Zorluk ve Alternatifler</h3>
                        <p>
                          En zorlu etaplardan biridir. Uzun mesafe ve yüksek tırmanış nedeniyle
                          iyi kondisyon gerektirir. Alternatif olarak Vusanje-Theth arası
                          taksi transferi de mümkündür.
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
                      <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Vusanje</h4>
                      <p>
                        Yürüyüş Vusanje köyünün üst mahallelerinden başlar.
                        İlk bölüm orman içinden geçen dik bir tırmanıştır.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">B</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ropojana Vadisi</h4>
                      <p>
                        Orman sınırının üzerinde açık araziye çıkılır.
                        Ropojana Vadisi'nin muhteşem manzarası görülür.
                        Bu bölümde yaklaşık 1000 metre tırmanılır.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">C</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Peja Geçidi</h4>
                      <p>
                        2040 metre yüksekliğindeki Peja Geçidi'ne ulaşılır.
                        Bu nokta Karadağ-Arnavutluk sınırıdır ve rotanın en yüksek noktalarından biridir.
                        Buradan Prokletije Dağları'nın panoramik manzarası görülür.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">D</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Theth'e İniş</h4>
                      <p>
                        Geçitten sonra Theth vadisine doğru uzun bir iniş başlar.
                        İlk bölüm taşlık ve dikkat gerektiren bir araziden geçer.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">E</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Theth Köyü</h4>
                      <p>
                        Yaklaşık 1300 metre iniş sonunda Theth köyüne ulaşılır.
                        Rota, başladığı noktada son bulur ve döngü tamamlanır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-900">Zorluk Seviyesi</h3>
                <p className="text-yellow-800 mb-3">
                  Bu etap <strong>zor</strong> zorluk seviyesindedir.
                  Uzun mesafe, yüksek tırmanış ve teknik iniş nedeniyle deneyim gerektirir.
                </p>
                <h4 className="font-semibold mb-2">Dikkat Edilecek Hususlar:</h4>
                <ul className="list-disc list-inside text-yellow-800 space-y-1">
                  <li>Çok erken başlayın (06:00-07:00)</li>
                  <li>Yeterli su ve enerji barı taşıyın</li>
                  <li>Hava değişimine hazırlıklı olun</li>
                  <li>GPS ve harita bulundurun</li>
                  <li>Geçit bölgesinde sis olabilir</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Pratik Bilgiler</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• En iyi ziyaret zamanı: Temmuz - Eylül</li>
                  <li>• Su kaynağı: Geçide kadar sınırlı, yeterli su taşıyın</li>
                  <li>• Konaklama: Theth'te çok sayıda guesthouse</li>
                  <li>• Alternatif: Vusanje-Theth arası 4x4 taksi transferi</li>
                </ul>
              </div>

              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-red-900">Uyarılar ve Tavsiyeler</h3>
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                      <li>Bu etap için mutlaka erken başlayın</li>
                      <li>Yalnız yürümeyin, rehber tercih edin</li>
                      <li>Kötü havada bu rotayı yürümeyin</li>
                      <li>Acil durum: 112 (her iki ülkede geçerli)</li>
                      <li>Sınır geçişi için pasaport gerekli</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-12 mb-4">UTM Waypoint'leri</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-4">Koordinatlara tıklayarak Google Maps'te açabilirsiniz</p>
                <div className="space-y-2 text-sm">
                  <p><strong>WP 1:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.85432,19.80234" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T425670 4743180</a>, 970m - Vusanje başlangıç</p>
                  <p><strong>WP 2:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.84123,19.78456" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T423890 4741730</a>, 1250m - Orman sınırı</p>
                  <p><strong>WP 3:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.82987,19.76543" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T421980 4740470</a>, 1680m - Açık arazi</p>
                  <p><strong>WP 4:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.81234,19.74321" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T419870 4738530</a>, 2040m - Peja Geçidi</p>
                  <p><strong>WP 5:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.79876,19.72345" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T417980 4737020</a>, 1750m - İniş başlangıcı</p>
                  <p><strong>WP 6:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.38456,19.70123" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T415870 4735210</a>, 1350m - Orman girişi</p>
                  <p><strong>WP 7:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.36543,19.68765" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T414230 4733090</a>, 1050m - Su kaynağı</p>
                  <p><strong>WP 8:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.34321,19.67234" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T412560 4730620</a>, 850m - Theth yaklaşımı</p>
                  <p><strong>WP 9:</strong> <a href="https://www.google.com/maps/search/?api=1&query=42.39795,19.77452" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">34T398793 4695067</a>, 745m - Theth merkez</p>
                </div>
              </div>

              <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-900">Tebrikler!</h3>
                <p className="text-green-800">
                  Balkanların Zirveleri rotasının son etabını tamamladınız!
                  192 km'lik bu efsanevi yolculukta üç ülkeyi geçtiniz ve
                  unutulmaz deneyimler yaşadınız. Bu başarınızla gurur duyabilirsiniz!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-12">
            <Link href="/rotada" className="btn btn-secondary">
              Tüm Etaplara Dön
            </Link>
            <Link href="/" className="btn btn-primary">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}