'use client';

import { useState, useEffect } from 'react';
import {
  Hash,
  Plus,
  Trash2,
  Edit,
  Eye,
  Search,
  Filter,
  TrendingUp,
  Activity,
  Calendar,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';

interface MonitoredHashtag {
  id: string;
  hashtag: string;
  isActive: boolean;
  addedDate: string;
  lastChecked: string;
  postsFound: number;
  commentsPosted: number;
  avgEngagement: number;
  category: 'primary' | 'secondary' | 'location' | 'activity';
  language: 'tr' | 'en' | 'mixed';
  priority: 'high' | 'medium' | 'low';
}

interface HashtagStats {
  totalActive: number;
  totalInactive: number;
  totalPostsFound: number;
  totalCommentsPosted: number;
  lastUpdate: string;
}

interface RecentActivity {
  id: string;
  hashtag: string;
  postUrl: string;
  action: 'found' | 'commented' | 'liked';
  timestamp: string;
  engagement: number;
}

export default function HashtagMonitoring() {
  const [hashtags, setHashtags] = useState<MonitoredHashtag[]>([]);
  const [stats, setStats] = useState<HashtagStats>({
    totalActive: 0,
    totalInactive: 0,
    totalPostsFound: 0,
    totalCommentsPosted: 0,
    lastUpdate: new Date().toLocaleString('tr-TR')
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newHashtag, setNewHashtag] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadHashtagData();
  }, []);

  const loadHashtagData = async () => {
    try {
      // Load monitored hashtags from API
      const hashtagsResponse = await fetch('/api/instagram/hashtags');
      if (hashtagsResponse.ok) {
        const hashtagsData = await hashtagsResponse.json();
        // Map database fields to component interface
        const mappedHashtags = hashtagsData.map((h: any) => ({
          id: h.id.toString(),
          hashtag: h.hashtag,
          isActive: h.is_active,
          addedDate: h.added_date,
          lastChecked: h.last_checked || new Date().toISOString(),
          postsFound: h.posts_found || 0,
          commentsPosted: h.comments_posted || 0,
          avgEngagement: h.avg_engagement || 0,
          category: h.category || 'secondary',
          language: h.language || 'tr',
          priority: h.priority || 'medium'
        }));
        setHashtags(mappedHashtags);
      }

      // Load hashtag statistics
      const statsResponse = await fetch('/api/instagram/hashtag-stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats({
          ...statsData,
          lastUpdate: new Date(statsData.lastUpdate).toLocaleString('tr-TR')
        });
      }

      // Load recent activity
      const activityResponse = await fetch('/api/instagram/hashtag-activity');
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData);
      }
    } catch (error) {
      console.error('Hashtag verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHashtag = async () => {
    if (!newHashtag.trim()) return;

    try {
      const response = await fetch('/api/instagram/hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hashtag: newHashtag.replace('#', ''),
          category: 'secondary',
          priority: 'medium'
        })
      });

      if (response.ok) {
        const newHashtagData = await response.json();
        // Map the response to match component interface
        const mappedHashtag = {
          id: newHashtagData.id.toString(),
          hashtag: newHashtagData.hashtag,
          isActive: newHashtagData.is_active,
          addedDate: newHashtagData.added_date,
          lastChecked: newHashtagData.last_checked || new Date().toISOString(),
          postsFound: newHashtagData.posts_found || 0,
          commentsPosted: newHashtagData.comments_posted || 0,
          avgEngagement: newHashtagData.avg_engagement || 0,
          category: newHashtagData.category || 'secondary',
          language: newHashtagData.language || 'tr',
          priority: newHashtagData.priority || 'medium'
        };
        setHashtags(prev => [...prev, mappedHashtag]);
        setNewHashtag('');
        setShowAddForm(false);
        // Reload stats after adding
        loadHashtagData();
      }
    } catch (error) {
      console.error('Hashtag eklenirken hata:', error);
    }
  };

  const handleToggleActive = async (hashtagId: string) => {
    try {
      const hashtag = hashtags.find(h => h.id === hashtagId);
      if (!hashtag) return;

      const response = await fetch(`/api/instagram/hashtags/${hashtagId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !hashtag.isActive })
      });

      if (response.ok) {
        setHashtags(prev => prev.map(h =>
          h.id === hashtagId ? { ...h, isActive: !h.isActive } : h
        ));
      }
    } catch (error) {
      console.error('Hashtag durumu güncellenirken hata:', error);
    }
  };

  const handleDeleteHashtag = async (hashtagId: string) => {
    if (!confirm('Bu hashtag izlemesini silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/instagram/hashtags/${hashtagId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setHashtags(prev => prev.filter(h => h.id !== hashtagId));
      }
    } catch (error) {
      console.error('Hashtag silinirken hata:', error);
    }
  };

  const startMonitoring = async () => {
    try {
      const response = await fetch('/api/instagram/start-monitoring', {
        method: 'POST'
      });

      if (response.ok) {
        alert('Hashtag izleme başlatıldı!');
        loadHashtagData();
      }
    } catch (error) {
      console.error('İzleme başlatılırken hata:', error);
    }
  };

  const filteredHashtags = hashtags.filter(hashtag => {
    const matchesFilter = filter === 'all' ||
      (filter === 'active' && hashtag.isActive) ||
      (filter === 'inactive' && !hashtag.isActive);

    const matchesCategory = categoryFilter === 'all' || hashtag.category === categoryFilter;

    const matchesSearch = hashtag.hashtag.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const categoryColors = {
    primary: 'bg-red-100 text-red-800 border-red-300',
    secondary: 'bg-blue-100 text-blue-800 border-blue-300',
    location: 'bg-green-100 text-green-800 border-green-300',
    activity: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-gray-500'
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hashtag İzleme</h1>
            <p className="text-gray-600 mt-2">Türkçe hashtagleri izleyin ve otomatik etkileşim sağlayın</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={startMonitoring}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Activity className="w-4 h-4 mr-2" />
              İzlemeyi Başlat
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Hashtag Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Aktif Hashtagler</p>
              <p className="text-lg font-bold text-gray-900">{stats.totalActive}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Bulunan Postlar</p>
              <p className="text-lg font-bold text-gray-900">{stats.totalPostsFound}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Yapılan Yorumlar</p>
              <p className="text-lg font-bold text-gray-900">{stats.totalCommentsPosted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Son Güncelleme</p>
              <p className="text-sm font-bold text-gray-900">{stats.lastUpdate.split(' ')[1]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
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
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">Tümü</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="primary">Birincil</option>
              <option value="secondary">İkincil</option>
              <option value="location">Konum</option>
              <option value="activity">Aktivite</option>
            </select>
          </div>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Hashtag ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Add Hashtag Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Yeni Hashtag Ekle</h3>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              placeholder="dağcılık (# işareti olmadan)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={handleAddHashtag}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Ekle
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Hashtags List */}
      <div className="space-y-4 mb-8">
        {filteredHashtags.length > 0 ? filteredHashtags.map((hashtag) => (
          <div key={hashtag.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${priorityColors[hashtag.priority]}`}></div>
                  <Hash className="w-5 h-5 text-gray-400" />
                  <span className="text-lg font-medium text-gray-900">#{hashtag.hashtag}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${categoryColors[hashtag.category]}`}>
                    {hashtag.category === 'primary' && 'Birincil'}
                    {hashtag.category === 'secondary' && 'İkincil'}
                    {hashtag.category === 'location' && 'Konum'}
                    {hashtag.category === 'activity' && 'Aktivite'}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    hashtag.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {hashtag.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleActive(hashtag.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    hashtag.isActive
                      ? 'text-green-600 hover:bg-green-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={hashtag.isActive ? 'Pasif yap' : 'Aktif yap'}
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteHashtag(hashtag.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Bulunan Postlar</p>
                <p className="font-semibold text-gray-900">{hashtag.postsFound}</p>
              </div>
              <div>
                <p className="text-gray-600">Yapılan Yorumlar</p>
                <p className="font-semibold text-gray-900">{hashtag.commentsPosted}</p>
              </div>
              <div>
                <p className="text-gray-600">Ortalama Etkileşim</p>
                <p className="font-semibold text-gray-900">{hashtag.avgEngagement}%</p>
              </div>
              <div>
                <p className="text-gray-600">Son Kontrol</p>
                <p className="font-semibold text-gray-900">
                  {new Date(hashtag.lastChecked).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Hash className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Hashtag bulunamadı</h3>
            <p className="text-gray-600 mb-4">
              Filtre kriterlerinize uygun hashtag bulunamadı.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              İlk Hashtag'inizi Ekleyin
            </button>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
        <div className="space-y-3">
          {recentActivity.length > 0 ? recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${
                  activity.action === 'found' ? 'bg-blue-100' :
                  activity.action === 'commented' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {activity.action === 'found' && <Search className="w-4 h-4 text-blue-600" />}
                  {activity.action === 'commented' && <MessageCircle className="w-4 h-4 text-green-600" />}
                  {activity.action === 'liked' && <TrendingUp className="w-4 h-4 text-red-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    #{activity.hashtag} için post {
                      activity.action === 'found' ? 'bulundu' :
                      activity.action === 'commented' ? 'yorumlandı' : 'beğenildi'
                    }
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{activity.engagement}% etkileşim</p>
                <a
                  href={activity.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pink-600 hover:text-pink-700"
                >
                  Postu Gör
                </a>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">Henüz aktivite yok</p>
          )}
        </div>
      </div>
    </div>
  );
}