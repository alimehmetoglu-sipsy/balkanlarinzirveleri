import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle, Mountain } from 'lucide-react';

export default function CeremDoberdolPage() {
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
              Etap 3
            </span>
            <span className="text-gray-600">Arnavutluk</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Çerem - Dobërdol
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">15.64 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">6 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">1025m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">440m</div>
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
              backgroundImage: `url('/images/rotada/theth-vadisi.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4">Hızlı Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Minimum Yükseklik:</strong> 1.152 metre</div>
              <div><strong>Maksimum Yükseklik:</strong> 1.920 metre</div>
              <div><strong>Zorluk Seviyesi:</strong> Orta</div>
              <div><strong>İşaretleme:</strong> Beyaz/Kırmızı/Beyaz</div>
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
                        Bu güzergah <strong>Çerem merkezinden (1.139 m)</strong> başlayarak Markafsha deresi boyunca
                        devam eder ve <strong>Dobërdol'deki dağ kulübesine (1.741 m)</strong> ulaşır. Rota,
                        Karadağ sınırına yakın katır yollarını takip ederek Balqin çoban köyünden geçer.
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
                        Yazın çoban köyü rotası boyunca kamp yapabilir veya çoban kulübelerinde konaklayabilirsiniz.
                        Yerel çobanlardan taze yiyecek satın alabilirsiniz.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Alternatif:</strong> Balqin köyünde veya Dobërdol dağ kulübesinde geceleme
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
                    <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Çerem Merkezi</h4>
                    <p className="text-gray-700">
                      Yürüyüş Çerem merkezinden başlar ve Markafsha deresi boyunca çakıl yolda devam eder.
                      Yol boyunca pitoresk köy manzaraları ve yeşil vadiler eşlik eder.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Dere Geçişi ve Orman</h4>
                    <p className="text-gray-700">
                      Dereyi geçtikten sonra patika ormana girer. Zikzaklarla yukarı doğru tırmanarak çayırlara
                      ulaşırız. Bu bölgede çeşitli yabani çiçekler ve kuş türleri görülebilir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sınır Yakını ve Balqin</h4>
                    <p className="text-gray-700">
                      Katır yolu Karadağ sınırına yakın devam eder. Sınır piramidini (1.593 m) geçtikten sonra
                      Balqin çoban köyüne (1.840 m) ulaşırız. Burada yerel çoban kültürünü deneyimleyebilirsiniz.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">D</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Gashi Vadisi ve Dobërdol</h4>
                    <p className="text-gray-700">
                      Balqin'den sonra rota Gashi vadisi boyunca devam eder ve Dobërdol dağ kulübesine
                      (1.741 m) ulaşır. Burası dinlenmek ve manzaranın tadını çıkarmak için ideal bir noktadır.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Dobërdol Buzul Gölleri
                </h4>
                <p className="text-gray-700">
                  Dobërdol yakınlarındaki buzul gölleri keşfedilmeye değer. <strong>Kristal berrak suları
                  ve etkileyici dağ manzaraları</strong> fotoğraf tutkunları için harika fırsatlar sunar.
                </p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-bold mb-3 text-orange-900">Zorluk Seviyesi</h3>
                  <p className="text-orange-800 mb-4">
                    Bu etap <strong>orta</strong> zorluk seviyesindedir. İyi bir fiziksel kondisyon ve
                    temel dağ yürüyüşü deneyimi yeterlidir.
                  </p>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Dikkat Edilecek Hususlar:</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>• Yaz aylarında çoban köyleri aktif</li>
                      <li>• Birden fazla su kaynağı mevcut</li>
                      <li>• Yürüyüşü iki güne bölme seçeneği</li>
                      <li>• Sınır bölgesinde dikkatli olun</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>En iyi ziyaret zamanı: Haziran - Eylül</li>
                <li>Su kaynağı: Birden fazla dere ve kaynak mevcut</li>
                <li>Konaklama: Kamp alanları, çoban kulübeleri, Dobërdol dağ kulübesi</li>
                <li>Yerel yiyecek: Çobanlardan taze süt ürünleri ve et</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-900 mt-0">Uyarılar ve Tavsiyeler</h3>
                  <ul className="text-amber-800 mb-0">
                    <li>Yaz aylarında ziyaret edin - çoban köyleri aktif olur</li>
                    <li>Sınır bölgesinde pasaport bulundurun</li>
                    <li>Dobërdol yakınlarındaki buzul göllerini keşfedin</li>
                    <li>Yerel çoban kültürünü deneyimlemek için zaman ayırın</li>
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
                <p>Çerem merkezi: <a href="https://www.google.com/maps/search/?api=1&query=42.40095,20.03411" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T 414611 4705051</a>, 1139m</p>
                <p>Sınır piramidi: <a href="https://www.google.com/maps/search/?api=1&query=42.41850,20.05665" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T 416583 4707134</a>, 1593m</p>
                <p>Balqin: <a href="https://www.google.com/maps/search/?api=1&query=42.43197,20.09287" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T 419635 4708607</a>, 1840m</p>
                <p>Dobërdol dağ kulübesi: <a href="https://www.google.com/maps/search/?api=1&query=42.45493,20.13547" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T 423294 4711127</a>, 1741m</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <h3 className="text-green-900 mt-0">Gashi Vadisi</h3>
              <p className="text-green-800 mb-0">
                Gashi vadisi boyunca yürüyüş, bölgenin en güzel doğal manzaralarından birini sunar.
                Yemyeşil çayırlar, berrak akarsular ve etkileyici dağ silsileleri rotanın son bölümünü
                unutulmaz kılar. Dobërdol'e yaklaştıkça buzul göllerinin parıltısı görülebilir.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada/valbone-cerem"
              className="btn-secondary text-center"
            >
              Önceki: Valbonë - Çerem
            </Link>
            <Link
              href="/rotada/doberdol-milishevc"
              className="btn-primary text-center"
            >
              Sonraki: Dobërdol - Milishevc
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}