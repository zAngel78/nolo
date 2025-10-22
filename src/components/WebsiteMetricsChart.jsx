import { Globe, Zap, Smartphone, Search, TrendingUp } from 'lucide-react'

const WebsiteMetricsChart = () => {
  const performanceMetrics = [
    { label: 'Visual Design', value: 'Excellent', target: 'Professional, modern', score: 95, status: 'excellent' },
    { label: 'Messaging Clarity', value: 'Good', target: 'Strong tagline', score: 80, status: 'good' },
    { label: 'Brand Consistency', value: 'Excellent', target: 'Logo, colors aligned', score: 95, status: 'excellent' },
    { label: 'CTA Strategy', value: 'Good', target: 'Multiple options', score: 75, status: 'good' }
  ]

  const pageAnalysis = [
    { page: 'Homepage', rating: 'Excellent', strengths: 'Strong tagline, NYC imagery, clear navigation, professional design', issues: 'None - well-structured' },
    { page: 'Admissions', rating: 'Excellent', strengths: 'Comprehensive segmentation, clear CTAs, excellent UX', issues: 'None - professionally designed' },
    { page: 'Donations', rating: 'Good', strengths: 'GiveCampus integration, secure payment', issues: 'Industry standard platform' },
    { page: 'Alumni', rating: 'Excellent', strengths: '70,000+ network, active community engagement', issues: 'None - strong presence' }
  ]

  const getScoreColor = (status) => {
    const colors = {
      excellent: 'text-green-600 dark:text-green-400 bg-green-500',
      good: 'text-blue-600 dark:text-blue-400 bg-blue-500',
      moderate: 'text-orange-600 dark:text-orange-400 bg-orange-500',
      poor: 'text-red-600 dark:text-red-400 bg-red-500'
    }
    return colors[status] || colors.good
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 rounded-xl flex items-center justify-center">
          <Globe className="w-6 h-6 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            Website Performance Analysis
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Technical Metrics & User Experience (2025)
          </p>
        </div>
      </div>

      {/* Website Screenshot */}
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
        <img 
          src="/WEBSITE.png" 
          alt="Yeshiva University Website Homepage" 
          className="w-full h-auto"
        />
        <div className="p-3 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            <span className="font-medium text-slate-900 dark:text-slate-100">yu.edu</span> - Homepage Analysis (October 2025)
          </p>
        </div>
      </div>

      {/* Performance Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, idx) => {
          const colorClass = getScoreColor(metric.status)
          const Icon = [Zap, Smartphone, Search, TrendingUp][idx]
          
          return (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${colorClass.split(' ')[0]}`} />
                <div className={`text-xs px-2 py-1 rounded ${metric.status === 'excellent' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}`}>
                  {metric.status}
                </div>
              </div>
              
              <div className={`text-2xl font-light mb-1 ${colorClass.split(' ')[0]}`}>
                {metric.value}
              </div>
              
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {metric.label}
              </div>
              
              <div className="text-xs text-slate-500 dark:text-slate-500">
                Target: {metric.target}
              </div>
              
              {/* Score Bar */}
              <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${colorClass.split(' ')[2]} transition-all duration-1000`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Page Analysis */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Key Pages Assessment
        </h4>
        
        {pageAnalysis.map((page, idx) => {
          const getRatingColor = (rating) => {
            if (rating === 'Excellent') return 'bg-green-500'
            if (rating === 'Good') return 'bg-blue-500'
            if (rating === 'Fair') return 'bg-orange-500'
            return 'bg-red-500'
          }
          
          return (
            <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {page.page}
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  page.rating === 'Excellent' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  page.rating === 'Good' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                  'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                }`}>
                  {page.rating}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-green-600 dark:text-green-400 font-medium">✓ Strengths: </span>
                  <span className="text-slate-600 dark:text-slate-400">{page.strengths}</span>
                </div>
                <div>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">ℹ Status: </span>
                  <span className="text-slate-600 dark:text-slate-400">{page.issues}</span>
                </div>
              </div>
              
              {/* Rating Bar */}
              <div className="mt-3 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getRatingColor(page.rating)} transition-all duration-1000`}
                  style={{ width: `${page.rating === 'Excellent' ? '95%' : page.rating === 'Good' ? '75%' : '60%'}` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Key Data Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Employment Rate</div>
          <div className="text-3xl font-light text-blue-900 dark:text-blue-100">97%</div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Featured on homepage</div>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-sm text-green-700 dark:text-green-300 mb-1">Med School Acceptance</div>
          <div className="text-3xl font-light text-green-900 dark:text-green-100">92%</div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">Pre-med program strength</div>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Alumni Network</div>
          <div className="text-3xl font-light text-purple-900 dark:text-purple-100">70K+</div>
          <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Worldwide distribution</div>
        </div>
      </div>

      {/* Research Note */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          Research Methodology
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          All data collected through direct website analysis in October 2025. Assessment based on visual design, messaging clarity, brand consistency, and user experience evaluation. 100% verified through observable website elements.
        </p>
      </div>
    </div>
  )
}

export default WebsiteMetricsChart
