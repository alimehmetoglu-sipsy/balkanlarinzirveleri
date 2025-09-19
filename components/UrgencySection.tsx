'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, Clock, AlertCircle, TrendingUp, Zap, Target, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 37,
    seconds: 52
  });
  
  const [selectedMonth, setSelectedMonth] = useState('');
  
  const availabilityData = [
    { month: 'Mayıs 2025', spots: 3, total: 25, status: 'critical', badge: 'SON YERLER!' },
    { month: 'Haziran 2025', spots: 8, total: 25, status: 'limited', badge: 'HIZLA DOLUYOR' },
    { month: 'Temmuz 2025', spots: 12, total: 25, status: 'available', badge: 'AÇIK' },
    { month: 'Ağustos 2025', spots: 0, total: 25, status: 'full', badge: 'DOLU' },
    { month: 'Eylül 2025', spots: 15, total: 25, status: 'available', badge: 'YENİ AÇILDI' },
  ];
  
  const benefits = [
    { icon: Zap, text: "Erken kayıt %15 indirim", highlight: true },
    { icon: Target, text: "Küçük grup (max 25 kişi)", highlight: false },
    { icon: Users, text: "Deneyimli rehber garantisi", highlight: false },
    { icon: AlertCircle, text: "Ücretsiz iptal hakkı", highlight: true },
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'critical': return 'bg-red-500';
      case 'limited': return 'bg-orange-500';
      case 'available': return 'bg-green-500';
      case 'full': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };
  
  const getStatusBg = (status: string) => {
    switch(status) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'limited': return 'bg-orange-50 border-orange-200';
      case 'available': return 'bg-green-50 border-green-200';
      case 'full': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50 relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Live Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-5 h-5 mr-2 animate-pulse" />
            <span className="font-bold">Sınırlı Kontenjan - Acele Edin!</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            2025 Sezonu Hızla Doluyor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yılda sadece 5 ay süren bu eşsiz deneyim için yerler tükeniyor
          </p>
        </motion.div>
        
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl shadow-2xl p-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-2">🔥 Erken Kayıt İndirimi Bitiyor!</h3>
            <p className="text-lg mb-6 opacity-90">%15 indirim fırsatını kaçırmayın</p>
            
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-sm uppercase tracking-wider mt-1">Gün</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-sm uppercase tracking-wider mt-1">Saat</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm uppercase tracking-wider mt-1">Dakika</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-4xl font-bold animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm uppercase tracking-wider mt-1">Saniye</div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      benefit.highlight ? 'bg-white text-orange-600' : 'bg-white/20 text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
        
        {/* Availability Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            📅 2025 Sezon Takvimi - Kontenjan Durumu
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {availabilityData.map((month, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  getStatusBg(month.status)
                } ${selectedMonth === month.month ? 'ring-4 ring-primary-500' : ''}`}
                onClick={() => setSelectedMonth(month.month)}
              >
                {/* Badge */}
                {month.badge && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    getStatusColor(month.status)
                  }`}>
                    {month.badge}
                  </div>
                )}
                
                <Calendar className="w-8 h-8 text-gray-400 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">{month.month}</h4>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Kontenjan</span>
                    <span>{month.spots}/{month.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${getStatusColor(month.status)}`}
                      style={{ width: `${((month.total - month.spots) / month.total) * 100}%` }}
                    />
                  </div>
                </div>
                
                {/* Status Text */}
                <p className="text-sm font-medium text-gray-700">
                  {month.spots === 0 ? (
                    <span className="text-gray-500">Tamamen dolu</span>
                  ) : month.spots <= 3 ? (
                    <span className="text-red-600 font-bold">Son {month.spots} kişilik yer!</span>
                  ) : month.spots <= 10 ? (
                    <span className="text-orange-600">Sadece {month.spots} yer kaldı</span>
                  ) : (
                    <span className="text-green-600">{month.spots} yer mevcut</span>
                  )}
                </p>
                
                {month.status !== 'full' && (
                  <button className="mt-3 w-full bg-white border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Seç
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Scarcity Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Talep Yüksek!</h3>
              </div>
              <p className="text-gray-700 mb-2">
                Son 24 saatte <span className="font-bold text-orange-600">47 kişi</span> bu sayfayı görüntüledi
              </p>
              <p className="text-gray-700">
                Son 7 günde <span className="font-bold text-green-600">12 rezervasyon</span> yapıldı
              </p>
            </div>
            
            <a
              href="/basvuru"
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-xl group"
            >
              Yerini Hemen Ayırt
              <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}