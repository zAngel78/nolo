import { useState, useEffect } from 'react';
import { Heart, MessageCircle, ExternalLink, Calendar, TrendingUp } from 'lucide-react';

// Backend API URL - auto-detect local vs production
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://nomassi-1.onrender.com';

const InstagramFeed = ({ university = 'yeshiva_university' }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchInstagramData();
  }, [university]);

  const normalizePost = (post) => {
    // Normalize data structure to handle both YU format and NYU format
    const likes = post.likes || post.likesCount || 0;
    const comments = post.comments || post.commentsCount || 0;
    
    // Calculate engagement rate if not provided
    let engagementRate = post.engagement_rate || post.engagementRate;
    if (!engagementRate) {
      // Assume average follower count for calculation (you can adjust this)
      const estimatedReach = 15000; // Average reach
      engagementRate = ((likes + comments) / estimatedReach * 100).toFixed(2);
    }
    
    // Use local_image_path if available (from scraping), otherwise use image_url
    const imageUrl = post.local_image_path 
      ? `${API_BASE}${post.local_image_path}` 
      : post.image_url || post.displayUrl;
    
    return {
      ...post,
      likes,
      comments,
      engagement_rate: engagementRate,
      image_url: imageUrl
    };
  };

  const fetchInstagramData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/instagram/${university}`);
      
      if (!response.ok) {
        throw new Error('Data not found. Please run the scraper first.');
      }
      
      const rawData = await response.json();
      const normalizedData = rawData.map(normalizePost);
      setPosts(normalizedData);
      calculateStats(normalizedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (postsData) => {
    const totalLikes = postsData.reduce((sum, p) => sum + p.likes, 0);
    const totalComments = postsData.reduce((sum, p) => sum + p.comments, 0);
    const avgEngagement = postsData.reduce((sum, p) => sum + parseFloat(p.engagement_rate), 0) / postsData.length;
    
    setStats({
      totalPosts: postsData.length,
      totalLikes,
      totalComments,
      avgEngagement: avgEngagement.toFixed(2),
      totalEngagement: totalLikes + totalComments,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-semibold mb-2">⚠️ {error}</p>
        <p className="text-red-600 text-sm">
          Run <code className="bg-red-100 px-2 py-1 rounded">npm run scrape:yu</code> in the backend folder first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4 shadow-lg">
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <div className="text-purple-100 text-sm">Total Posts</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-4 shadow-lg">
            <div className="text-2xl font-bold">{formatNumber(stats.totalLikes)}</div>
            <div className="text-pink-100 text-sm">Total Likes</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow-lg">
            <div className="text-2xl font-bold">{formatNumber(stats.totalComments)}</div>
            <div className="text-blue-100 text-sm">Total Comments</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4 shadow-lg">
            <div className="text-2xl font-bold">{formatNumber(stats.totalEngagement)}</div>
            <div className="text-green-100 text-sm">Total Engagement</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4 shadow-lg">
            <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
            <div className="text-orange-100 text-sm">Avg Engagement</div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-slate-700">
              {post.image_url ? (
                <img
                  src={post.image_url.startsWith('http') ? post.image_url : `${API_BASE}${post.image_url}`}
                  alt={post.caption?.substring(0, 50) || 'Instagram post'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16">Image not available</text></svg>';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              
              {/* Post Type Badge */}
              {post.post_type === 'video' && (
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                  VIDEO
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Caption */}
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {post.caption || 'No caption'}
              </p>

              {/* Hashtags */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.hashtags.length > 3 && (
                    <span className="text-xs text-gray-500">+{post.hashtags.length - 3}</span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{formatNumber(post.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span>{formatNumber(post.comments)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">{post.engagement_rate}%</span>
                </div>
              </div>

              {/* Date & Link */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View on IG
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
