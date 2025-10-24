import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, ExternalLink, Calendar, TrendingUp, Eye } from 'lucide-react';

// Backend API URL - auto-detect local vs production
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://nomassi-1.onrender.com';

const TwitterFeed = ({ username = 'yunews' }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchTwitterData();
  }, [username]);

  const normalizeTweet = (tweet) => {
    // Normalize data structure
    const likes = tweet.likes || tweet.likesCount || 0;
    const retweets = tweet.retweets || tweet.retweetsCount || 0;
    const replies = tweet.replies || tweet.repliesCount || 0;
    const views = tweet.views || tweet.viewsCount || 0;
    
    // Calculate engagement rate if not provided
    let engagementRate = tweet.engagement_rate || tweet.engagementRate;
    if (!engagementRate && views > 0) {
      engagementRate = ((likes + retweets + replies) / views * 100).toFixed(2);
    } else if (!engagementRate) {
      engagementRate = '0.00';
    }
    
    return {
      ...tweet,
      likes,
      retweets,
      replies,
      views,
      engagement_rate: engagementRate,
      image_url: tweet.image_url || tweet.imageUrl || null
    };
  };

  const fetchTwitterData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/twitter/${username}`);
      
      if (!response.ok) {
        throw new Error('Data not found. Please run the scraper first.');
      }
      
      const rawData = await response.json();
      const normalizedData = rawData.map(normalizeTweet);
      setTweets(normalizedData);
      calculateStats(normalizedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalLikes = data.reduce((sum, tweet) => sum + (tweet.likes || 0), 0);
    const totalRetweets = data.reduce((sum, tweet) => sum + (tweet.retweets || 0), 0);
    const totalReplies = data.reduce((sum, tweet) => sum + (tweet.replies || 0), 0);
    const totalViews = data.reduce((sum, tweet) => sum + (tweet.views || 0), 0);
    const avgEngagement = data.reduce((sum, tweet) => sum + parseFloat(tweet.engagement_rate || 0), 0) / data.length;

    setStats({
      totalTweets: data.length,
      totalLikes,
      totalRetweets,
      totalReplies,
      totalViews,
      avgEngagement: avgEngagement.toFixed(2),
      totalEngagement: totalLikes + totalRetweets + totalReplies
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading tweets...</p>
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
          Run: <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded">npm run scrape:twitter</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Twitter/X Posts</h2>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalTweets}</div>
            <div className="text-blue-100 text-sm">Total Tweets</div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalLikes.toLocaleString()}</div>
            <div className="text-red-100 text-sm">Total Likes</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalRetweets.toLocaleString()}</div>
            <div className="text-green-100 text-sm">Total Retweets</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <div className="text-purple-100 text-sm">Total Views</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.avgEngagement}%</div>
            <div className="text-orange-100 text-sm">Avg Engagement</div>
          </div>
        </div>
      )}

      {/* Tweets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            {tweet.image_url && (
              <div className="relative aspect-square bg-gray-100 dark:bg-slate-700">
                <img
                  src={tweet.image_url.startsWith('http') ? tweet.image_url : `${API_BASE}${tweet.image_url}`}
                  alt={tweet.text?.substring(0, 50) || 'Tweet image'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16">Image not available</text></svg>';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {/* Text */}
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3 line-clamp-4">
                {tweet.text || 'No text'}
              </p>

              {/* Hashtags */}
              {tweet.hashtags && tweet.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tweet.hashtags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{tweet.likes?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Repeat2 className="w-4 h-4" />
                  <span>{tweet.retweets?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{tweet.replies?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{tweet.views?.toLocaleString() || 0}</span>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Engagement Rate</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{tweet.engagement_rate}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(parseFloat(tweet.engagement_rate) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(tweet.date)}</span>
                </div>
                {tweet.url && (
                  <a
                    href={tweet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Tweet
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

export default TwitterFeed;
