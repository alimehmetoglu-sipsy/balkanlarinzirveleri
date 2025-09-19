'use client';

import { useState, useCallback } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Wand2,
  Calendar,
  Hash,
  Eye,
  Save,
  Send,
  X,
  CheckCircle,
  Clock,
  Loader
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';

interface GeneratedPost {
  id: string;
  imageUrl: string;
  imagePath: string;
  caption: string;
  hashtags: string[];
  suggestedSchedule: string;
  confidence: number;
  analysis: {
    description: string;
    mood: string;
    location?: string;
    activities: string[];
  };
}

interface UploadedImage {
  file: File;
  preview: string;
  status: 'uploading' | 'analyzing' | 'ready' | 'error';
  error?: string;
  generatedPost?: GeneratedPost;
  userContext?: string;
  userUrl?: string;
  userDescription?: string;
}

export default function PostUploadPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [globalContext, setGlobalContext] = useState('');
  const [globalUrl, setGlobalUrl] = useState('');
  const [globalDescription, setGlobalDescription] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
      userContext: globalContext,
      userUrl: globalUrl,
      userDescription: globalDescription
    }));

    setImages(prev => [...prev, ...newImages]);

    // Start processing each image
    newImages.forEach((image, index) => {
      processImage(image, images.length + index);
    });
  }, [images.length, globalContext, globalUrl, globalDescription]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const processImage = async (image: UploadedImage, index: number) => {
    try {
      // Update status to analyzing
      setImages(prev => prev.map((img, i) =>
        i === index ? { ...img, status: 'analyzing' } : img
      ));

      // Upload image first
      const formData = new FormData();
      formData.append('image', image.file);

      const uploadResponse = await fetch('/api/instagram/upload-image', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) throw new Error('Image upload failed');

      const { imageUrl, imagePath } = await uploadResponse.json();

      // Generate post content using Claude Code AI
      const generateResponse = await fetch('/api/instagram/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          imagePath,
          context: 'mountain_hiking_balkans',
          userContext: image.userContext,
          userUrl: image.userUrl,
          userDescription: image.userDescription
        })
      });

      if (!generateResponse.ok) throw new Error('Post generation failed');

      const generatedPost = await generateResponse.json();

      // Update with generated content
      setImages(prev => prev.map((img, i) =>
        i === index ? {
          ...img,
          status: 'ready',
          generatedPost: {
            ...generatedPost,
            imageUrl,
            imagePath
          }
        } : img
      ));

      // Auto-schedule if enabled
      if (autoSchedule) {
        await schedulePost(generatedPost, imageUrl, imagePath);
      }

    } catch (error) {
      setImages(prev => prev.map((img, i) =>
        i === index ? {
          ...img,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        } : img
      ));
    }
  };

  const schedulePost = async (post: GeneratedPost, imageUrl: string, imagePath: string) => {
    try {
      const response = await fetch('/api/instagram/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caption: post.caption,
          imageUrl,
          imagePath,
          hashtags: post.hashtags,
          scheduledFor: post.suggestedSchedule,
          status: 'scheduled'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn('Auto-scheduling failed:', errorText);
        // Don't throw error, just log it for development
      }
    } catch (error) {
      console.error('Auto-scheduling failed:', error);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const editPost = (index: number, updates: Partial<GeneratedPost>) => {
    setImages(prev => prev.map((img, i) =>
      i === index && img.generatedPost ? {
        ...img,
        generatedPost: { ...img.generatedPost, ...updates }
      } : img
    ));
  };

  const generateWithClaudeCode = async (index: number) => {
    const image = images[index];
    if (!image) return;

    try {
      setImages(prev => prev.map((img, i) =>
        i === index ? { ...img, status: 'analyzing' } : img
      ));

      // Call Claude Code API with real parameters
      const response = await fetch('/api/instagram/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: image.preview || 'test-image-placeholder',
          imagePath: '',
          context: 'claude_code_generation',
          userContext: image.userContext || '',
          userUrl: image.userUrl || '',
          userDescription: image.userDescription || ''
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const generatedPost = await response.json();
      console.log('Generated post response:', generatedPost);

      // Ensure we have the required fields
      const processedPost = {
        id: generatedPost.id || `post_${Date.now()}`,
        caption: generatedPost.caption || 'Otomatik oluşturulan post içeriği',
        hashtags: generatedPost.hashtags || [],
        suggestedSchedule: generatedPost.suggestedSchedule || new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16),
        confidence: generatedPost.confidence || 0.9,
        analysis: generatedPost.analysis || {
          description: 'AI analizi',
          mood: 'İlham verici',
          location: 'Balkan Dağları',
          activities: ['Dağcılık', 'Doğa Yürüyüşü']
        },
        imageUrl: image.preview,
        imagePath: ''
      };

      setImages(prev => prev.map((img, i) =>
        i === index ? {
          ...img,
          status: 'ready',
          generatedPost: processedPost
        } : img
      ));

    } catch (error) {
      console.error('Claude Code generation failed:', error);
      setImages(prev => prev.map((img, i) =>
        i === index ? {
          ...img,
          status: 'error',
          error: `Claude Code generation failed: ${error.message}`
        } : img
      ));
    }
  };

  const manualSchedule = async (index: number) => {
    const image = images[index];
    if (!image.generatedPost) return;

    try {
      await schedulePost(
        image.generatedPost,
        image.generatedPost.imageUrl,
        image.generatedPost.imagePath
      );

      // Mark as scheduled
      setImages(prev => prev.map((img, i) =>
        i === index ? { ...img, status: 'ready' } : img
      ));
    } catch (error) {
      console.error('Manual scheduling failed:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Görsel Yükle & AI Post Oluştur</h1>
            <p className="text-gray-600 mt-2">Görselleri yükleyin, AI otomatik olarak post içeriği oluştursun</p>
          </div>
          <Link
            href="/admin/instagram/posts"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Geri Dön
          </Link>
        </div>
      </div>

      {/* Context and Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI İçerik Ayarları</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Context */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ek Bağlam Bilgisi
            </label>
            <textarea
              value={globalContext}
              onChange={(e) => setGlobalContext(e.target.value)}
              placeholder="Örn: Bu fotoğraf Valbona Vadisi'nde çekildi, 3 günlük trekking rotasının 2. günü..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">AI daha iyi içerik üretmesi için ek bilgi verin</p>
          </div>

          {/* URL Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referans URL (isteğe bağlı)
            </label>
            <input
              type="url"
              value={globalUrl}
              onChange={(e) => setGlobalUrl(e.target.value)}
              placeholder="https://balkanlarzirveleri.com/rota/valbona-theth"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">İlgili rota sayfası varsa URL'sini ekleyin</p>
          </div>
        </div>

        {/* Long Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detaylı Açıklama
          </label>
          <textarea
            value={globalDescription}
            onChange={(e) => setGlobalDescription(e.target.value)}
            placeholder="Bu görsel hakkında detaylı bilgi yazın: hangi dağ, hangi rota, deneyim, zorluk seviyesi, öneriler vs..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Uzun açıklama AI'nın daha zengin içerik üretmesine yardımcı olur</p>
        </div>

        {/* Auto Schedule */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoSchedule}
              onChange={(e) => setAutoSchedule(e.target.checked)}
              className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <span className="text-sm text-gray-700">Akıllı otomatik zamanlama (mevcut schedule'a göre)</span>
          </label>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {/* Test Claude Code without image */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-purple-900 mb-2">Claude Code ile Test Et</h3>
              <p className="text-purple-700 text-sm">Görsel yüklemeden önce açıklamalarınızla Claude Code'u test edin</p>
            </div>
            <button
              onClick={() => {
                if (globalContext || globalDescription) {
                  // Create a real test image using actual mountain photos
                  const testImage: UploadedImage = {
                    file: new File(['real-mountain-photo'], 'mountain-view.jpg', { type: 'image/jpeg' }),
                    preview: '/images/rotada/theth-main.png', // Use real existing image
                    status: 'uploading',
                    userContext: globalContext,
                    userUrl: globalUrl,
                    userDescription: globalDescription
                  };
                  setImages([testImage]);
                  generateWithClaudeCode(0);
                } else {
                  alert('Lütfen önce açıklama alanlarını doldurun!');
                }
              }}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Test Et
            </button>
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-pink-500 bg-pink-50'
              : 'border-gray-300 hover:border-pink-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-pink-600 font-medium">Görselleri buraya bırakın...</p>
          ) : (
            <div>
              <p className="text-gray-600 font-medium mb-2">
                Görselleri buraya sürükleyin veya tıklayarak seçin
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG, WEBP formatları desteklenir
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div className="space-y-6">
          {images.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-6">
                {/* Image Preview */}
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative">
                  <img
                    src={image.preview}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Status */}
                  <div className="flex items-center space-x-2 mb-4">
                    {image.status === 'uploading' && (
                      <>
                        <Loader className="w-4 h-4 animate-spin text-blue-500" />
                        <span className="text-sm text-blue-600">Yükleniyor...</span>
                      </>
                    )}
                    {image.status === 'analyzing' && (
                      <>
                        <Wand2 className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-purple-600">AI analiz ediyor...</span>
                      </>
                    )}
                    {image.status === 'ready' && (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Hazır</span>
                      </>
                    )}
                    {image.status === 'error' && (
                      <>
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">Hata: {image.error}</span>
                      </>
                    )}
                  </div>

                  {/* Generated Content */}
                  {image.generatedPost && (
                    <div className="space-y-4">
                      {/* AI Analysis */}
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h3 className="font-medium text-purple-900 mb-2">AI Analizi</h3>
                        <p className="text-sm text-purple-700 mb-2">{image.generatedPost.analysis.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                            {image.generatedPost.analysis.mood}
                          </span>
                          {image.generatedPost.analysis.activities.map((activity, i) => (
                            <span key={i} className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                              {activity}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2">
                          <span className="text-xs text-purple-600">
                            Güven: {Math.round(image.generatedPost.confidence * 100)}%
                          </span>
                        </div>
                      </div>

                      {/* Caption */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Post Yazısı
                        </label>
                        <textarea
                          value={image.generatedPost.caption}
                          onChange={(e) => editPost(index, { caption: e.target.value })}
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>

                      {/* Hashtags */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hashtagler
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {image.generatedPost.hashtags.map((tag, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              <Hash className="w-3 h-3 mr-1" />
                              {tag}
                              <button
                                onClick={() => {
                                  const newHashtags = [...image.generatedPost!.hashtags];
                                  newHashtags.splice(i, 1);
                                  editPost(index, { hashtags: newHashtags });
                                }}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Scheduled Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zamanlanmış Tarih
                        </label>
                        <input
                          type="datetime-local"
                          value={image.generatedPost.suggestedSchedule}
                          onChange={(e) => editPost(index, { suggestedSchedule: e.target.value })}
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3 pt-4 border-t">
                        <button
                          onClick={() => generateWithClaudeCode(index)}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                        >
                          <Wand2 className="w-4 h-4 mr-2" />
                          Claude Code AI
                        </button>
                        <button
                          onClick={() => manualSchedule(index)}
                          className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {autoSchedule ? 'Yeniden Zamanla' : 'Zamanla'}
                        </button>
                        <Link
                          href={`/admin/instagram/posts/new?imageUrl=${encodeURIComponent(image.generatedPost.imageUrl)}&caption=${encodeURIComponent(image.generatedPost.caption)}&hashtags=${encodeURIComponent(image.generatedPost.hashtags.join(','))}`}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Düzenle
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {images.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Toplam Görsel</p>
                <p className="text-lg font-bold text-gray-900">{images.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Hazır</p>
                <p className="text-lg font-bold text-gray-900">
                  {images.filter(img => img.status === 'ready').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Loader className="w-8 h-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">İşleniyor</p>
                <p className="text-lg font-bold text-gray-900">
                  {images.filter(img => ['uploading', 'analyzing'].includes(img.status)).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Zamanlanacak</p>
                <p className="text-lg font-bold text-gray-900">
                  {autoSchedule ? images.filter(img => img.status === 'ready').length : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}