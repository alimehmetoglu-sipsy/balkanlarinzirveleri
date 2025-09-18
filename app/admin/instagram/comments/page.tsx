'use client';

import { useState, useEffect } from 'react';
import {
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Hash,
  ExternalLink,
  Filter,
  Calendar,
  User,
  Heart,
  Eye
} from 'lucide-react';

interface Comment {
  id: string;
  postUrl: string;
  postImage: string;
  originalPost: {
    author: string;
    caption: string;
    hashtags: string[];
    likes: number;
    comments: number;
  };
  suggestedComment: string;
  hashtag: string;
  status: 'pending' | 'approved' | 'rejected' | 'posted';
  createdAt: string;
  scheduledFor?: string;
  rejectionReason?: string;
  template: string;
  confidence: number;
}

export default function CommentsManagement() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'posted'>('pending');
  const [selectedHashtag, setSelectedHashtag] = useState<string>('all');
  const [hashtags, setHashtags] = useState<string[]>([]);

  useEffect(() => {
    loadComments();
    loadHashtags();
  }, []);

  const loadComments = async () => {
    try {
      const response = await fetch('/api/instagram/comments');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHashtags = async () => {
    try {
      const response = await fetch('/api/instagram/hashtags');
      if (response.ok) {
        const data = await response.json();
        setHashtags(data.map((h: any) => h.tag));
      }
    } catch (error) {
      console.error('Hashtagler yüklenirken hata:', error);
    }
  };

  const handleApprove = async (commentId: string) => {
    try {
      const response = await fetch(`/api/instagram/comments/${commentId}/approve`, {
        method: 'POST',
      });

      if (response.ok) {
        setComments(comments.map(comment =>
          comment.id === commentId
            ? { ...comment, status: 'approved' as const }
            : comment
        ));
      }
    } catch (error) {
      console.error('Yorum onaylanırken hata:', error);
    }
  };

  const handleReject = async (commentId: string, reason: string) => {
    try {
      const response = await fetch(`/api/instagram/comments/${commentId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });

      if (response.ok) {
        setComments(comments.map(comment =>
          comment.id === commentId
            ? { ...comment, status: 'rejected' as const, rejectionReason: reason }
            : comment
        ));
      }
    } catch (error) {
      console.error('Yorum reddedilirken hata:', error);
    }
  };

  const handleBulkApprove = async () => {
    const pendingComments = comments.filter(c => c.status === 'pending');
    if (!confirm(`${pendingComments.length} yorumun tümünü onaylamak istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch('/api/instagram/comments/bulk-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentIds: pendingComments.map(c => c.id) })
      });

      if (response.ok) {
        setComments(comments.map(comment =>
          comment.status === 'pending'
            ? { ...comment, status: 'approved' as const }
            : comment
        ));
      }
    } catch (error) {
      console.error('Toplu onay sırasında hata:', error);
    }
  };

  const filteredComments = comments.filter(comment => {
    const matchesStatus = filter === 'all' || comment.status === filter;
    const matchesHashtag = selectedHashtag === 'all' || comment.hashtag === selectedHashtag;
    return matchesStatus && matchesHashtag;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    approved: 'bg-green-100 text-green-800 border-green-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
    posted: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle,
    posted: MessageCircle
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const pendingCount = comments.filter(c => c.status === 'pending').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Yorum Onayları</h1>
            <p className="text-gray-600 mt-2">
              Hashtag takibinden gelen önerilen yorumları inceleyin ve onaylayın
            </p>
          </div>
          {pendingCount > 0 && (
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleBulkApprove}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Tümünü Onayla ({pendingCount})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Durum:</span>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tümü</option>
              <option value="pending">Bekleyenler</option>
              <option value="approved">Onaylananlar</option>
              <option value="rejected">Reddedilenler</option>
              <option value="posted">Gönderilen</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Hashtag:</span>
            </div>
            <select
              value={selectedHashtag}
              onChange={(e) => setSelectedHashtag(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tümü</option>
              {hashtags.map(tag => (
                <option key={tag} value={tag}>#{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Bekleyen</p>
              <p className="text-lg font-bold text-gray-900">
                {comments.filter(c => c.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Onaylanan</p>
              <p className="text-lg font-bold text-gray-900">
                {comments.filter(c => c.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Gönderilen</p>
              <p className="text-lg font-bold text-gray-900">
                {comments.filter(c => c.status === 'posted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Reddedilen</p>
              <p className="text-lg font-bold text-gray-900">
                {comments.filter(c => c.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {filteredComments.length > 0 ? filteredComments.map((comment) => {
          const StatusIcon = statusIcons[comment.status];

          return (
            <div key={comment.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                {/* Post Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  {comment.postImage ? (
                    <img src={comment.postImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {/* Post Info */}
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">@{comment.originalPost.author}</span>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {comment.originalPost.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {comment.originalPost.comments}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{comment.originalPost.caption}</p>
                        <div className="flex flex-wrap gap-1">
                          {comment.originalPost.hashtags.map((tag, index) => (
                            <span key={index} className="text-xs text-blue-600">#{tag}</span>
                          ))}
                        </div>
                      </div>

                      {/* Suggested Comment */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-700">Önerilen Yorum:</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <Hash className="w-3 h-3 mr-1" />
                            {comment.hashtag}
                          </span>
                          <span className="text-xs text-gray-500">
                            Güven: %{Math.round(comment.confidence * 100)}
                          </span>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-gray-900">"{comment.suggestedComment}"</p>
                          <p className="text-xs text-gray-500 mt-1">Şablon: {comment.template}</p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(comment.createdAt).toLocaleString('tr-TR')}
                        </span>
                        <a
                          href={comment.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Orijinal Post
                        </a>
                      </div>

                      {/* Rejection Reason */}
                      {comment.status === 'rejected' && comment.rejectionReason && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Red nedeni:</strong> {comment.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col items-end space-y-3 ml-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[comment.status]}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {comment.status === 'pending' && 'Bekliyor'}
                        {comment.status === 'approved' && 'Onaylandı'}
                        {comment.status === 'rejected' && 'Reddedildi'}
                        {comment.status === 'posted' && 'Gönderildi'}
                      </div>

                      {comment.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(comment.id)}
                            className="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Onayla
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Red nedeni (opsiyonel):') || 'Uygun değil';
                              handleReject(comment.id, reason);
                            }}
                            className="flex items-center px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reddet
                          </button>
                        </div>
                      )}

                      {comment.scheduledFor && (
                        <div className="text-xs text-gray-500 text-right">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Zamanlanmış
                          </div>
                          <div>{new Date(comment.scheduledFor).toLocaleString('tr-TR')}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Yorum bulunamadı</h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? 'Henüz hiç yorum önerisi yok.'
                : `${filter} durumunda yorum bulunamadı.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}