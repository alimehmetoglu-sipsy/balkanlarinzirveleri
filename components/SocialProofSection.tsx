'use client';

import { motion } from 'framer-motion';
import { Star, Users, Trophy, Shield, Check, TrendingUp, Heart, Award } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function SocialProofSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [viewCount, setViewCount] = useState(127);
  
  const testimonials = [
    {
      name: "Mehmet Yılmaz",
      age: 52,
      city: "İstanbul",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1",
      text: "Hayatımın en güzel deneyimiydi. 52 yaşında böyle bir maceraya atılmak başta korkutucuydu ama rehberlerimiz o kadar profesyoneldi ki hiç zorlanmadım.",
      badge: "2024 Katılımcısı"
    },
    {
      name: "Ayşe Demir",
      age: 45,
      city: "Ankara",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=2",
      text: "Balkanların el değmemiş doğası, yerel halkın sıcaklığı ve grubumuzun enerjisi muhteşemdi. Kesinlikle tekrar katılacağım.",
      badge: "3 Kez Katıldı"
    },
    {
      name: "Can Özkan",
      age: 38,
      city: "İzmir",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3",
      text: "192 km yürümek kulağa zor geliyor ama her adımı buna değer. Manzaralar, dostluklar ve başarma hissi paha biçilemez.",
      badge: "Grup Lideri"
    }
  ];
  
  const stats = [
    { icon: Users, value: "2,847+", label: "Mutlu Yolcu", trend: "+12%" },
    { icon: Star, value: "4.9/5", label: "Ortalama Puan", trend: "487 değerlendirme" },
    { icon: Trophy, value: "%98", label: "Tavsiye Oranı", trend: "Mükemmel" },
    { icon: Heart, value: "%45", label: "Tekrar Katılım", trend: "Sadakat" }
  ];
  
  const trustFeatures = [
    { icon: Shield, title: "Tam Sigorta", desc: "Profesyonel sağlık ve seyahat sigortası" },
    { icon: Award, title: "Lisanslı Rehberler", desc: "TURSAB sertifikalı deneyimli rehberler" },
    { icon: Check, title: "Garanti İadesi", desc: "60 gün öncesine kadar %100 iade" },
    { icon: TrendingUp, title: "En İyi Fiyat", desc: "Piyasadaki en uygun fiyat garantisi" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    const viewInterval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearInterval(viewInterval);
    };
  }, [testimonials.length]);
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Live Viewing Counter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg"
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="text-sm font-medium">{viewCount} kişi şu anda inceliyor</span>
      </motion.div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Binlerce Mutlu Maceraperest
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Peak Balkans ailesinin bir parçası olan yolcularımızın deneyimleri
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <Icon className="w-10 h-10 text-primary-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
              </div>
            );
          })}
        </motion.div>
        
        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-primary-200">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
            
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : 50
                }}
                transition={{ duration: 0.5 }}
                className={`${activeTestimonial === index ? 'block' : 'hidden'}`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.age} yaş, {testimonial.city}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                        {testimonial.badge}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 italic leading-relaxed pl-24">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
            
            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTestimonial === index 
                      ? 'bg-primary-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Trust Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-primary-50 rounded-2xl p-6 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-bold text-2xl text-primary-600">2,847</span> maceraperest gibi sen de bu eşsiz deneyimin parçası ol!
          </p>
          <a
            href="/basvuru"
            className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-105 shadow-xl"
          >
            Hemen Başvur ve %15 Erken Kayıt İndirimi Kazan
          </a>
        </motion.div>
      </div>
    </section>
  );
}