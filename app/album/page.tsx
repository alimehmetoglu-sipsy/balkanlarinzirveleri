'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Camera, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AlbumPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const photoCategories = [
    {
      id: 'albania',
      country: 'Arnavutluk',
      title: 'ARNAVUTLUK',
      description: 'Theth, Valbonë ve Arnavutluk Alpleri\'nin muhteşem manzaraları',
      coverImage: 'https://peaksofthebalkans.com/gallery_gen/1f2fe7149a06ffa71e2fb58393896b08.jpg'
    },
    {
      id: 'kosovo',
      country: 'Kosova',
      title: 'KOSOVA',
      description: 'Pejë bölgesi ve Kosova\'nın dağlık kesimlerinden kareler',
      coverImage: 'https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'montenegro',
      country: 'Karadağ',
      title: 'KARADAĞ',
      description: 'Plav, Vusanje ve Karadağ\'ın büyüleyici doğası',
      coverImage: 'https://images.unsplash.com/photo-1565009848962-d4d63e37b890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'others',
      country: 'Diğerleri',
      title: 'DİĞERLERİ',
      description: 'Rota boyunca yakalanan özel anlar ve detaylar',
      coverImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // Real Albania gallery images from peaksofthebalkans.com - with correct thumbnail/full-size mappings
  const albaniaPhotos = [
    // Local Theth images
    {
      src: '/images/rotada/theth-main.png',
      thumbnail: '/images/rotada/theth-main.png',
      title: 'Theth Vadisi Genel Görünüm',
      location: 'Arnavutluk',
      category: 'albania'
    },
    {
      src: '/images/rotada/theth1.png',
      thumbnail: '/images/rotada/theth1.png',
      title: 'Theth Köyü',
      location: 'Arnavutluk',
      category: 'albania'
    },
    {
      src: '/images/rotada/theth-vadisi.webp',
      thumbnail: '/images/rotada/theth-vadisi.webp',
      title: 'Theth Vadisi Manzarası',
      location: 'Arnavutluk',
      category: 'albania'
    },
    {
      src: '/images/rotada/theth-vusanje.webp',
      thumbnail: '/images/rotada/theth-vusanje.webp',
      title: 'Theth-Vusanje Rotası',
      location: 'Arnavutluk',
      category: 'albania'
    },
    {
      src: '/images/rotada/theth-vusanje2.webp',
      thumbnail: '/images/rotada/theth-vusanje2.webp',
      title: 'Theth-Vusanje Patikası',
      location: 'Arnavutluk',
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/1f2fe7149a06ffa71e2fb58393896b08.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/1f2fe7149a06ffa71e2fb58393896b08_290x193.jpg',
      title: 'Theth Vadisi', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/6068f69f2e75b22cb516d67ba5009e30.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/6068f69f2e75b22cb516d67ba5009e30_290x193.jpg',
      title: 'Valbonë Milli Parkı', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/3916f161e9884f015706e5552812880e.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/3916f161e9884f015706e5552812880e_290x193.jpg',
      title: 'Arnavut Alpleri', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/56e49f44c933b68a9ae48062f6ba89cb.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/56e49f44c933b68a9ae48062f6ba89cb_290x193.jpg',
      title: 'Prokletije Dağları', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/c6b18b10fae261238f12a5cca2645aaf.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/c6b18b10fae261238f12a5cca2645aaf_290x193.jpg',
      title: 'Çoban Yolu', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/268660ed9a4731795394b4d806e0742b.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/268660ed9a4731795394b4d806e0742b_290x193.jpg',
      title: 'Yüksek Dağlar', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/100459e279ae0f40dcefc661305feafa.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/100459e279ae0f40dcefc661305feafa_290x193.jpg',
      title: 'Dağ Geçidi', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/f41a3a99f90b491dce7fa813f7ff81d2.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/f41a3a99f90b491dce7fa813f7ff81d2_290x193.jpg',
      title: 'Theth Kilisesi', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/c95bba941c2196a60cedbc3b69394429.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/c95bba941c2196a60cedbc3b69394429_290x193.jpg',
      title: 'Valbonë Nehri', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/91ee4d245da07c26f28bcfafe76a19bb.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/91ee4d245da07c26f28bcfafe76a19bb_290x193.jpg',
      title: 'Kayalık Zirveler', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/67fe99899f32a9edecc9d539bbe9218c.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/67fe99899f32a9edecc9d539bbe9218c_290x193.jpg',
      title: 'Yeşil Vadiler', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/14e6b99f4c898538f6aa5381e4cfddda.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/14e6b99f4c898538f6aa5381e4cfddda_290x193.jpg',
      title: 'Taş Evler', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/74629f3c23784d2010c5d9684677ba08.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/74629f3c23784d2010c5d9684677ba08_290x193.jpg',
      title: 'Dağ Patikaları', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/1c3d8a795b6b7cfceb1f048bb6daeb7a.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/1c3d8a795b6b7cfceb1f048bb6daeb7a_290x193.jpg',
      title: 'Kır Çiçekleri', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/14fe8ebc0aecbe48a7ed16d4cbf41bef.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/14fe8ebc0aecbe48a7ed16d4cbf41bef_290x193.jpg',
      title: 'Gün Batımı', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/f103009397d219a8347686454271c87f.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/f103009397d219a8347686454271c87f_290x193.jpg',
      title: 'Yaylalar', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    // Additional images with working full-size URLs
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/1037c3c3882fe3b3bdbb2514e26e5f8c.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/1037c3c3882fe3b3bdbb2514e26e5f8c_290x193.jpg',
      title: 'Dağ Manzarası', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/86265edbb40ec0ba50cf39e41b74672c.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/86265edbb40ec0ba50cf39e41b74672c_290x193.jpg',
      title: 'Vadi Görünümü', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/303accc862d787684e2faea284f07a21.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/303accc862d787684e2faea284f07a21_290x193.jpg',
      title: 'Köy Yaşamı', 
      location: 'Arnavutluk', 
      category: 'albania'
    },
    { 
      src: 'https://peaksofthebalkans.com/gallery_gen/675a38de488dad79f4058699b1ef85b9.jpg',
      thumbnail: 'https://peaksofthebalkans.com/gallery_gen/675a38de488dad79f4058699b1ef85b9_290x193.jpg',
      title: 'Dağ Kulübesi', 
      location: 'Arnavutluk', 
      category: 'albania'
    }
  ];

  // High-quality images for Kosovo
  const kosovoPhotos = [
    { 
      src: 'https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Pejë Vadisi', 
      location: 'Kosova', 
      category: 'kosovo',
      thumbnail: 'https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Rugova Kanyonu', 
      location: 'Kosova', 
      category: 'kosovo',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      src: 'https://images.unsplash.com/photo-1533654013161-e6b73938142e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Bjeshkët e Nemuna', 
      location: 'Kosova', 
      category: 'kosovo',
      thumbnail: 'https://images.unsplash.com/photo-1533654013161-e6b73938142e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      src: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Prokletije Dağları', 
      location: 'Kosova', 
      category: 'kosovo',
      thumbnail: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // High-quality images for Montenegro
  const montenegroPhotos = [
    // Local Montenegro images
    {
      src: '/images/rotada/vusanje-zogs.webp',
      thumbnail: '/images/rotada/vusanje-zogs.webp',
      title: 'Vusanje - Zogs Köyü',
      location: 'Karadağ',
      category: 'montenegro'
    },
    {
      src: '/images/rotada/grlase-lake-vusanje.webp',
      thumbnail: '/images/rotada/grlase-lake-vusanje.webp',
      title: 'Grlase Gölü',
      location: 'Karadağ',
      category: 'montenegro'
    },
    {
      src: '/images/rotada/oko-skakavice-vusanje.webp',
      thumbnail: '/images/rotada/oko-skakavice-vusanje.webp',
      title: 'Oko Skakavice (Çekirge Gözü)',
      location: 'Karadağ',
      category: 'montenegro'
    },
    {
      src: '/images/rotada/grebaje.webp',
      thumbnail: '/images/rotada/grebaje.webp',
      title: 'Grebaje Vadisi',
      location: 'Karadağ',
      category: 'montenegro'
    },
    {
      src: '/images/rotada/grebaje-cow.webp',
      thumbnail: '/images/rotada/grebaje-cow.webp',
      title: 'Grebaje Yaylası',
      location: 'Karadağ',
      category: 'montenegro'
    },
    {
      src: '/images/rotada/talijanka-main.jpg',
      thumbnail: '/images/rotada/talijanka-main.jpg',
      title: 'Talijanka Dağı',
      location: 'Karadağ',
      category: 'montenegro'
    },
    {
      src: '/images/rotada/talijanka.webp',
      thumbnail: '/images/rotada/talijanka.webp',
      title: 'Talijanka Geçidi',
      location: 'Karadağ',
      category: 'montenegro'
    },
    {
      src: '/images/rotada/popodija-talijanka.webp',
      thumbnail: '/images/rotada/popodija-talijanka.webp',
      title: 'Popodija-Talijanka Rotası',
      location: 'Karadağ',
      category: 'montenegro'
    },
    { 
      src: 'https://images.unsplash.com/photo-1565009848962-d4d63e37b890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Plav Gölü', 
      location: 'Karadağ', 
      category: 'montenegro',
      thumbnail: 'https://images.unsplash.com/photo-1565009848962-d4d63e37b890?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      src: 'https://images.unsplash.com/photo-1619551734325-81aaf323686c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Prokletije Dağları', 
      location: 'Karadağ', 
      category: 'montenegro',
      thumbnail: 'https://images.unsplash.com/photo-1619551734325-81aaf323686c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      src: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Durmitor', 
      location: 'Karadağ', 
      category: 'montenegro',
      thumbnail: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      src: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      title: 'Vusanje Köyü', 
      location: 'Karadağ', 
      category: 'montenegro',
      thumbnail: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Diğer genel resimler
  const otherPhotos = [
    {
      src: '/images/album/official-trail-map.webp',
      thumbnail: '/images/album/official-trail-map.webp',
      title: 'Resmi Rota Haritası',
      location: 'Balkanların Zirveleri',
      category: 'others'
    },
    {
      src: '/images/album/img4408.webp',
      thumbnail: '/images/album/img4408.webp',
      title: 'Dağ Manzarası',
      location: 'Balkanların Zirveleri',
      category: 'others'
    }
  ];

  const allPhotos = [...albaniaPhotos, ...kosovoPhotos, ...montenegroPhotos, ...otherPhotos];
  
  const filteredPhotos = selectedCategory === 'all' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.category === selectedCategory);

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null && selectedImage < filteredPhotos.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  // Keyboard navigation for lightbox
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  // Add keyboard event listener when lightbox is open
  if (selectedImage !== null && typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
  }

  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-6">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              FOTOĞRAF ALBÜMÜ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Balkanların Zirveleri rotasından en güzel anları ve manzaraları keşfedin
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Category Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {photoCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative overflow-hidden rounded-xl aspect-[4/3] transition-all ${
                  selectedCategory === category.id ? 'ring-4 ring-primary-500 scale-95' : ''
                }`}
              >
                <img
                  src={category.coverImage}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display text-xl font-bold mb-1">{category.title}</h3>
                  <p className="text-xs text-gray-200">{category.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü ({allPhotos.length})
            </button>
            {photoCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.country} ({allPhotos.filter(p => p.category === category.id).length})
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={photo.thumbnail || photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="font-medium text-gray-900 text-sm">{photo.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {photo.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
            <Camera className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold mb-4">Fotoğraflarınızı Paylaşın</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Balkanların Zirveleri rotasında çektiğiniz fotoğrafları bizimle paylaşın. 
              En güzel kareler web sitemizde yer alabilir!
            </p>
            <a
              href="mailto:info@balkanlarinzirveleri.com"
              className="btn-primary inline-block"
            >
              Fotoğraf Gönder
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            disabled={selectedImage === 0}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            disabled={selectedImage === filteredPhotos.length - 1}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div 
            className="max-w-6xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[selectedImage].src}
              alt={filteredPhotos[selectedImage].title}
              className="max-w-full max-h-[85vh] object-contain"
              onError={(e) => {
                // Fallback to thumbnail if full-size image fails to load
                const img = e.target as HTMLImageElement;
                if (img.src !== filteredPhotos[selectedImage].thumbnail) {
                  img.src = filteredPhotos[selectedImage].thumbnail || filteredPhotos[selectedImage].src;
                }
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="font-display text-2xl font-bold mb-2">
                {filteredPhotos[selectedImage].title}
              </h3>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {filteredPhotos[selectedImage].location}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {selectedImage + 1} / {filteredPhotos.length}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}