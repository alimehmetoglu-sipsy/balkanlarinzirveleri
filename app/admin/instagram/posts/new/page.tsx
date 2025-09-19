'use client';

import { useState } from 'react';
import {
  Save,
  Send,
  Calendar,
  Hash,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  Clock,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface PostData {
  caption: string;
  hashtags: string[];
  imageUrl: string;
  imagePath: string;
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'posted';
}

export default function NewPostPage() {
  const [postData, setPostData] = useState<PostData>({
    caption: '',
    hashtags: [],
    imageUrl: '',
    imagePath: '',
    scheduledFor: '',
    status: 'draft'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hashtagInput, setHashtagInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const defaultHashtags = [
    'dağcılık', 'doğayürüyüşü', 'trekking', 'hiking', 'balkans',
    'arnavutluk', 'kosova', 'karadağ', 'doğa', 'macera',
    'keşfet', 'seyahat', 'dağlar', 'outdoor', 'nature',
    'thephrygianway', 'balkanlarinzirveleri'
  ];

  const addHashtag = (tag: string) => {
    const cleanTag = tag.replace('#', '').trim().toLowerCase();
    if (cleanTag && !postData.hashtags.includes(cleanTag)) {
      setPostData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, cleanTag]
      }));
    }
  };

  const removeHashtag = (tag: string) => {
    setPostData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(t => t !== tag)
    }));
  };

  const handleHashtagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addHashtag(hashtagInput);
      setHashtagInput('');
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/instagram/upload-image', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Image upload failed');
    return await response.json();
  };

  const savePost = async (status: 'draft' | 'scheduled') => {
    if (!postData.caption.trim()) {
      alert('Caption gerekli!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/instagram/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...postData,
          status,
          scheduledFor: status === 'scheduled' ? postData.scheduledFor : null
        })
      });

      if (!response.ok) throw new Error('Post save failed');

      setSuccessMessage(
        status === 'draft'
          ? 'Post taslak olarak kaydedildi!'
          : 'Post zamanlandı!'
      );

      // Clear form after success
      setTimeout(() => {
        setPostData({
          caption: '',
          hashtags: [],
          imageUrl: '',
          imagePath: '',
          scheduledFor: '',
          status: 'draft'
        });
        setSuccessMessage('');
      }, 2000);

    } catch (error) {
      console.error('Save failed:', error);
      alert('Kaydetme başarısız oldu!');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSuggestedSchedule = () => {
    const now = new Date();
    const suggested = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    const formatted = suggested.toISOString().slice(0, 16);
    setPostData(prev => ({ ...prev, scheduledFor: formatted }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Type className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manuel Instagram Gönderi</h1>
                <p className="text-gray-600">Özel bir Instagram gönderisi oluşturun</p>
              </div>
            </div>
            <Link
              href="/admin/instagram/posts"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Link>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Caption */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Type className="w-5 h-5" />
                Caption
              </h2>
              <textarea
                value={postData.caption}
                onChange={(e) => setPostData(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Instagram gönderinizin açıklamasını yazın..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={2200}
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>Instagram post açıklaması</span>
                <span>{postData.caption.length}/2200</span>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Görsel
              </h2>

              {postData.imageUrl ? (
                <div className="relative">
                  <img
                    src={postData.imageUrl}
                    alt="Post preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setPostData(prev => ({ ...prev, imageUrl: '', imagePath: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          setIsLoading(true);
                          const { imageUrl, imagePath } = await uploadImage(file);
                          setPostData(prev => ({ ...prev, imageUrl, imagePath }));
                        } catch (error) {
                          alert('Görsel yükleme başarısız!');
                        } finally {
                          setIsLoading(false);
                        }
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Görsel Seç
                  </label>
                  <p className="text-gray-500 mt-2">JPG, PNG, WEBP desteklenir</p>
                </div>
              )}
            </div>

            {/* Hashtags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Hashtag'ler
              </h2>

              <div className="mb-4">
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyPress={handleHashtagKeyPress}
                  placeholder="Hashtag ekleyin (Enter ile ekle)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Selected Hashtags */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Seçilen Hashtag'ler:</h3>
                <div className="flex flex-wrap gap-2">
                  {postData.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => removeHashtag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Hashtags */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Önerilen Hashtag'ler:</h3>
                <div className="flex flex-wrap gap-2">
                  {defaultHashtags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addHashtag(tag)}
                      disabled={postData.hashtags.includes(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        postData.hashtags.includes(tag)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Zamanlama
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yayın Zamanı
                  </label>
                  <input
                    type="datetime-local"
                    value={postData.scheduledFor}
                    onChange={(e) => setPostData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={generateSuggestedSchedule}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  Önerilen Zamanda Yayınla
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">İşlemler</h2>

              <div className="space-y-3">
                <button
                  onClick={() => savePost('draft')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Kaydediliyor...' : 'Taslak Kaydet'}
                </button>

                <button
                  onClick={() => savePost('scheduled')}
                  disabled={isLoading || !postData.scheduledFor}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Zamanlanıyor...' : 'Zamanla'}
                </button>
              </div>
            </div>

            {/* Preview Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Özet</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Caption Uzunluğu:</span>
                  <span className="font-medium">{postData.caption.length}/2200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hashtag Sayısı:</span>
                  <span className="font-medium">{postData.hashtags.length}/30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Görsel:</span>
                  <span className="font-medium">{postData.imageUrl ? 'Eklendi' : 'Yok'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zamanlama:</span>
                  <span className="font-medium">
                    {postData.scheduledFor ? 'Ayarlandı' : 'Yok'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}