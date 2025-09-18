import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MapPin, Mountain, Clock, AlertTriangle, ChevronRight, Home, Utensils } from 'lucide-react';

// Force cache invalidation for Vercel
export default function RotadaPage() {
  const overnights = [
    '1. Theth, Arnavutluk',
    '2. Valbonë, Arnavutluk', 
    '3. Çerem, Arnavutluk',
    '4. Dobërdol, Arnavutluk',
    '5. Milishevc, Kosova',
    '6. Reka e Allagës, Kosova',
    '7. Liqinat i Kuçishtës, Kosova',
    '8. Babino Polje, Karadağ',
    '9. Plav, Karadağ',
    '10. Vusanje, Karadağ'
  ];

  const routeStages = [
    { href: '/rotada/theth-valbone', title: 'Theth - Valbonë', day: 'Gün 1', distance: '17 km', duration: '6-7 saat', difficulty: 'Orta' },
    { href: '/rotada/valbone-cerem', title: 'Valbonë - Çerem', day: 'Gün 2', distance: '14 km', duration: '5-6 saat', difficulty: 'Kolay' },
    { href: '/rotada/cerem-doberdol', title: 'Çerem - Dobërdol', day: 'Gün 3', distance: '20 km', duration: '7-8 saat', difficulty: 'Orta' },
    { href: '/rotada/doberdol-milishevc', title: 'Dobërdol - Milishevc', day: 'Gün 4', distance: '18 km', duration: '6-7 saat', difficulty: 'Zor' },
    { href: '/rotada/milishevc-reka-allages', title: 'Milishevc - Reka e Allagës', day: 'Gün 5', distance: '21 km', duration: '7-8 saat', difficulty: 'Orta' },
    { href: '/rotada/reka-allages-kucishte', title: 'Reka e Allagës - Liqenat i Kuçishtës', day: 'Gün 6', distance: '16 km', duration: '6-7 saat', difficulty: 'Orta' },
    { href: '/rotada/kucishte-babino-polje', title: 'Liqenat i Kuçishtës - Babino Polje', day: 'Gün 7', distance: '19 km', duration: '7-8 saat', difficulty: 'Zor' },
    { href: '/rotada/babino-polje-plav', title: 'Babino Polje - Plav', day: 'Gün 8', distance: '15 km', duration: '5-6 saat', difficulty: 'Kolay' },
    { href: '/rotada/plav-vusanje', title: 'Plav - Vusanje', day: 'Gün 9', distance: '22 km', duration: '8-9 saat', difficulty: 'Orta' },
    { href: '/rotada/vusanje-theth', title: 'Vusanje - Theth', day: 'Gün 10', distance: '25 km', duration: '9-10 saat', difficulty: 'Zor' },
  ];

  const difficultyLevels = [
    {
      level: 'Kolay',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Sadece hafif yokuşlar, rahat yollar ve harita olmadan bile kolay yönlendirme.'
    },
    {
      level: 'Orta',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'İşaretli bir yolu takip eder, muhtemelen dik yokuşlar ve düşme riski vardır. Temel yönlendirme becerileri ve sağlam adımlar gereklidir.'
    },
    {
      level: 'Zor',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Genellikle belirgin bir yol yoktur. Arazi, araziyi doğru değerlendirme yeteneği ve mükemmel yönlendirme becerileri gerektirir.'
    }
  ];

  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            ROTA AÇIKLAMASI
          </h1>
          <div className="border-b-2 border-primary-600 w-24 mb-8"></div>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Fast Facts Section */}
          <div className="bg-primary-50 rounded-lg p-8 mb-12">
            <h2 className="font-display text-2xl font-bold mb-6 text-primary-900">HIZLI BİLGİLER:</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Konaklama Noktaları</h3>
                <div className="space-y-2">
                  {overnights.map((overnight, index) => (
                    <p key={index} className="text-gray-700">{overnight}</p>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Rota Özeti</h3>
                  <p className="text-gray-700 mb-4">
                    Oldukça iddialı "Balkanların Zirveleri" rotası 192 km'lik bir mesafeyi kapsar ve üç ülkeyi geçerek bir döngü tamamlar.
                  </p>
                  <p className="text-gray-700">
                    Dobërdol (Arnavutluk) ve Milishevc (Kosova) sınır bölgesinde deniz seviyesinin 2300 metre üzerine kadar çıkan yüksek alpin manzaralardan geçer.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold">Mesafe</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600">192 km</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold">Süre</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600">10-13 gün</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 mb-6">
              Yürüyüşe her ülkeden başlanabilir: Theth (Arnavutluk); Plav (Karadağ); veya Pejë (Kosova) küçük kasabasından. 
              Rotanın 10 etabı, yürüyüşçünün motivasyonu ve kondisyonuna bağlı olarak 10 ila 13 günde yürünebilir.
            </p>
            
            <p className="text-gray-700 mb-6">
              Zorluk seviyesi kolaydan ortaya kadar değişir, ancak iyi bir fiziksel kondisyon ve dağ ekipmanı gerektirir 
              (örneğin yürüyüş botları, su geçirmez giysiler, lambalar, GPS, ilk yardım kiti, cep telefonu).
            </p>
            
            <p className="text-gray-700 mb-6">
              Tüm rota işaretli ve levhalı olmasına rağmen, kısmen ıssız dağlık bölgelerden geçer. 
              Bu nedenle, bir grupta veya bir yürüyüş rehberi eşliğinde yürümek tavsiye edilir.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <p className="text-blue-900">
                <strong>DAV (Deutscher Alpen Verein) tarafından eğitilmiş</strong> ve rotayı bilen yerel dağ rehberleri, 
                bireylere ve küçük gruplara eşlik etmeye hazırdır.
              </p>
            </div>

            <h2 className="font-display text-2xl font-bold mt-12 mb-6">GÜZERGAH SEÇENEKLERİ</h2>
            
            <p className="text-gray-700 mb-6">
              Balkanların Zirveleri rotası, yürüyüşçülere çeşitli seçenekler sunar. Ana döngü rotasının yanı sıra, 
              daha kısa alternatifler veya belirli bölümlerde yürüyüş yapmak da mümkündür.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Tam Döngü Rotası</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 192 km tam döngü</li>
                  <li>• 10-13 gün süre</li>
                  <li>• Üç ülkeyi kapsayan tam deneyim</li>
                  <li>• En popüler seçenek</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Kısaltılmış Rotalar</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Theth-Valbonë-Çerem (3 gün)</li>
                  <li>• Valbonë-Dobërdol-Milishevc (4 gün)</li>
                  <li>• Plav-Vusanje-Theth (3 gün)</li>
                  <li>• Özel rota planlaması mümkün</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Teknik Detaylar</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6">
                <Mountain className="w-8 h-8 text-primary-600 mb-3" />
                <h4 className="font-semibold mb-2">Yükseklik</h4>
                <p className="text-sm text-gray-600 mb-1">Min: 670 metre (Çerem yakınları)</p>
                <p className="text-sm text-gray-600">Max: 2,290 metre (Dobërdol-Milishevc)</p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <div className="w-8 h-8 text-primary-600 mb-3">↗</div>
                <h4 className="font-semibold mb-2">Toplam Tırmanış</h4>
                <p className="text-2xl font-bold text-primary-600">~9,800 m</p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <div className="w-8 h-8 text-primary-600 mb-3">↘</div>
                <h4 className="font-semibold mb-2">Toplam İniş</h4>
                <p className="text-2xl font-bold text-primary-600">~9,900 m</p>
              </div>
            </div>
          </div>

          {/* Difficulty Levels */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Zorluk Seviyeleri</h3>
            <p className="text-gray-700 mb-6">
              Balkanların Zirveleri Rotası boyunca zorluk seviyesi kolaydan ortaya kadar değişir.
            </p>
            
            <div className="space-y-4">
              {difficultyLevels.map((level, index) => (
                <div key={index} className={`${level.bgColor} rounded-lg p-6`}>
                  <h4 className={`font-bold text-lg mb-2 ${level.color}`}>
                    {level.level}
                  </h4>
                  <p className="text-gray-700">{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GPS Data Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">GPS Verileri</h4>
                <p className="text-gray-700 mb-2">
                  Farklı bölümlerde sağlanan GPS (UTM) verileri üç kısımdan oluşur:
                </p>
                <p className="text-gray-700">
                  Waypoint numarası, UTM koordinatları ve yükseklik. Metin içinde, waypoint numaraları 
                  (örn. WP 1) her açıklamanın sonunda listelenen öğelere atıfta bulunur.
                </p>
              </div>
            </div>
          </div>

          {/* Route Stages - Detailed */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6">Rota Etapları</h3>
            <p className="text-gray-700 mb-6">
              Aşağıda Balkanların Zirveleri rotasının tüm etapları listelenmiştir. Her etap detay sayfasında 
              GPS koordinatları, yükseklik profili ve detaylı açıklamalar bulunmaktadır.
            </p>
            <div className="space-y-4">
              {routeStages.map((stage, index) => (
                <Link
                  key={stage.href}
                  href={stage.href}
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {stage.day}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          stage.difficulty === 'Kolay' ? 'bg-green-50 text-green-600' :
                          stage.difficulty === 'Orta' ? 'bg-yellow-50 text-yellow-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {stage.difficulty}
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                        {stage.title}
                      </h4>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {stage.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {stage.duration}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-16 border-t pt-12">
            <h3 className="font-display text-2xl font-bold mb-6">ÖNEMLİ BİLGİLER</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary-600" />
                  Konaklama
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Geleneksel dağ evleri (guest house)</li>
                  <li>• Yerel ailelerle konaklamalar</li>
                  <li>• Temel dağ barınakları</li>
                  <li>• Çadır kampı seçenekleri (bazı noktalarda)</li>
                  <li>• Önceden rezervasyon şiddetle tavsiye edilir</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary-600" />
                  Yemek ve Su
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Konaklamalarda yerel yemekler</li>
                  <li>• Kahvaltı ve akşam yemeği genelde dahil</li>
                  <li>• Öğle yemeği için paket servis mümkün</li>
                  <li>• Su kaynaklarına erişim değişken</li>
                  <li>• Su arıtma tabletleri tavsiye edilir</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Güvenlik Uyarıları</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Hava koşulları hızla değişebilir - her zaman hazırlıklı olun</li>
                    <li>• Bazı bölümlerde cep telefonu sinyali yoktur</li>
                    <li>• Acil durum numaralarını kaydedin</li>
                    <li>• Seyahat sigortası yaptırın</li>
                    <li>• Rotadan ayrılmayın ve işaretleri takip edin</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-lg">
              <h4 className="font-bold text-lg mb-4">İletişim ve Destek</h4>
              <p className="text-gray-700 mb-4">
                Rota hakkında daha fazla bilgi, rehber rezervasyonu veya acil durumlar için 
                yerel turizm ofisleri ve dağcılık kulüpleri ile iletişime geçebilirsiniz.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/iletisim" 
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
                >
                  İletişim Bilgileri
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/tavsiyeler" 
                  className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors inline-flex items-center gap-2"
                >
                  Seyahat Tavsiyeleri
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}