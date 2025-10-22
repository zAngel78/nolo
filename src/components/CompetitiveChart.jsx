import { TrendingUp, Users, Target } from 'lucide-react'

const CompetitiveChart = () => {
  const institutions = [
    { name: 'NYU', followers: 593000, engagement: 3.2, color: 'bg-purple-500', position: 'Leader' },
    { name: 'Columbia', followers: 457000, engagement: 2.9, color: 'bg-blue-500', position: 'Premium' },
    { name: 'Rutgers', followers: 124000, engagement: 2.1, color: 'bg-green-500', position: 'Challenger' },
    { name: 'Brandeis', followers: 25000, engagement: 1.8, color: 'bg-orange-500', position: 'Peer' },
    { name: 'YU', followers: 15400, engagement: 1.5, color: 'bg-red-500', position: 'Current' }
  ]

  const maxFollowers = Math.max(...institutions.map(i => i.followers))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            Competitive Analysis - Instagram
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Peer Institution Comparison (2025)
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {institutions.map((inst, idx) => {
          const widthPercent = (inst.followers / maxFollowers) * 100
          const isYU = inst.name === 'YU'
          
          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isYU ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {inst.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                    {inst.position}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${isYU ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
                    {inst.followers.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {inst.engagement}% engagement
                  </div>
                </div>
              </div>
              
              <div className="relative h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                <div
                  className={`${inst.color} h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-end px-3`}
                  style={{ width: `${widthPercent}%` }}
                >
                  {widthPercent > 15 && (
                    <span className="text-white text-xs font-medium">
                      {(inst.followers / 1000).toFixed(1)}K
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
          <div className="text-2xl font-light text-blue-900 dark:text-blue-100">38.5x</div>
          <div className="text-xs text-blue-700 dark:text-blue-300">Gap to Leader (NYU)</div>
        </div>
        
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 mb-2" />
          <div className="text-2xl font-light text-orange-900 dark:text-orange-100">1.6x</div>
          <div className="text-xs text-orange-700 dark:text-orange-300">Gap to Closest Peer</div>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
          <div className="text-2xl font-light text-green-900 dark:text-green-100">+67%</div>
          <div className="text-xs text-green-700 dark:text-green-300">Growth Target (6 months)</div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-slate-100">Key Insight:</span> YU is positioned as a niche player with strong engagement potential. Focus on quality content and student-voice storytelling to close the gap with Brandeis (+62% followers needed).
        </p>
      </div>
    </div>
  )
}

export default CompetitiveChart
