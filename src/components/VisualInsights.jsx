import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, Users, Target, Award } from 'lucide-react'

const VisualInsights = ({ categoryId }) => {
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
      <div className="space-y-6">
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
      </div>
    )
  }

  return null
}

export default VisualInsights
