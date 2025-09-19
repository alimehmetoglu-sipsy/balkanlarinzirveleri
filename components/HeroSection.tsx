'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Play, Users, Award, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroSectionProps {
  data?: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [participantCount, setParticipantCount] = useState(2847);
  const [spotsLeft, setSpotsLeft] = useState(23);
  const [recentBooking, setRecentBooking] = useState({ name: 'Ahmet K.', city: 'İstanbul', time: '2 dakika' });
  const [showNotification, setShowNotification] = useState(false);
  
  const heroData = data || {
    title: 'Peak of the Balkans',
    subtitle: 'Arnavutluk • Kosova • Karadağ',
    description: '192 kilometrelik efsanevi patikada, Balkanların en vahşi ve el değmemiş dağlarını keşfet.',
    ctaText: 'Yerini Ayırt - Sadece ' + spotsLeft + ' Kişilik Yer Kaldı',
    ctaLink: '/basvuru'
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantCount(prev => prev + Math.floor(Math.random() * 2));
    }, 30000);
    
    const notificationInterval = setInterval(() => {
      const cities = ['Ankara', 'İzmir', 'Antalya', 'Bursa', 'Eskişehir'];
      const names = ['Mehmet Y.', 'Ayşe D.', 'Can B.', 'Zeynep A.', 'Ali R.'];
      const times = ['az önce', '1 dakika', '3 dakika', '5 dakika'];
      
      setRecentBooking({
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        time: times[Math.floor(Math.random() * times.length)]
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 15000);
    
    return () => {
      clearInterval(interval);
      clearInterval(notificationInterval);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2070"
          alt="Balkan Dağları Manzarası"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      
      {/* Social Proof Notification */}
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: showNotification ? 0 : 400, opacity: showNotification ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="fixed top-24 right-4 bg-white rounded-lg shadow-2xl p-4 z-50 max-w-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 rounded-full p-2">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {recentBooking.city}'dan {recentBooking.name}
            </p>
            <p className="text-xs text-gray-600">{recentBooking.time} önce kayıt oldu</p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-6"
        >
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <Award className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white text-sm font-medium">TripAdvisor 2024 Excellence</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <span className="text-yellow-400 mr-1">★★★★★</span>
            <span className="text-white text-sm">4.9/5 (487 değerlendirme)</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
              {heroData.title}
            </span>
          </motion.h1>
          
          {/* Live Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold text-lg">{participantCount.toLocaleString('tr-TR')}</span>
            <span className="text-gray-200">kişi bu yolculuğu tamamladı</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl mb-6 text-yellow-400 font-bold tracking-widest uppercase"
          >
            {heroData.subtitle}
          </motion.p>
          
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full mb-8 shadow-2xl"
          >
            <Clock className="w-5 h-5 mr-2 animate-pulse" />
            <span className="text-base font-bold">2025 Sezon Kayıtları Açıldı - Sınırlı Kontenjan!</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto font-light leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/basvuru"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-full font-black text-lg hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center justify-center space-x-3 group"
            >
              <span>Yerini Ayırt</span>
              <span className="bg-white/20 px-2 py-1 rounded text-sm">Sadece {spotsLeft} Yer</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/rota"
              className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center space-x-3 hover:scale-105 transform"
            >
              <MapPin className="w-5 h-5" />
              <span>Rotayı İncele</span>
            </Link>
          </motion.div>
          
          {/* User Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <h3 className="text-center text-white text-xl font-semibold mb-8">Katılımcılarımız Ne Diyor?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-white text-sm ml-2">Eylül 2024</span>
                </div>
                <p className="text-white/90 text-sm mb-3 italic">
                  "Hayatımda yaşadığım en büyüleyici deneyimdi. Theth köyündeki konaklamamız ve Valbona vadisindeki yürüyüş inanılmazdı!"
                </p>
                <p className="text-white font-semibold">Zeynep K. - İstanbul</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-white text-sm ml-2">Ağustos 2024</span>
                </div>
                <p className="text-white/90 text-sm mb-3 italic">
                  "3 ülke, 3 farklı kültür, sayısız manzara... Prokletije dağlarının büyüsüne kapıldık. Kesinlikle tekrarlanmalı!"
                </p>
                <p className="text-white font-semibold">Mehmet A. - Ankara</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-white text-sm ml-2">Temmuz 2024</span>
                </div>
                <p className="text-white/90 text-sm mb-3 italic">
                  "Yerel halkın misafirperverliği, doğanın ihşamı, zorlu ama ödüllendirici patikalar... Her şey mükemmeldi!"
                </p>
                <p className="text-white font-semibold">Ayşe D. - İzmir</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-white"
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}