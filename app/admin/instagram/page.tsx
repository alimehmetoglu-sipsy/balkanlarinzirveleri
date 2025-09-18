'use client';

import { useState, useEffect } from 'react';
import {
  Instagram,
  Calendar,
  MessageCircle,
  Heart,
  Hash,
  Send,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  Wand2
} from 'lucide-react';
import Link from 'next/link';
import BalkanlarLogo from '../../../components/BalkanlarLogo';

interface InstagramStats {
  totalPosts: number;
  scheduledPosts: number;
  pendingComments: number;
  dailyEngagement: number;
  hashtagsMonitored: number;
  lastUpdate: string;
}

interface Post {
  id: string;
  caption: string;
  imageUrl: string;
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'posted';
  hashtags: string[];
  createdAt: string;
}

interface Comment {
  id: string;
  postUrl: string;
  originalPost: string;
  suggestedComment: string;
  hashtag: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function InstagramDashboard() {
  const [stats, setStats] = useState<InstagramStats>({
    totalPosts: 0,
    scheduledPosts: 0,
    pendingComments: 0,
    dailyEngagement: 0,
    hashtagsMonitored: 17,
    lastUpdate: new Date().toLocaleString('tr-TR')
  });

  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Instagram verilerini yükle
      const [postsRes, commentsRes, statsRes] = await Promise.allSettled([
        fetch('/api/instagram/posts'),
        fetch('/api/instagram/comments'),
        fetch('/api/instagram/stats')
      ]);

      if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
        const posts = await postsRes.value.json();
        setRecentPosts(posts.slice(0, 5));
        setStats(prev => ({ ...prev, totalPosts: posts.length }));
      }

      if (commentsRes.status === 'fulfilled' && commentsRes.value.ok) {
        const comments = await commentsRes.value.json();
        const pending = comments.filter((c: Comment) => c.status === 'pending');
        setPendingComments(pending.slice(0, 5));
        setStats(prev => ({ ...prev, pendingComments: pending.length }));
      }

      if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
        const instagramStats = await statsRes.value.json();
        setStats(prev => ({ ...prev, ...instagramStats }));
      }
    } catch (error) {
      console.error('Instagram verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'AI Gönderi Oluştur',
      description: 'Görsel yükle, AI otomatik post oluştursun',
      icon: Wand2,
      href: '/admin/instagram/posts/upload',
      color: 'bg-purple-600'
    },
    {
      title: 'Manuel Gönderi',
      description: 'Instagram gönderisi oluştur ve zamanla',
      icon: Plus,
      href: '/admin/instagram/posts/new',
      color: 'bg-pink-500'
    },
    {
      title: 'Hashtag İzleme',
      description: 'Takip edilen hashtagleri yönet',
      icon: Hash,
      href: '/admin/instagram/hashtags',
      color: 'bg-blue-500'
    },
    {
      title: 'Yorum Onayları',
      description: 'Bekleyen yorumları onayla veya reddet',
      icon: MessageCircle,
      href: '/admin/instagram/comments',
      color: 'bg-green-500'
    },
    {
      title: 'Zamanlama',
      description: 'Gönderi ve yorum zamanlamalarını görüntüle',
      icon: Calendar,
      href: '/admin/instagram/schedule',
      color: 'bg-purple-500'
    },
    {
      title: 'Analitik',
      description: 'Instagram performans istatistikleri',
      icon: Eye,
      href: '/admin/instagram/analytics',
      color: 'bg-orange-500'
    },
    {
      title: 'Ayarlar',
      description: 'Otomasyon ayarlarını düzenle',
      icon: Settings,
      href: '/admin/instagram/settings',
      color: 'bg-gray-500'
    }
  ];

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    posted: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instagram Yönetimi</h1>
              <p className="text-gray-600">@thephrygianway hesabı için otomasyon kontrol paneli</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <BalkanlarLogo width={160} height={80} />
          </div>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Toplam Gönderi</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
            </div>
            <Send className="w-8 h-8 text-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Zamanlanmış</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scheduledPosts}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Bekleyen Yorum</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingComments}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Günlük Etkileşim</p>
              <p className="text-2xl font-bold text-gray-900">{stats.dailyEngagement}</p>
            </div>
            <Heart className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">İzlenen Hashtag</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hashtagsMonitored}</p>
            </div>
            <Hash className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Son Güncelleme</p>
              <p className="text-sm font-bold text-gray-900">{stats.lastUpdate.split(' ')[1]}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Son Gönderiler ve Bekleyen Yorumlar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Son Gönderiler */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Son Gönderiler</h2>
            <Link href="/admin/instagram/posts" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
              Tümünü Gör
            </Link>
          </div>

          <div className="space-y-3">
            {recentPosts.length > 0 ? recentPosts.map((post) => (
              <div key={post.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover rounded-lg" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {post.caption.substring(0, 50)}...
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[post.status]}`}>
                      {post.status === 'draft' && 'Taslak'}
                      {post.status === 'scheduled' && 'Zamanlanmış'}
                      {post.status === 'posted' && 'Yayınlandı'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">Henüz gönderi yok</p>
            )}
          </div>
        </div>

        {/* Bekleyen Yorumlar */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Bekleyen Yorumlar</h2>
            <Link href="/admin/instagram/comments" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Tümünü Gör
            </Link>
          </div>

          <div className="space-y-3">
            {pendingComments.length > 0 ? pendingComments.map((comment) => (
              <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      #{comment.hashtag}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      "{comment.suggestedComment}"
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[comment.status]}`}>
                        Onay Bekliyor
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-3">
                    <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">Bekleyen yorum yok</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}