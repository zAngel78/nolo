import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { TrendingUp, Users, Target, Award, Clock, Calendar, Hash, MessageCircle, MapPin, Link as LinkIcon, CheckCircle, Sparkles } from 'lucide-react'
import SocialMediaNotice from './SocialMediaNotice'
import TikTokRecommendation from './TikTokRecommendation'

const VisualInsights = ({ categoryId }) => {
  const [showNotice, setShowNotice] = useState(false)
  const [showTikTokModal, setShowTikTokModal] = useState(false)

  useEffect(() => {
    if (categoryId === '03') {
      setShowNotice(true)
    }
  }, [categoryId])
  // Datos reales de social_media_analysis.tex - Table 3.1
  const platformPerformance = [
    { platform: 'Instagram', current: 1.5, benchmark: 2.99, gap: -1.49, impact: 'High' },
    { platform: 'TikTok', current: 0, benchmark: 4.80, gap: -4.80, impact: 'Critical' },
    { platform: 'LinkedIn', current: 1.2, benchmark: 2.95, gap: -1.75, impact: 'Medium' },
    { platform: 'Facebook', current: 0.9, benchmark: 2.97, gap: -2.07, impact: 'Medium' },
    { platform: 'Twitter', current: 0.8, benchmark: 2.61, gap: -1.81, impact: 'Low' }
  ]

  // Datos reales - Table 3.2: Instagram Followers
  const instagramComparison = [
    { name: 'NYU', followers: 593000, position: 'Leader' },
    { name: 'Columbia', followers: 457000, position: 'Premium' },
    { name: 'Rutgers', followers: 124000, position: 'Challenger' },
    { name: 'Brandeis', followers: 25000, position: 'Peer' },
    { name: 'Yeshiva', followers: 15000, position: 'Current' }
  ]

  // Datos reales - Table 3.4: Engagement by Tone
  const engagementByTone = [
    { tone: 'Informal', engagement: 3.45, comments: 42, shares: 18 },
    { tone: 'Student Voice', engagement: 4.12, comments: 67, shares: 31 },
    { tone: 'Formal', engagement: 1.23, comments: 8, shares: 3 },
    { tone: 'Hybrid', engagement: 3.89, comments: 54, shares: 24 }
  ]

  // Datos reales - Content Format Performance
  const contentFormats = [
    { format: 'Reels', engagement: 1.99 },
    { format: 'TikTok', engagement: 4.80 },
    { format: 'Static', engagement: 0.80 }
  ]

  // Datos reales del Instagram Analytics - Publicaciones por día
  const postingByDay = [
    { day: 'Sun', posts: 8 },
    { day: 'Mon', posts: 18 },
    { day: 'Tue', posts: 12 },
    { day: 'Wed', posts: 15 },
    { day: 'Thu', posts: 10 },
    { day: 'Fri', posts: 14 },
    { day: 'Sat', posts: 16 }
  ]

  // Datos reales - Mejor hora de publicación
  const postingByHour = [
    { hour: '9:00', engagement: 45 },
    { hour: '12:00', engagement: 68 },
    { hour: '15:00', engagement: 82 },
    { hour: '17:00', engagement: 100 }, // Peak time - Monday 5 PM
    { hour: '18:00', engagement: 75 },
    { hour: '21:00', engagement: 55 }
  ]

  // Datos reales - Análisis de sentimiento
  const sentimentData = [
    { name: 'Positive', value: 11.06, color: '#22c55e' },
    { name: 'Neutral', value: 86.06, color: '#64748b' },
    { name: 'Negative', value: 2.88, color: '#ef4444' }
  ]

  // Hashtags principales (datos reales)
  const topHashtags = [
    { tag: '#FreeThamNow', count: 1 },
    { tag: '#StandWithIsrael', count: 1 },
    { tag: '#FightAntisemitism', count: 1 },
    { tag: '#AmericanValues', count: 1 },
    { tag: '#YeshivaUniversity', count: 1 },
    { tag: '#ShanaTova', count: 1 }
  ]

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'Critical': return '#ef4444'
      case 'High': return '#f97316'
      case 'Medium': return '#eab308'
      case 'Low': return '#22c55e'
      default: return '#64748b'
    }
  }

  if (categoryId === '03') {
    return (
      <>
        <SocialMediaNotice isOpen={showNotice} onClose={() => setShowNotice(false)} />
        <TikTokRecommendation isOpen={showTikTokModal} onClose={() => setShowTikTokModal(false)} />
        <div className="space-y-6">
        {/* Instagram Profile Overview */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
              Instagram Profile Overview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              @yeshiva_university - Official account snapshot
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Image */}
            <div className="w-full md:w-1/2">
              <img 
                src="/instagram.png" 
                alt="Yeshiva University Instagram Profile" 
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700"
              />
            </div>
            {/* Profile Stats */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="text-2xl font-light text-slate-900 dark:text-slate-100">2,269</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Posts</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="text-2xl font-light text-slate-900 dark:text-slate-100">15.4K</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Followers</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="text-2xl font-light text-slate-900 dark:text-slate-100">112</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Following</div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                <div className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2">Story Highlights</div>
                <div className="flex flex-wrap gap-2">
                  {['Goal', 'Events', 'Community', 'Israel', 'Macs', 'Israel Rally', 'Podcast'].map((highlight, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-700 dark:text-slate-300">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                <div className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2">Account Info</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>500 W 185th St, New York, NY 10033</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-3 h-3 text-slate-400" />
                    <span>yu.edu/news</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-slate-400" />
                    <span>Verified Account</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Social Media Profiles */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Twitter Profile */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                Twitter / X Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                @YUNews - Official account
              </p>
            </div>
            <img 
              src="/twitter.png" 
              alt="Yeshiva University Twitter Profile" 
              className="w-full rounded border border-slate-200 dark:border-slate-700"
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <div className="text-lg font-light text-slate-900 dark:text-slate-100">10.7K</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Followers</div>
              </div>
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <div className="text-lg font-light text-slate-900 dark:text-slate-100">854</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Following</div>
              </div>
            </div>
          </div>

          {/* TikTok Profile - Featured with Golden Glow */}
          <div 
            onClick={() => setShowTikTokModal(true)}
            className="relative bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-yellow-900/20 dark:via-slate-900 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4 cursor-pointer group hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
          >
            {/* Golden Sparkle Badge */}
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            
            {/* Recommendation Badge */}
            <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded text-xs font-medium text-white shadow-md">
              Recommended
            </div>

            <div className="mb-3 mt-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                TikTok Profile
                <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded font-medium">
                  Critical Opportunity
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                @yeshiva_university - Unofficial
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="/tiktok.png" 
                alt="Yeshiva University TikTok Profile" 
                className="w-full rounded border-2 border-yellow-300 dark:border-yellow-700 shadow-lg"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex items-end justify-center pb-4">
                <span className="text-white font-medium text-sm">Click to see recommendation</span>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                <div className="text-lg font-light text-slate-900 dark:text-slate-100">18</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Following</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                <div className="text-lg font-light text-slate-900 dark:text-slate-100">862</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Followers</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                <div className="text-lg font-light text-slate-900 dark:text-slate-100">4620</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Likes</div>
              </div>
            </div>

            {/* 4.80% Engagement Badge */}
            <div className="mt-3 p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded text-center">
              <div className="text-white text-lg font-medium">4.80%</div>
              <div className="text-white text-xs">Highest Engagement Rate</div>
            </div>
          </div>

          {/* LinkedIn Profile */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                LinkedIn Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Yeshiva University - Official page
              </p>
            </div>
            <img 
              src="/linkdn.png" 
              alt="Yeshiva University LinkedIn Profile" 
              className="w-full rounded border border-slate-200 dark:border-slate-700"
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <div className="text-lg font-light text-slate-900 dark:text-slate-100">42K</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Followers</div>
              </div>
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <div className="text-lg font-light text-slate-900 dark:text-slate-100">27K</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Alumni</div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Performance Comparison */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
              Platform Performance vs Benchmarks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current engagement rates compared to industry standards
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="platform" 
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                label={{ value: 'Engagement %', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 12 } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="current" fill="#64748b" name="Current" radius={[4, 4, 0, 0]} />
              <Bar dataKey="benchmark" fill="#0ea5e9" name="Benchmark" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Instagram Followers Comparison */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
              Instagram Followers - Competitive Landscape
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Follower count comparison across peer institutions
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={instagramComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number"
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <YAxis 
                type="category"
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => `${(value / 1000).toFixed(1)}K followers`}
              />
              <Bar dataKey="followers" radius={[0, 4, 4, 0]}>
                {instagramComparison.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.name === 'Yeshiva' ? '#0ea5e9' : '#64748b'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement by Tone */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
              Engagement Rate by Content Tone
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Informal tone generates 2.8x higher engagement than formal
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementByTone}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="tone" 
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                label={{ value: 'Engagement %', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 12 } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="engagement" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Current Followers</span>
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100">15K</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instagram</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Engagement Gap</span>
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100">-1.49%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">vs Benchmark</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">TikTok Potential</span>
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100">4.80%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Benchmark Rate</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Best Format</span>
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100">4.12%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Student Voice</div>
          </div>
        </div>

        {/* Posting Schedule Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Posts by Day */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Posting Frequency by Day
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last 100 posts distribution
              </p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={postingByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value} posts`, 'Posts']}
                />
                <Bar dataKey="posts" radius={[4, 4, 0, 0]}>
                  {postingByDay.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === 'Mon' ? '#0ea5e9' : '#64748b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Best Posting Time */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Optimal Posting Time
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peak engagement: Monday 17:00 (5 PM)
              </p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={postingByHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  label={{ value: 'Engagement', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 12 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  dot={{ fill: '#0ea5e9', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Analysis & Top Hashtags */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sentiment Analysis */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Sentiment Analysis
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Content tone distribution
              </p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Hashtags */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Hash className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Top Hashtags
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Most used hashtags in recent posts
              </p>
            </div>
            <div className="space-y-3">
              {topHashtags.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <span className="text-sm text-slate-900 dark:text-slate-100 font-mono">{item.tag}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Featured</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Insights Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Best Time</span>
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100">Mon 5PM</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Peak Engagement</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Sentiment</span>
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100">86%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Neutral Tone</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Most Active</span>
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100">Monday</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">18 posts/week</div>
          </div>
        </div>
        </div>
      </>
    )
  }

  return null
}

export default VisualInsights
