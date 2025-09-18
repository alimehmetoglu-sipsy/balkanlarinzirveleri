'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Image,
  FileText,
  Users,
  Clock,
  ArrowRight,
  Edit,
  Eye,
  TrendingUp,
  AlertCircle,
  Instagram
} from 'lucide-react';
import Link from 'next/link';
import BalkanlarLogo from '../../components/BalkanlarLogo';

export default function AdminDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState({
    images: 0,
    pages: 7,
    messages: 0,
    lastUpdate: new Date().toLocaleDateString('tr-TR')
  });

  useEffect(() => {
    const user = sessionStorage.getItem('adminUser');
    if (user) {
      setUsername(user);
    }

    // Galeri istatistiklerini yükle
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats(prev => ({ ...prev, images: data.length }));
        }
      })
      .catch(console.error);
  }, []);

  const quickActions = [
    {
      title: 'Instagram Yönetimi',
      description: 'AI gönderi oluştur, yorumları onayla, zamanla',
      icon: Instagram,
      href: '/admin/instagram',
      color: 'bg-pink-500'
    },
    {
      title: 'Galeri Yönetimi',
      description: 'Fotoğrafları ekle, düzenle veya sil',
      icon: Image,
      href: '/admin/gallery',
      color: 'bg-blue-500'
    },
    {
      title: 'Ana Sayfa İçeriği',
      description: 'Hero ve tanıtım bölümlerini düzenle',
      icon: FileText,
      href: '/admin/content',
      color: 'bg-green-500'
    },
    {
      title: 'Rota Sayfaları',
      description: 'Rota bilgilerini ve tavsiyeleri güncelle',
      icon: Edit,
      href: '/admin/pages/rota',
      color: 'bg-purple-500'
    },
    {
      title: 'Site Önizleme',
      description: 'Değişiklikleri canlı sitede gör',
      icon: Eye,
      href: '/',
      color: 'bg-orange-500',
      external: true
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hoş Geldin, {username || 'Admin'}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Sitenizi buradan kolayca yönetebilirsiniz. Aşağıdaki hızlı erişim butonlarını kullanarak içerikleri güncelleyebilirsiniz.
            </p>
          </div>
          <div className="hidden lg:block">
            <BalkanlarLogo width={180} height={90} />
          </div>
        </div>
      </div>
      
      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Görsel</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.images}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Image className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Sayfa</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pages}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mesajlar</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.messages}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Son Güncelleme</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.lastUpdate}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const Component = action.external ? 'a' : Link;
            const props = action.external 
              ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' } 
              : { href: action.href };
            
            return (
              <Component
                key={index}
                {...props}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">Yönet</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Component>
            );
          })}
        </div>
      </div>

      {/* Yardım Bölümü */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Yardıma mı ihtiyacınız var?</h3>
            <p className="text-gray-700 mb-3">
              Panel kullanımı hakkında sorularınız varsa veya bir sorunla karşılaştıysanız, 
              lütfen bizimle iletişime geçin.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:destek@balkanlarzirveleri.com"
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Users className="w-4 h-4 mr-2" />
                Destek Ekibi
              </a>
              <button
                onClick={() => alert('Kullanım kılavuzu yakında eklenecek!')}
                className="inline-flex items-center px-4 py-2 bg-white border border-yellow-600 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Kullanım Kılavuzu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}