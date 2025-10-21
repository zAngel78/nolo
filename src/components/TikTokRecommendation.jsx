import { createPortal } from 'react-dom'
import { X, TrendingUp, Users, Target, Zap } from 'lucide-react'

const TikTokRecommendation = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-light text-slate-900 dark:text-slate-100 tracking-tight truncate">
                  TikTok: Critical Growth Opportunity
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 hidden sm:block">
                  Strategic platform recommendation
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 dark:hover:bg-slate-800 rounded transition flex-shrink-0"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="space-y-4">
            {/* Critical Status */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Current Status: Critical Gap
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    YU currently has <span className="font-medium text-slate-900 dark:text-slate-100">zero official TikTok presence</span> while 
                    the platform shows a <span className="font-medium text-yellow-600 dark:text-yellow-400">4.80% engagement rate</span> - 
                    the highest among all social media platforms and <span className="font-medium text-yellow-600 dark:text-yellow-400">3.2x higher than Instagram</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Why TikTok */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                Why TikTok is Essential
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Highest Engagement Platform
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    4.80% industry benchmark vs 2.99% Instagram, 2.97% Facebook. Short-form video content 
                    generates unprecedented engagement with Gen Z and Millennial audiences.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Rapid Growth Potential
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Research shows 2.28% weekly growth rate for higher education accounts. 
                    Authentic, student-generated content performs exceptionally well in this format.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Competitive Necessity
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Peer institutions are establishing presence. Early adoption provides first-mover 
                    advantage in reaching prospective students where they spend most of their time.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-lg sm:text-xl font-light text-yellow-600 dark:text-yellow-400">4.80%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Engagement</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-light text-yellow-600 dark:text-yellow-400">2.28%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Growth</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-light text-yellow-600 dark:text-yellow-400">30d</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Timeline</div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Strategic Recommendation
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Immediate TikTok launch is strongly recommended. Focus on student-voice content, 
                    behind-the-scenes campus life, and authentic storytelling. Partner with current students 
                    to create relatable, engaging content that showcases YU's unique community and values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 rounded bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium transition text-sm shadow-lg"
          >
            <span className="hidden sm:inline">Understood - Review Full Analysis</span>
            <span className="sm:hidden">Got it</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default TikTokRecommendation
