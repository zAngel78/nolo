import { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Eye, ExternalLink, Calendar, TrendingUp, Play } from 'lucide-react';

// Backend API URL - auto-detect local vs production
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://nomassi-1.onrender.com';

const YouTubeFeed = ({ channel = 'yeshivauniversity' }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchYouTubeData();
  }, [channel]);

  const normalizeVideo = (video) => {
    // Normalize data structure - handle both YU and NYU formats
    const views = video.views || video.viewCount || video.viewsCount || 0;
    const likes = video.likes || video.likesCount || 0;
    const comments = video.comments || video.commentsCount || 0;
    
    // Calculate engagement rate if not provided
    let engagementRate = video.engagement_rate || video.engagementRate;
    if (!engagementRate && views > 0) {
      engagementRate = ((likes + comments) / views * 100).toFixed(2);
    } else if (!engagementRate) {
      engagementRate = '0.00';
    }
    
    // Use local_image_path if available (from scraping), otherwise use thumbnail_url
    const thumbnailUrl = video.local_image_path 
      ? `${API_BASE}${video.local_image_path}` 
      : video.thumbnail_url || video.thumbnailUrl || null;
    
    return {
      ...video,
      views,
      likes,
      comments,
      engagement_rate: engagementRate,
      thumbnail_url: thumbnailUrl
    };
  };

  const fetchYouTubeData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/youtube/${channel}`);
      
      if (!response.ok) {
        throw new Error('Data not found. Please run the scraper first.');
      }
      
      const rawData = await response.json();
      const normalizedData = rawData.map(normalizeVideo);
      setVideos(normalizedData);
      calculateStats(normalizedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalViews = data.reduce((sum, video) => sum + (video.views || 0), 0);
    const totalLikes = data.reduce((sum, video) => sum + (video.likes || 0), 0);
    const totalComments = data.reduce((sum, video) => sum + (video.comments || 0), 0);
    const avgEngagement = data.reduce((sum, video) => sum + parseFloat(video.engagement_rate || 0), 0) / data.length;

    setStats({
      totalVideos: data.length,
      totalViews,
      totalLikes,
      totalComments,
      avgEngagement: avgEngagement.toFixed(2),
      totalEngagement: totalLikes + totalComments
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatViews = (views) => {
    if (!views && views !== 0) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 className="text-red-800 dark:text-red-400 font-semibold mb-2">Error Loading Data</h3>
        <p className="text-red-600 dark:text-red-300">{error}</p>
        <p className="text-sm text-red-500 dark:text-red-400 mt-2">
          Run: <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded">npm run scrape:youtube</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">YouTube Videos</h2>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalVideos}</div>
            <div className="text-red-100 text-sm">Total Videos</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{formatViews(stats.totalViews)}</div>
            <div className="text-blue-100 text-sm">Total Views</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalLikes.toLocaleString()}</div>
            <div className="text-green-100 text-sm">Total Likes</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.avgEngagement}%</div>
            <div className="text-orange-100 text-sm">Avg Engagement</div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Thumbnail */}
            <a 
              href={video.url || `https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-video bg-gray-100 dark:bg-slate-700 group cursor-pointer"
            >
              <img
                src={video.thumbnail_url && video.thumbnail_url.startsWith('http') ? video.thumbnail_url : video.thumbnail_url ? `${API_BASE}${video.thumbnail_url}` : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16">Thumbnail not available</text></svg>'}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16">Thumbnail not available</text></svg>';
                }}
              />
              
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-16 h-16 text-white" fill="white" />
              </div>
              
              {/* Duration badge */}
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                  {video.duration}
                </div>
              )}
            </a>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-sm mb-2 line-clamp-2">
                {video.title}
              </h3>

              {/* Description */}
              {video.description && (
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-3 line-clamp-2">
                  {video.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{formatViews(video.views)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{video.likes || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{video.comments || 0}</span>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Engagement Rate</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">{video.engagement_rate}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(parseFloat(video.engagement_rate) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(video.date)}</span>
                </div>
                {video.video_url && (
                  <a
                    href={video.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Watch Video
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeFeed;
