import { createPortal } from 'react-dom'
import { X, Instagram } from 'lucide-react'

const SocialMediaNotice = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-2xl mx-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-slate-900 dark:text-slate-100" />
              </div>
              <div>
                <h2 className="text-lg font-light text-slate-900 dark:text-slate-100 tracking-tight">
                  Instagram Focus
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Primary platform recommendation
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Why Instagram?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Based on our comprehensive research, Instagram represents the optimal platform for 
                higher education marketing. Our analysis demonstrates superior engagement rates, 
                visual storytelling capabilities, and demographic alignment with target audiences.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-light text-slate-900 dark:text-slate-100">2.99%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Industry Benchmark</div>
                </div>
                <div>
                  <div className="text-xl font-light text-slate-900 dark:text-slate-100">15.4K</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Current Followers</div>
                </div>
                <div>
                  <div className="text-xl font-light text-slate-900 dark:text-slate-100">4.12%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Peak Engagement</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Additional Platform Analysis
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                While Instagram remains our primary recommendation, comprehensive research data 
                for all major platforms (TikTok, LinkedIn, Facebook, Twitter) is available upon 
                request. Our analysis includes platform-specific strategies, engagement metrics, 
                and implementation recommendations tailored to institutional requirements.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-slate-100">Note:</span> The following 
                visualizations focus on Instagram analytics and performance metrics. Multi-platform 
                comparative analysis and strategic recommendations are documented in the research files.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-medium transition text-sm"
          >
            View Instagram Analytics
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SocialMediaNotice
