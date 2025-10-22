import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { X, Download, FileText } from 'lucide-react'

const MarkdownViewer = ({ file, onClose }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true)
        // Extract relative path from full path
        const match = file.path.match(/YU_Research_Documentation\/(.+)/)
        if (match) {
          const relativePath = match[1]
          const response = await fetch(`https://nomassi-1.onrender.com/api/files/${relativePath}`)
          
          if (!response.ok) {
            throw new Error('Failed to load markdown file')
          }
          
          const text = await response.text()
          setContent(text)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (file) {
      fetchMarkdown()
    }
  }, [file])

  if (!file) return null

  const handleDownload = () => {
    const match = file.path.match(/YU_Research_Documentation\/(.+)/)
    if (match) {
      window.open(`https://nomassi-1.onrender.com/api/download/${match[1]}`, '_blank')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 truncate">
                {file.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Markdown Document
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-2">Failed to load document</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">{error}</p>
            </div>
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none
              prose-headings:font-light prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:border-b prose-h1:border-slate-200 prose-h1:pb-2 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold
              prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:py-1 prose-blockquote:px-4
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-slate-600 dark:prose-li:text-slate-400
              prose-table:border-collapse prose-table:w-full
              prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-700 prose-td:p-3
              prose-img:rounded-lg prose-img:shadow-lg
              prose-hr:border-slate-200 dark:prose-hr:border-slate-800"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkdownViewer
