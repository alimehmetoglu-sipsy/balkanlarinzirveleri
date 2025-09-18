import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle, Mountain } from 'lucide-react';

export default function ThethValbonePage() {
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
              Etap 1
            </span>
            <span className="text-gray-600">Arnavutluk</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Theth - Valbonë
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">13.9 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">7 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">1068m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">792m</div>
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
              backgroundImage: `url('/images/rotada/theth-main.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4">Hızlı Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Minimum Yükseklik:</strong> 745 metre</div>
              <div><strong>Maksimum Yükseklik:</strong> 1.759 metre</div>
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
                        Bu güzergah <strong>Theth'ten (745 m)</strong> Valbonë Geçidi (1759 m) üzerinden 
                        <strong> Valbonë'ye (995 m)</strong> yapılan bir yürüyüşü içerir. Bu yürüyüş, 
                        Shala ve Nikaj kabile bölgelerini bağlayan eski bir katır yolunun rotasını takip eder.
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
                        Rota, Valbonë merkezine ulaşmadan yaklaşık 6 km önce Rragam'daki (WP 10) 
                        pansiyonlardan birinde geceleme yaparak iki parçaya ayrılabilir.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Alternatif:</strong> Valbonë geçidine ulaşmadan önce çayırlarda kamp yapmak
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
                    <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Theth Merkezi</h4>
                    <p className="text-gray-700">
                      Yürüyüş Theth merkezinden başlar ve çakıl bir yolda kuzeybatıya doğru devam eder. 
                      Sol tarafımızda Theth Nehri bulunur. Ana köprü ve Prek Harusha pansiyonu yönelim 
                      noktaları olarak alınabilir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">İlk Geçiş</h4>
                    <p className="text-gray-700">
                      Birkaç yüz metre sonra bir köprüyle dereyi geçer ve kavşakta hemen sağdaki patikayı alırız. 
                      Patika sağa döner ve kuzeybatıya doğru devam eder. Gusinje (Karadağ) ve Valbonë (Arnavutluk) 
                      yönündeki işaretler görülür.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Gjelaj Köyü ve Tırmanış</h4>
                    <p className="text-gray-700">
                      Yürüyüş toprak yolda nazikçe yukarı doğru devam eder. Gjelaj köyünün ilk evini ve 
                      solumuzda katır yolunu görürüz. Katır yolunu alır ve tırmanış daha dik hale gelir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">D</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Orman Geçişi ve Çayır</h4>
                    <p className="text-gray-700">
                      Yaklaşık 200 metre sonra katır yolu ormana girer ve 1 kilometre boyunca orman içinden 
                      geçerek pitoresk bir çayıra ulaşır. Bu dinlenmek için davetkar bir yerdir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">E</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Su Kaynağı ve Valbonë Geçidi</h4>
                    <p className="text-gray-700">
                      Orman içinde yaklaşık 1 kilometre yürüdükten sonra bir su kaynağına ulaşırız. 
                      Birkaç metre ötede yürüyüşçüler için yaz döneminde açık olan ahşap bir bar geçiyoruz. 
                      Yaklaşık 700 metre boyunca orman içinden güneydoğuya doğru yolu takip ederek 
                      Valbonë geçidine ulaşırız.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Valbonë Geçidi Manzarası
                </h4>
                <p className="text-gray-700">
                  Bu nokta iki vadiye (doğuda Valbonë, batıda Theth) <strong>nefes kesen manzaralar</strong> sunar.
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
                    dağ yürüyüşü deneyimi gerektirir.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Dikkat Edilecek Hususlar:</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>• Patika çoğunlukla belirgin</li>
                      <li>• Yüksek rakım ve uzun mesafe</li>
                      <li>• Dikkatli planlama gerekli</li>
                      <li>• Hava koşulları değişken olabilir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>En iyi ziyaret zamanı: Haziran - Ekim</li>
                <li>Su kaynağı: Rota boyunca birkaç doğal kaynak mevcut</li>
                <li>Konaklama: Theth'te guesthouse seçenekleri, Valbonë'de yerel aile pansiyonları</li>
                <li>Restorasyon: Her iki köyde de yerel mutfak seçenekleri</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-900 mt-0">Uyarılar ve Tavsiyeler</h3>
                  <ul className="text-amber-800 mb-0">
                    <li>Hava koşulları hızla değişebilir - katmanlı giyinin</li>
                    <li>Su geçirmez ekipman şart</li>
                    <li>GPS cihazı veya akıllı telefon navigasyonu tavsiye edilir</li>
                    <li>Acil durum için yerel kurtarma ekibi numaraları: 112 (Arnavutluk)</li>
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
                <p>WP 1: <a href="https://www.google.com/maps/search/?api=1&query=42.31795,19.78152" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T399041 4694459</a>, 716m - Theth köprüsü</p>
                <p>WP 2: <a href="https://www.google.com/maps/search/?api=1&query=42.32343,19.77867" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T398793 4695067</a>, 782m - Kavşak</p>
                <p>WP 3: <a href="https://www.google.com/maps/search/?api=1&query=42.32463,19.78432" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T399285 4695200</a>, 935m - Gjelaj köyü</p>
                <p>WP 4: <a href="https://www.google.com/maps/search/?api=1&query=42.32218,19.79356" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T400086 4694929</a>, 1193m - Çayır</p>
                <p>WP 5: <a href="https://www.google.com/maps/search/?api=1&query=42.33033,19.80733" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T401256 4695832</a>, 1397m - Su kaynağı</p>
                <p>WP 6: <a href="https://www.google.com/maps/search/?api=1&query=42.32732,19.82178" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T402500 4695499</a>, 1759m - Valbonë Geçidi</p>
                <p>WP 7: <a href="https://www.google.com/maps/search/?api=1&query=42.33163,19.81822" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T402192 4695977</a>, 1696m - Zikzaklar</p>
                <p>WP 8: <a href="https://www.google.com/maps/search/?api=1&query=42.33338,19.82258" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T402569 4696171</a>, 1528m - Dere geçişi</p>
                <p>WP 9: <a href="https://www.google.com/maps/search/?api=1&query=42.33201,19.82886" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T403108 4696019</a>, 1436m - Su kaynağı</p>
                <p>WP 10: <a href="https://www.google.com/maps/search/?api=1&query=42.33317,19.84449" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T404473 4696149</a>, 1127m - Rragam köyü</p>
                <p>WP 11: <a href="https://www.google.com/maps/search/?api=1&query=42.33398,19.84799" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T404780 4696239</a>, 1122m - Kavşak</p>
                <p>WP 12: <a href="https://www.google.com/maps/search/?api=1&query=42.35066,19.87497" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T407097 4697679</a>, 995m - Fusha e Gjes Otel</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <h3 className="text-green-900 mt-0">Valbonë'ye İniş</h3>
              <p className="text-green-800 mb-0">
                Valbonë'ye iniş kuzeybatıya başlar, ardından bir dizi zikzakla kuzeydoğuya yönelir. 
                Zikzakların sonunda (kurumuş) bir dereyi geçeriz. Daha sonra güneybatıya doğru devam 
                ederken patika açık, ormanlık bir alana girer. Yaklaşık 600 metre sonra içilebilir 
                suyu olan bir dereye ulaşırız - Rragam köyüne son inişten önce dinlenmek için iyi bir yer.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada"
              className="btn-secondary text-center"
            >
              Tüm Etaplara Dön
            </Link>
            <Link
              href="/rotada/valbone-cerem"
              className="btn-primary text-center"
            >
              Sonraki Etap: Valbonë - Çerem
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}