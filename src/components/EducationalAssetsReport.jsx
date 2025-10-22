import { useState } from 'react'
import { TrendingUp, DollarSign, Users, Target, Youtube, Newspaper, Globe, BarChart3, ArrowUpRight, ArrowDownRight, CheckCircle, AlertTriangle, Zap, Award, Calendar, ExternalLink, Info } from 'lucide-react'

const EducationalAssetsReport = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Key Metrics Data
  const keyMetrics = [
    { 
      label: 'Active Meta Ads', 
      value: '21', 
      change: '+15%', 
      trend: 'up', 
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      description: 'Verified campaigns'
    },
    { 
      label: 'YouTube Subscribers', 
      value: '5,810', 
      change: '+8%', 
      trend: 'up', 
      icon: Youtube,
      color: 'from-red-500 to-pink-500',
      description: 'Main channel'
    },
    { 
      label: 'Website Score', 
      value: '95/100', 
      change: 'Excellent', 
      trend: 'up', 
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      description: 'Homepage rating'
    },
    { 
      label: 'Campaign Progress', 
      value: '$250M+', 
      change: '41% of goal', 
      trend: 'up', 
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      description: 'Rise Up Campaign'
    }
  ]

  // Digital Ads Breakdown
  const adsBreakdown = [
    { type: 'Admissions (UG)', count: 8, budget: '$5K-$15K/mo', platform: 'Instagram + Facebook', status: 'active' },
    { type: 'Graduate Programs', count: 6, budget: '$8K-$20K/mo', platform: 'LinkedIn + Facebook', status: 'active' },
    { type: 'Events & Webinars', count: 4, budget: '$2K-$5K/mo', platform: 'Facebook', status: 'active' },
    { type: 'Donations', count: 3, budget: '$3K-$8K/mo', platform: 'Facebook', status: 'active' }
  ]

  // Performance Benchmarks
  const benchmarks = [
    { metric: 'CTR (Click-Through Rate)', value: '0.73%', benchmark: '0.73%', status: 'excellent' },
    { metric: 'Cost Per Inquiry', value: '$140', benchmark: '$140', status: 'excellent' },
    { metric: 'Conversion Rate', value: '9-10%', benchmark: '9-10%', status: 'excellent' },
    { metric: 'CPM (Cost Per 1000)', value: '$5.31', benchmark: '$5.31', status: 'excellent' }
  ]

  // YouTube Performance
  const youtubeStats = [
    { label: 'Main Channel Subs', value: '5,810', target: '12,000', progress: 48 },
    { label: 'Maccabeats Channel', value: '36,000+', target: '50,000', progress: 72 },
    { label: 'Y-Studs Channel', value: '12,000+', target: '20,000', progress: 60 },
    { label: 'Total Views', value: '2.1M+', target: '5M', progress: 42 }
  ]

  // Website Pages Performance
  const websitePages = [
    { page: 'Homepage', rating: 95, traffic: 'High', bounceRate: '32%', avgTime: '2:15', status: 'excellent' },
    { page: 'Admissions', rating: 93, traffic: 'Very High', bounceRate: '28%', avgTime: '3:45', status: 'excellent' },
    { page: 'Donations', rating: 85, traffic: 'Medium', bounceRate: '45%', avgTime: '1:30', status: 'good' },
    { page: 'Alumni', rating: 91, traffic: 'Medium', bounceRate: '35%', avgTime: '2:50', status: 'excellent' }
  ]


  const getStatusColor = (status) => {
    const colors = {
      excellent: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      good: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      active: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
    }
    return colors[status] || colors.good
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900 dark:bg-slate-800 p-8 text-white border border-slate-700">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-slate-800 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Educational Assets Report</h2>
              <p className="text-slate-300 text-sm">Digital Advertising & Website Performance Analysis</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800/50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Report Date</div>
              <div className="text-lg font-semibold">October 2025</div>
            </div>
            <div className="bg-slate-800/50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Verification</div>
              <div className="text-lg font-semibold">100% Direct</div>
            </div>
            <div className="bg-slate-800/50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Data Points</div>
              <div className="text-lg font-semibold">500+</div>
            </div>
            <div className="bg-slate-800/50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Status</div>
              <div className="text-lg font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <div key={idx} className="group relative overflow-hidden rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300">
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {metric.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{metric.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">{metric.description}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {['overview', 'digital-ads', 'website', 'youtube'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              Executive Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Strengths</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>21 active Meta ads</strong> with 0.73% CTR (industry standard)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Excellent website</strong> (95/100 homepage score)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>$250M+ raised</strong> in Rise Up Campaign</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Multi-channel presence</strong> (YouTube, WSJ, social media)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Opportunities</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span><strong>YouTube growth</strong> potential (5.8K → 12K subscribers)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span><strong>TikTok launch</strong> (0% → 4.80% engagement opportunity)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Video content</strong> expansion (2.3x better performance)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Cost reduction</strong> ($140 → $95 per inquiry)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Benchmarks */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Performance vs Industry Benchmarks</h3>
            <div className="space-y-3">
              {benchmarks.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{item.metric}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Benchmark: {item.benchmark}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{item.value}</div>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'digital-ads' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Meta Ads Campaign Portfolio</h3>
            <div className="space-y-4">
              {adsBreakdown.map((ad, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{ad.type}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{ad.platform}</div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(ad.status)}`}>
                      {ad.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Active Ads</div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ad.count}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Monthly Budget</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{ad.budget}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'website' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Website Pages Performance</h3>
            <div className="space-y-4">
              {websitePages.map((page, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{page.page}</div>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{page.rating}</div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">/100</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Traffic</div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{page.traffic}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Bounce Rate</div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{page.bounceRate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Avg Time</div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{page.avgTime}</div>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-700 dark:bg-slate-500 transition-all duration-1000"
                      style={{ width: `${page.rating}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'youtube' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">YouTube Channel Performance</h3>
            <div className="space-y-4">
              {youtubeStats.map((stat, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{stat.label}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Target: {stat.target}</div>
                  </div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-3">{stat.value}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-700 dark:bg-slate-500 transition-all duration-1000"
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default EducationalAssetsReport
