import { Mail, Users, TrendingUp, CheckCircle } from 'lucide-react'

const EmailMarketingChart = () => {
  const metrics = [
    { label: 'Total Alumni Reach', value: '70,000+', subtext: 'Worldwide distribution', icon: Users, color: 'blue' },
    { label: 'Newsletter Frequency', value: 'Monthly', subtext: 'Consistent delivery', icon: CheckCircle, color: 'green' },
    { label: 'Segmentation', value: 'High', subtext: 'Multiple audiences', icon: Mail, color: 'purple' },
    { label: 'Customization', value: 'Available', subtext: 'User-controlled', icon: TrendingUp, color: 'orange' }
  ]

  const campaigns = [
    { name: 'Alumni Affairs Newsletter', sent: 70000, frequency: 'Monthly', audience: 'Alumni worldwide' },
    { name: 'The View from YU', sent: 'All', frequency: 'Regular', audience: 'University community' },
    { name: 'Sy Syms Business', sent: 'Segment', frequency: 'Regular', audience: 'Business students' },
    { name: 'Donor Communications', sent: 'Segment', frequency: 'Campaign-based', audience: 'Donors & prospects' }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      green: 'bg-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      purple: 'bg-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      orange: 'bg-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
    }
    return colors[color]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-pink-50 dark:bg-pink-500/10 rounded-xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            Email Marketing Performance
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Alumni Engagement & Campaign Analytics
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          const colorClasses = getColorClasses(metric.color).split(' ')
          
          return (
            <div key={idx} className={`p-4 rounded-lg border ${colorClasses.slice(2).join(' ')}`}>
              <Icon className={`w-5 h-5 mb-2 ${colorClasses[1]}`} />
              <div className={`text-2xl font-light ${colorClasses[1]}`}>
                {metric.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {metric.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                {metric.subtext}
              </div>
            </div>
          )
        })}
      </div>

      {/* Newsletter Portfolio */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Newsletter Portfolio & Segmentation
        </h4>
        
        {campaigns.map((campaign, idx) => (
          <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {campaign.name}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                {campaign.frequency}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Reach</div>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {typeof campaign.sent === 'number' ? campaign.sent.toLocaleString() : campaign.sent}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Target Audience</div>
                <div className="font-medium text-slate-900 dark:text-slate-100 text-xs">
                  {campaign.audience}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
              Solid Foundation with Growth Opportunities
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              YU maintains a strong email marketing foundation with 70,000+ alumni reach, monthly newsletter consistency, and high segmentation. Recommendations: Consider quarterly deep-dive content (following Touro model), expand prospective student targeting, and implement analytics tracking for open/click rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailMarketingChart
