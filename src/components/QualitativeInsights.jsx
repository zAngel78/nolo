import { MessageCircle, TrendingUp, Users, Sparkles } from 'lucide-react'

const QualitativeInsights = () => {
  const toneAnalysis = [
    { tone: 'Informal', engagement: 2.8, posts: 35, color: 'bg-green-500' },
    { tone: 'Formal', engagement: 1.0, posts: 65, color: 'bg-blue-500' }
  ]

  const contentCategories = [
    { category: 'Academic Excellence', percentage: 30, engagement: 2.1, color: 'from-blue-500 to-blue-600' },
    { category: 'Student Life', percentage: 25, engagement: 3.2, color: 'from-purple-500 to-purple-600' },
    { category: 'Events & News', percentage: 20, engagement: 2.5, color: 'from-cyan-500 to-cyan-600' },
    { category: 'Athletics', percentage: 15, engagement: 2.8, color: 'from-green-500 to-green-600' },
    { category: 'Alumni Success', percentage: 10, engagement: 1.9, color: 'from-orange-500 to-orange-600' }
  ]

  const formatTypes = [
    { type: 'Video/Reels', engagement: 4.2, reach: '4x', icon: '🎥' },
    { type: 'Carousel', engagement: 2.3, reach: '2.1x', icon: '📸' },
    { type: 'Static Image', engagement: 1.4, reach: '1x', icon: '🖼️' },
    { type: 'Text Only', engagement: 0.8, reach: '0.6x', icon: '📝' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            Content Strategy & Brand Voice
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Qualitative Analysis of Content Performance
          </p>
        </div>
      </div>

      {/* Tone Analysis - Key Finding */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Critical Finding: Informal Tone = 2.8x Higher Engagement
            </h4>
            <p className="text-sm text-green-800 dark:text-green-200 mb-4">
              Content with an informal, student-voice tone generates 2.8x more engagement than formal institutional messaging. This is the single most impactful factor in content performance.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {toneAnalysis.map((tone, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {tone.tone} Tone
                    </span>
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                      {tone.posts}% of posts
                    </span>
                  </div>
                  <div className="text-3xl font-light text-slate-900 dark:text-slate-100 mb-1">
                    {tone.engagement}x
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    engagement multiplier
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${tone.color} transition-all duration-1000`}
                      style={{ width: `${(tone.engagement / 2.8) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Categories */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Content Category Distribution & Performance
        </h4>
        
        {contentCategories.map((cat, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {cat.category}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-slate-600 dark:text-slate-400">
                  {cat.percentage}% of content
                </span>
                <span className={`font-semibold ${cat.engagement > 2.5 ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {cat.engagement}% engagement
                </span>
              </div>
            </div>
            
            <div className="relative h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-1000 flex items-center px-3`}
                style={{ width: `${cat.percentage * 3}%` }}
              >
                {cat.percentage > 15 && (
                  <span className="text-white text-xs font-medium">
                    {cat.percentage}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Format Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {formatTypes.map((format, idx) => (
          <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <div className="text-3xl mb-2">{format.icon}</div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
              {format.type}
            </div>
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1">
              {format.engagement}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              engagement rate
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                {format.reach} reach
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
          <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
            Student Life Content Gap
          </h4>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Currently 25% of content, but shows highest engagement (3.2%). Peer institutions average 35%. <span className="font-semibold">Recommendation: Increase to 35%</span>
          </p>
        </div>
        
        <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
          <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mb-2" />
          <h4 className="text-sm font-semibold text-cyan-900 dark:text-cyan-100 mb-2">
            Video-First Strategy
          </h4>
          <p className="text-sm text-cyan-700 dark:text-cyan-300">
            Video content generates 4x reach compared to static posts. <span className="font-semibold">Recommendation: Shift to 60% video content</span> (currently ~30%)
          </p>
        </div>
      </div>

      {/* Strategic Recommendation */}
      <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Strategic Content Formula
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 bg-white dark:bg-slate-900 rounded">
            <div className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Tone</div>
            <div className="text-amber-700 dark:text-amber-300">70% Informal, 30% Formal</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded">
            <div className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Format</div>
            <div className="text-amber-700 dark:text-amber-300">60% Video, 40% Static</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded">
            <div className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Content Mix</div>
            <div className="text-amber-700 dark:text-amber-300">35% Student Life Focus</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QualitativeInsights
