import { useState, useEffect } from 'react';
import { DollarSign, Eye, TrendingUp, ExternalLink, Calendar, Target } from 'lucide-react';

// Backend API URL - auto-detect local vs production
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://nomassi-1.onrender.com';

const MetaAdsFeed = ({ university = 'yeshiva_university' }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [showDynamicTooltip, setShowDynamicTooltip] = useState({});

  // Helper to detect if ad contains dynamic placeholders
  const isDynamicAd = (ad) => {
    const dynamicPatterns = /\{\{product\.|\{\{.*?\}\}/gi;
    return dynamicPatterns.test(ad.title) || dynamicPatterns.test(ad.body);
  };

  useEffect(() => {
    fetchMetaAdsData();
  }, [university]);

  const fetchMetaAdsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/meta-ads/${university}`);
      
      if (!response.ok) {
        throw new Error('Data not found. Please run the scraper first.');
      }
      
      const data = await response.json();
      setAds(data);
      calculateStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const activeAds = data.filter(ad => ad.is_active).length;
    const totalSpendMin = data.length * 200; // Minimum spend estimate
    const totalSpendMax = data.length * 299; // Maximum spend estimate

    setStats({
      totalAds: data.length,
      activeAds,
      avgSpend: `$${totalSpendMin.toLocaleString()} - $${totalSpendMax.toLocaleString()}`,
      platforms: [...new Set(data.flatMap(ad => ad.platforms))].join(', ')
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading ads...</p>
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
          Run: <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded">npm run scrape:meta-ads</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Meta Ads Library</h2>
          <a
            href="https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=Yeshiva%20University&search_type=keyword_unordered&media_type=all"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View in Meta Ads Library
          </a>
        </div>
        <p className="text-slate-600 dark:text-slate-400">Active advertising campaigns on Facebook & Instagram</p>
        <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Note:</strong> Detailed metrics (spend, reach, impressions) are restricted by Meta for commercial ads.
            Click the button above to view full campaign details on Meta's official platform.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.totalAds}</div>
            <div className="text-green-100 text-sm">Total Ads</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
            <div className="text-3xl font-bold">{stats.activeAds}</div>
            <div className="text-blue-100 text-sm">Active Ads</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-4 text-white">
            <div className="text-xl font-bold">{stats.avgSpend}</div>
            <div className="text-purple-100 text-sm">Total Spend (Est.)</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-4 text-white">
            <div className="text-sm font-bold">{stats.platforms}</div>
            <div className="text-orange-100 text-sm">Platforms</div>
          </div>
        </div>
      )}

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => {
          const hasDynamicContent = isDynamicAd(ad);

          return (
          <div
            key={ad.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
          >
            {/* Dynamic Ad Badge - Positioned at top */}
            {hasDynamicContent && (
              <div className="absolute top-2 left-2 z-10">
                <div
                  className="relative group cursor-help"
                  onMouseEnter={() => setShowDynamicTooltip({...showDynamicTooltip, [ad.id]: true})}
                  onMouseLeave={() => setShowDynamicTooltip({...showDynamicTooltip, [ad.id]: false})}
                >
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                    <span>⚡</span>
                    <span>Dynamic Ad</span>
                  </div>

                  {/* Tooltip */}
                  {showDynamicTooltip[ad.id] && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 text-white p-3 rounded-lg shadow-xl z-20 animate-fade-in">
                      <div className="text-xs leading-relaxed">
                        <p className="font-semibold mb-2 text-purple-300">🎯 What are Dynamic Ads?</p>
                        <p className="mb-2">
                          These ads use <span className="text-purple-300 font-mono">{'{{product.name}}'}</span> placeholders that Meta automatically replaces with actual program names.
                        </p>
                        <p className="text-slate-300 italic">
                          This is normal behavior - the template allows YU to promote multiple programs with one ad setup.
                        </p>
                      </div>
                      <div className="absolute -top-2 left-4 w-4 h-4 bg-slate-900 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Image/Video Preview */}
            {ad.image_url && ad.image_url !== '' && (
              <div className="relative aspect-video bg-gray-100 dark:bg-slate-700">
                <img
                  src={typeof ad.image_url === 'string' && ad.image_url.startsWith('http') ? ad.image_url : `${API_BASE}${ad.image_url}`}
                  alt={ad.title || 'Ad preview'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16">Ad Preview</text></svg>';
                  }}
                />
                {ad.is_active && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    ACTIVE
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              {ad.title && (
                <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-sm mb-2">
                  {ad.title}
                </h3>
              )}

              {/* Body Text */}
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3 line-clamp-3">
                {ad.body || 'No description available'}
              </p>

              {/* Ad Metrics - Only show if we have data */}
              {(ad.spend !== 'N/A' || ad.reach_estimate !== 'N/A' || ad.impressions !== 'N/A') ? (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {ad.spend !== 'N/A' && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                      <div className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400">
                        <DollarSign className="w-3 h-3" />
                        <span className="font-semibold">Spend</span>
                      </div>
                      <div className="text-sm font-bold text-green-800 dark:text-green-300">{ad.spend}</div>
                    </div>
                  )}
                  {ad.reach_estimate !== 'N/A' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                      <div className="flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400">
                        <Target className="w-3 h-3" />
                        <span className="font-semibold">Reach</span>
                      </div>
                      <div className="text-sm font-bold text-blue-800 dark:text-blue-300">{ad.reach_estimate}</div>
                    </div>
                  )}
                  {ad.impressions !== 'N/A' && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                      <div className="flex items-center gap-1 text-xs text-purple-700 dark:text-purple-400">
                        <Eye className="w-3 h-3" />
                        <span className="font-semibold">Impressions</span>
                      </div>
                      <div className="text-sm font-bold text-purple-800 dark:text-purple-300">{ad.impressions}</div>
                    </div>
                  )}
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="flex items-center gap-1 text-xs text-orange-700 dark:text-orange-400">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-semibold">Platforms</span>
                    </div>
                    <div className="text-xs font-bold text-orange-800 dark:text-orange-300">
                      {ad.platforms.join(', ')}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-3 bg-slate-50 dark:bg-slate-700/30 rounded p-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-semibold">Platforms: </span>
                    <span className="text-slate-800 dark:text-slate-200">{ad.platforms.join(', ')}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 italic">
                    Detailed metrics restricted - view on Meta Ads Library
                  </p>
                </div>
              )}

              {/* Dates */}
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Started: {formatDate(ad.start_date)}</span>
                </div>
                {ad.end_date && (
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Ends: {formatDate(ad.end_date)}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className={`text-xs font-semibold ${ad.is_active ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {ad.is_active ? '● Active' : '○ Inactive'}
                </span>
                {ad.ad_url && (
                  <a
                    href={ad.ad_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View in Ads Library
                  </a>
                )}
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default MetaAdsFeed;
