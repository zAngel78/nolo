import { X, FileText, Mail } from 'lucide-react'

/**
 * Minimalist info modal for section descriptions
 * Shows when a folder has hasInfoModal: true
 */
function SectionInfoModal({ folder, onClose }) {
  if (!folder) return null

  const getModalContent = () => {
    if (folder.id === "13") {
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="p-2 bg-emerald-500/10 dark:bg-emerald-500/20 rounded">
              <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Research Assets Collection
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Email Marketing Assets
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 text-sm">
            <p className="text-slate-600 dark:text-slate-300">
              This section contains <strong>30 newsletters and magazines</strong> from 4 universities
              captured for email marketing analysis (January 2024 - June 2025).
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded px-3 py-2 text-xs">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> Touro University is analyzed in the email marketing competitive report
                but their newsletters are not available here—they're gated behind alumni portal login with no public archive.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 py-3">
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">30</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Newsletters</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">4</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">18</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Months</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Success</div>
              </div>
            </div>

            {/* Difference */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                Section Comparison
              </h4>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs">
                  <FileText className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Folder #12 (Social Posts):</span>
                    <span className="text-slate-600 dark:text-slate-400"> Instagram, Facebook, Twitter, YouTube posts with images and videos</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Folder #13 (This Section):</span>
                    <span className="text-slate-600 dark:text-slate-400"> Email newsletters, magazines, and marketing campaigns</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2">
              See <strong>NEWSLETTER_SOURCES.txt</strong> for complete URLs and methodology.
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {folder.description}
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Section Information
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {getModalContent()}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded font-medium transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SectionInfoModal
