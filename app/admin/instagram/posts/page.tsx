'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Clock,
  Send,
  Image as ImageIcon,
  Hash,
  Filter,
  Wand2
} from 'lucide-react';
import Link from 'next/link';
import BalkanlarLogo from '../../../../components/BalkanlarLogo';

interface Post {
  id: string;
  caption: string;
  imageUrl: string;
  imagePath: string;
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'posted';
  hashtags: string[];
  createdAt: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export default function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'scheduled' | 'posted'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/instagram/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Gönderiler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Bu gönderiyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/instagram/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Gönderi silinirken hata:', error);
    }
  };

  const handleStatusChange = async (postId: string, newStatus: Post['status']) => {
    try {
      const response = await fetch(`/api/instagram/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setPosts(posts.map(post =>
          post.id === postId ? { ...post, status: newStatus } : post
        ));
      }
    } catch (error) {
      console.error('Gönderi durumu güncellenirken hata:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.status === filter;
    const matchesSearch = post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800 border-gray-300',
    scheduled: 'bg-blue-100 text-blue-800 border-blue-300',
    posted: 'bg-green-100 text-green-800 border-green-300'
  };

  const statusIcons = {
    draft: Edit,
    scheduled: Clock,
    posted: Send
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instagram Gönderileri</h1>
              <p className="text-gray-600 mt-2">Gönderilerinizi oluşturun, düzenleyin ve zamanlayın</p>
            </div>
            <div className="lg:hidden">
              <BalkanlarLogo width={120} height={60} />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 lg:mt-0">
            <div className="hidden lg:block">
              <BalkanlarLogo width={140} height={70} />
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin/instagram/posts/upload"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                AI Gönderi Oluştur
              </Link>
              <Link
                href="/admin/instagram/posts/new"
                className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Manuel Gönderi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtrele:</span>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">Tümü</option>
              <option value="draft">Taslaklar</option>
              <option value="scheduled">Zamanlanmış</option>
              <option value="posted">Yayınlanmış</option>
            </select>
          </div>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Gönderi içeriğinde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Edit className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Taslaklar</p>
              <p className="text-lg font-bold text-gray-900">
                {posts.filter(p => p.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Zamanlanmış</p>
              <p className="text-lg font-bold text-gray-900">
                {posts.filter(p => p.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Send className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Yayınlanmış</p>
              <p className="text-lg font-bold text-gray-900">
                {posts.filter(p => p.status === 'posted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 rounded-lg">
              <ImageIcon className="w-5 h-5 text-pink-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Toplam</p>
              <p className="text-lg font-bold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? filteredPosts.map((post) => {
          const StatusIcon = statusIcons[post.status];

          return (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                {/* Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium mb-2 line-clamp-3">
                        {post.caption}
                      </p>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.hashtags.slice(0, 5).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <Hash className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {post.hashtags.length > 5 && (
                          <span className="text-xs text-gray-500">+{post.hashtags.length - 5} more</span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Oluşturulma: {new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
                        {post.scheduledFor && (
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Zamanlanmış: {new Date(post.scheduledFor).toLocaleString('tr-TR')}
                          </span>
                        )}
                        {post.engagement && (
                          <span>
                            ❤️ {post.engagement.likes} 💬 {post.engagement.comments}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[post.status]}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {post.status === 'draft' && 'Taslak'}
                        {post.status === 'scheduled' && 'Zamanlanmış'}
                        {post.status === 'posted' && 'Yayınlandı'}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/instagram/posts/${post.id}`}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Görüntüle"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/instagram/posts/${post.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick Status Change */}
                      {post.status === 'draft' && (
                        <button
                          onClick={() => handleStatusChange(post.id, 'scheduled')}
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Zamanla
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Gönderi bulunamadı</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all'
                ? 'Henüz hiç gönderi oluşturulmamış.'
                : `${filter} durumunda gönderi bulunamadı.`}
            </p>
            <Link
              href="/admin/instagram/posts/new"
              className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              İlk Gönderinizi Oluşturun
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}