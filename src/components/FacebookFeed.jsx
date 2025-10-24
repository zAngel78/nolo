import { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Share2, ExternalLink, Calendar, TrendingUp } from 'lucide-react';

// Backend API URL - auto-detect local vs production
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://nomassi-1.onrender.com';

const FacebookFeed = ({ pagename = 'yeshivauniversity' }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchFacebookData();
  }, [pagename]);

  const normalizePost = (post) => {
    // Normalize data structure to handle different scraping formats
    const likes = post.likes || post.likesCount || 0;
    const comments = post.comments || post.commentsCount || 0;
    const shares = post.shares || post.sharesCount || 0;
    
    // Calculate engagement rate if not provided
    let engagementRate = post.engagement_rate || post.engagementRate;
    if (!engagementRate) {
      const estimatedReach = 15000;
      engagementRate = ((likes + comments + shares) / estimatedReach * 100).toFixed(2);
    }
    
    // Use local_image_path if available (from scraping), otherwise use image_url
    const imageUrl = post.local_image_path 
      ? `${API_BASE}${post.local_image_path}` 
      : post.image_url || post.imageUrl || null;
    
    return {
      ...post,
      likes,
      comments,
      shares,
      engagement_rate: engagementRate,
      image_url: imageUrl
    };
  };

  const fetchFacebookData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/facebook/${pagename}`);
      
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

  const calculateStats = (data) => {
    const totalLikes = data.reduce((sum, post) => sum + (post.likes || 0), 0);
    const totalComments = data.reduce((sum, post) => sum + (post.comments || 0), 0);
    const totalShares = data.reduce((sum, post) => sum + (post.shares || 0), 0);
    const avgEngagement = data.reduce((sum, post) => sum + parseFloat(post.engagement_rate || 0), 0) / data.length;

    setStats({
      totalPosts: data.length,
      totalLikes,
      totalComments,
      totalShares,
      avgEngagement: avgEngagement.toFixed(2),
      totalEngagement: totalLikes + totalComments + totalShares
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading Facebook posts...</p>
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
          Run: <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded">npm run scrape:facebook</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Facebook Posts</h2>
        <p className="text-slate-600 dark:text-slate-400">@YeshivaUniversity</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalPosts}</div>
            <div className="text-blue-100 text-sm">Total Posts</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalLikes.toLocaleString()}</div>
            <div className="text-green-100 text-sm">Total Likes</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalShares.toLocaleString()}</div>
            <div className="text-purple-100 text-sm">Total Shares</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.avgEngagement}%</div>
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
                  src={post.image_url && post.image_url.startsWith('http') ? post.image_url : post.image_url ? `${API_BASE}${post.image_url}` : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16">Image not available</text></svg>'}
                  alt={post.text?.substring(0, 50) || 'Facebook post'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16">Image not available</text></svg>';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <MessageCircle className="w-16 h-16" />
                </div>
              )}
              
              {/* Post Type Badge */}
              {post.post_type === 'Video' && (
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                  VIDEO
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Text */}
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3 line-clamp-3">
                {post.text || 'No caption'}
              </p>

              {/* Engagement Stats */}
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  <span>{post.shares?.toLocaleString() || 0}</span>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Engagement Rate</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{post.engagement_rate}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(parseFloat(post.engagement_rate) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.date)}</span>
                </div>
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Post
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

export default FacebookFeed;
