import { useState } from 'react'
import {
  Folder, FileText, Image as ImageIcon, BarChart3, Download, Search,
  Database, TrendingUp, FileBarChart, BookOpen,
  Menu, X, ChevronRight, Eye, ExternalLink, FileSpreadsheet,
  FileCode, XCircle, Mail, MonitorPlay, Globe
} from 'lucide-react'
import './App.css'

// Backend API configuration
const API_BASE = 'https://nomassi-1.onrender.com'

// Helper function to get file URL from backend
const getFileUrl = (path) => {
  // Extract the relative path after YU_Research_Documentation/
  const match = path.match(/YU_Research_Documentation\/(.+)/)
  if (match) {
    return `${API_BASE}/api/files/${match[1]}`
  }
  return path
}

// Helper function to get download URL
const getDownloadUrl = (path) => {
  const match = path.match(/YU_Research_Documentation\/(.+)/)
  if (match) {
    return `${API_BASE}/api/download/${match[1]}`
  }
  return path
}

// Research structure with actual file paths
const researchStructure = {
  overview: {
    totalDocuments: 34,
    totalPages: 229,
    chartsGenerated: 14,
    dataPoints: 4800
  },
  folders: [
    {
      id: "01",
      name: "Executive Summary",
      icon: BookOpen,
      color: "bg-blue-600",
      files: [
        { name: "122.pdf", type: "pdf", size: "107 KB", pages: 22, path: "../YU_Research_Documentation/01_Executive_Summary/122.pdf" },
        { name: "executive_summary.tex", type: "tex", size: "45 KB", path: "../YU_Research_Documentation/01_Executive_Summary/executive_summary.tex" }
      ],
      description: "Comprehensive executive summary of research findings"
    },
    {
      id: "02",
      name: "Competitive Analysis",
      icon: TrendingUp,
      color: "bg-green-600",
      files: [
        { name: "122.pdf", type: "pdf", size: "95 KB", pages: 18, path: "../YU_Research_Documentation/02_Competitive_Analysis/122.pdf" },
        { name: "competitive_analysis.tex", type: "tex", size: "38 KB", path: "../YU_Research_Documentation/02_Competitive_Analysis/competitive_analysis.tex" }
      ],
      description: "Analysis of competitor social media strategies"
    },
    {
      id: "03",
      name: "Social Media Analysis",
      icon: BarChart3,
      color: "bg-purple-600",
      files: [
        { name: "social_media_metrics.xlsx", type: "csv", size: "48 KB", path: "../YU_Research_Documentation/03_Social_Media_Analysis/social_media_metrics.xlsx" },
        { name: "executive_metrics.xlsx", type: "csv", size: "36 KB", path: "../YU_Research_Documentation/03_Social_Media_Analysis/executive_metrics.xlsx" },
        { name: "social_media_analysis.tex", type: "tex", size: "42 KB", path: "../YU_Research_Documentation/03_Social_Media_Analysis/social_media_analysis.tex" }
      ],
      description: "Comprehensive social media metrics and analysis"
    },
    {
      id: "04",
      name: "Qualitative Research",
      icon: FileText,
      color: "bg-amber-600",
      files: [
        { name: "qualitative_research.pdf", type: "pdf", size: "107 KB", pages: 22, path: "../YU_Research_Documentation/04_Qualitative_Research/qualitative_research.pdf" },
        { name: "content_coding_data.csv", type: "csv", size: "12 KB", path: "../YU_Research_Documentation/04_Qualitative_Research/content_coding_data.csv" },
        { name: "chart_content_categories.png", type: "image", size: "245 KB", path: "../YU_Research_Documentation/04_Qualitative_Research/chart_content_categories.png" },
        { name: "chart_tone_distribution.png", type: "image", size: "198 KB", path: "../YU_Research_Documentation/04_Qualitative_Research/chart_tone_distribution.png" },
        { name: "chart_format_performance.png", type: "image", size: "215 KB", path: "../YU_Research_Documentation/04_Qualitative_Research/chart_format_performance.png" },
        { name: "chart_production_quality.png", type: "image", size: "189 KB", path: "../YU_Research_Documentation/04_Qualitative_Research/chart_production_quality.png" },
        { name: "chart_voice_radar.png", type: "image", size: "278 KB", path: "../YU_Research_Documentation/04_Qualitative_Research/chart_voice_radar.png" },
        { name: "chart_platform_engagement.png", type: "image", size: "202 KB", path: "../YU_Research_Documentation/04_Qualitative_Research/chart_platform_engagement.png" }
      ],
      description: "Content strategy, brand voice, and visual identity analysis"
    },
    {
      id: "05",
      name: "Data and Metrics",
      icon: Database,
      color: "bg-red-600",
      files: [
        { name: "chart_follower_growth.png", type: "image", size: "312 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_follower_growth.png" },
        { name: "chart_follower_comparison.png", type: "image", size: "198 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_follower_comparison.png" },
        { name: "chart_engagement_comparison.png", type: "image", size: "225 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_engagement_comparison.png" },
        { name: "chart_engagement_trends.png", type: "image", size: "289 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_engagement_trends.png" },
        { name: "chart_video_percentage.png", type: "image", size: "195 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_video_percentage.png" },
        { name: "chart_posting_frequency.png", type: "image", size: "208 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_posting_frequency.png" },
        { name: "chart_performance_heatmap.png", type: "image", size: "245 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_performance_heatmap.png" },
        { name: "chart_yu_gap_analysis.png", type: "image", size: "335 KB", path: "../YU_Research_Documentation/05_Data_and_Metrics/chart_yu_gap_analysis.png" }
      ],
      description: "Quantitative analysis and statistical testing"
    },
    {
      id: "06",
      name: "Email Marketing",
      icon: Mail,
      color: "bg-pink-600",
      files: [
        { name: "email_marketing_analysis.pdf", type: "pdf", size: "76 KB", pages: 6, path: "../YU_Research_Documentation/06_Email_Marketing/email_marketing_analysis.pdf" },
        { name: "email_marketing_analysis.tex", type: "tex", size: "52 KB", path: "../YU_Research_Documentation/06_Email_Marketing/email_marketing_analysis.tex" },
        { name: "email_marketing_data.csv", type: "csv", size: "8 KB", path: "../YU_Research_Documentation/06_Email_Marketing/email_marketing_data.csv" }
      ],
      description: "Newsletter analysis, frequency, segmentation & competitor benchmarking"
    },
    {
      id: "07",
      name: "Digital Ads",
      icon: MonitorPlay,
      color: "bg-orange-600",
      files: [
        { name: "digital_ads_analysis.pdf", type: "pdf", size: "95 KB", pages: 10, path: "../YU_Research_Documentation/07_Digital_Ads/digital_ads_analysis.pdf" },
        { name: "digital_ads_analysis.tex", type: "tex", size: "68 KB", path: "../YU_Research_Documentation/07_Digital_Ads/digital_ads_analysis.tex" },
        { name: "digital_ads_data.csv", type: "csv", size: "6 KB", path: "../YU_Research_Documentation/07_Digital_Ads/digital_ads_data.csv" }
      ],
      description: "Meta Ads, Google Ads, WSJ campaigns & ROI analysis"
    },
    {
      id: "08",
      name: "Website Analysis",
      icon: Globe,
      color: "bg-teal-600",
      files: [
        { name: "website_analysis.pdf", type: "pdf", size: "124 KB", pages: 14, path: "../YU_Research_Documentation/08_Website_Analysis/website_analysis.pdf" },
        { name: "website_analysis.tex", type: "tex", size: "74 KB", path: "../YU_Research_Documentation/08_Website_Analysis/website_analysis.tex" },
        { name: "website_analysis_data.csv", type: "csv", size: "7 KB", path: "../YU_Research_Documentation/08_Website_Analysis/website_analysis_data.csv" }
      ],
      description: "Homepage, admissions, donations pages & UX competitive analysis"
    }
  ]
}

// File Preview Modal Component
function FilePreviewModal({ file, onClose }) {
  if (!file) return null

  const handleDownload = () => {
    const downloadUrl = getDownloadUrl(file.path)
    window.open(downloadUrl, '_blank')
  }

  const renderPreview = () => {
    if (file.type === 'image') {
      return (
        <div className="flex items-center justify-center p-4">
          <img
            src={getFileUrl(file.path)}
            alt={file.name}
            className="image-preview rounded-lg border border-slate-700"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%231e293b"/><text x="50%" y="50%" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16">Image not found</text></svg>'
            }}
          />
        </div>
      )
    }

    if (file.type === 'pdf') {
      return (
        <div className="h-full flex flex-col">
          <iframe
            src={`${getFileUrl(file.path)}#toolbar=1`}
            className="w-full flex-1 rounded-lg border border-slate-700"
            title={file.name}
          />
        </div>
      )
    }

    if (file.type === 'csv') {
      return (
        <div className="p-6 text-center">
          <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <p className="text-slate-300 mb-4">CSV files can be downloaded and opened in Excel or Google Sheets</p>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2 mx-auto"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      )
    }

    if (file.type === 'tex') {
      return (
        <div className="p-6 text-center">
          <FileCode className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <p className="text-slate-300 mb-4">LaTeX source file - compile in Overleaf or local TeX environment</p>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 mx-auto"
          >
            <Download className="w-4 h-4" />
            Download TEX
          </button>
        </div>
      )
    }

    return (
      <div className="p-6 text-center">
        <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
        <p className="text-slate-300">Preview not available for this file type</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
      <div
        className="w-full max-w-6xl h-[90vh] bg-slate-900 rounded-lg shadow-2xl flex flex-col border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {file.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
            {file.type === 'image' && <ImageIcon className="w-5 h-5 text-purple-500" />}
            {file.type === 'csv' && <Database className="w-5 h-5 text-green-500" />}
            {file.type === 'tex' && <FileCode className="w-5 h-5 text-blue-500" />}
            <div>
              <h3 className="font-semibold text-slate-200">{file.name}</h3>
              <p className="text-sm text-slate-400">{file.size}{file.pages && ` • ${file.pages} pages`}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <XCircle className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto scrollbar-custom">
          {renderPreview()}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeFolder, setActiveFolder] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [previewFile, setPreviewFile] = useState(null)
  const [showChangelog, setShowChangelog] = useState(true)

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
      case 'tex': return <FileCode className="w-5 h-5 text-blue-500" />
      case 'csv': return <FileSpreadsheet className="w-5 h-5 text-green-500" />
      case 'image': return <ImageIcon className="w-5 h-5 text-purple-500" />
      default: return <FileText className="w-5 h-5 text-slate-400" />
    }
  }

  const filteredFolders = researchStructure.folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Sidebar */}
      <div className={`sidebar-dark h-screen ${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden fixed left-0 top-0 z-40`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-slate-100">YU Research Admin</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 hover:bg-slate-700 rounded transition"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-400">Documentation Portal</p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <div className="text-xl font-bold text-blue-400">{researchStructure.overview.totalDocuments}</div>
              <div className="text-xs text-slate-400">Documents</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <div className="text-xl font-bold text-green-400">{researchStructure.overview.totalPages}</div>
              <div className="text-xs text-slate-400">Pages</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <div className="text-xl font-bold text-purple-400">{researchStructure.overview.chartsGenerated}</div>
              <div className="text-xs text-slate-400">Charts</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <div className="text-xl font-bold text-amber-400">{researchStructure.overview.dataPoints}</div>
              <div className="text-xs text-slate-400">Data Points</div>
            </div>
          </div>

          {/* Folders */}
          <div className="flex-1 overflow-y-auto scrollbar-custom space-y-1.5">
            {filteredFolders.map((folder) => {
              const Icon = folder.icon
              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolder(folder)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                    activeFolder?.id === folder.id
                      ? 'bg-slate-700/50 border border-slate-600'
                      : 'hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className={`${folder.color} p-2 rounded-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-slate-200">{folder.id}. {folder.name}</div>
                    <div className="text-xs text-slate-500">{folder.files.length} files</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="text-xs text-slate-500 text-center">
              Angel Ramirez → Stephany Nayz<br/>
              Yeshiva University
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-80' : 'ml-0'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                {activeFolder ? `${activeFolder.id}. ${activeFolder.name}` : 'Research Documentation'}
              </h2>
              <p className="text-sm text-slate-400">
                {activeFolder ? activeFolder.description : 'Select a folder from the sidebar'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!activeFolder ? (
            // Welcome
            <div className="max-w-5xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Folder className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">
                    YU Digital Presence Research
                  </h3>
                  <p className="text-slate-400 max-w-2xl mx-auto">
                    Comprehensive analysis and strategic recommendations for digital transformation
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-400 mb-2" />
                    <div className="text-2xl font-bold text-slate-200 mb-1">199</div>
                    <div className="text-sm text-slate-400">Total Pages</div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-400 mb-2" />
                    <div className="text-2xl font-bold text-slate-200 mb-1">14</div>
                    <div className="text-sm text-slate-400">Visual Charts</div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                    <Database className="w-6 h-6 text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-slate-200 mb-1">4,800+</div>
                    <div className="text-sm text-slate-400">Data Points</div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-3">
                  {researchStructure.folders.slice(0, 4).map((folder) => {
                    const Icon = folder.icon
                    return (
                      <button
                        key={folder.id}
                        onClick={() => setActiveFolder(folder)}
                        className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition text-left"
                      >
                        <div className={`${folder.color} p-2 rounded-lg`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-200">{folder.name}</div>
                          <div className="text-xs text-slate-500">{folder.files.length} files</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Files Grid
            <div className="max-w-7xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeFolder.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        {getFileIcon(file.type)}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="p-1.5 bg-slate-700 rounded hover:bg-slate-600 transition"
                          >
                            <Eye className="w-4 h-4 text-slate-300" />
                          </button>
                          <button
                            onClick={() => window.open(getDownloadUrl(file.path), '_blank')}
                            className="p-1.5 bg-slate-700 rounded hover:bg-slate-600 transition"
                          >
                            <Download className="w-4 h-4 text-slate-300" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-slate-200 mb-1 truncate">
                        {file.name}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{file.size}</span>
                        {file.pages && <span>{file.pages} pages</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts Grid */}
                {activeFolder.files.some(f => f.type === 'image') && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-slate-200 mb-4">Generated Charts</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeFolder.files.filter(f => f.type === 'image').map((file, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPreviewFile(file)}
                          className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition cursor-pointer group"
                        >
                          <div className="aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                            <img
                              src={getFileUrl(file.path)}
                              alt={file.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'
                              }}
                            />
                          </div>
                          <div className="p-3">
                            <div className="text-sm font-medium text-slate-200 truncate">{file.name}</div>
                            <div className="text-xs text-slate-500 mt-1">{file.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  )
}

export default App
