import { useState, useEffect } from 'react'
import {
  Folder, FileText, Image as ImageIcon, BarChart3, Download, Search,
  Database, TrendingUp, FileBarChart, BookOpen,
  Menu, X, ChevronRight, ChevronDown, Eye, ExternalLink, FileSpreadsheet,
  FileCode, XCircle, Mail, MonitorPlay, Globe, Sun, Moon, LogOut, MessageCircle
} from 'lucide-react'
import './App.css'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import BackgroundPattern from './components/BackgroundPattern'
import VisualInsights from './components/VisualInsights'
import EinsteinAI from './components/EinsteinAI'

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
    totalDocuments: 35,
    totalPages: 250,
    chartsGenerated: 14,
    dataPoints: 5200
  },
  folders: [
    {
      id: "01",
      name: "Executive Summary",
      icon: BookOpen,
      color: "bg-blue-600",
      files: [
        { 
          name: "122.pdf", 
          type: "pdf", 
          size: "107 KB", 
          pages: 22, 
          path: "../YU_Research_Documentation/01_Executive_Summary/122.pdf",
          highlights: [
            "Complete analysis of digital presence across all platforms",
            "Verified data from 6 major institutions",
            "95% data verification rate achieved",
            "2.8x engagement improvement potential identified"
          ]
        },
        { 
          name: "executive_summary.tex", 
          type: "tex", 
          size: "45 KB", 
          path: "../YU_Research_Documentation/01_Executive_Summary/executive_summary.tex",
          keyFindings: [
            {
              title: "Content Distribution",
              value: "30%",
              detail: "Leading in academic excellence content",
              trend: "positive"
            },
            {
              title: "Engagement Rate",
              value: "2.8x",
              detail: "Higher with informal tone",
              trend: "positive"
            },
            {
              title: "Platform Coverage",
              value: "85%",
              detail: "Of target audience reached",
              trend: "neutral"
            }
          ]
        }
      ],
      description: "Comprehensive analysis of digital presence and strategic recommendations",
      metrics: {
        totalAnalyzedContent: 5200,
        verifiedDataPoints: "95%",
        institutionsCompared: 6,
        timeframeCovered: "6 months"
      },
      keyInsights: [
        {
          title: "Academic Excellence",
          value: "30%",
          comparison: "Highest among peers",
          action: "Maintain leadership position"
        },
        {
          title: "Student Life Content",
          value: "25%",
          comparison: "Below peer average of 35%",
          action: "Increase coverage"
        },
        {
          title: "Content Strategy",
          value: "72%",
          comparison: "Diversity score",
          action: "Diversify content mix"
        }
      ]
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
        { name: "social_media_analysis.pdf", type: "pdf", size: "89 KB", pages: 14, path: "../YU_Research_Documentation/03_Social_Media_Analysis/social_media_analysis.pdf" },
        { name: "social_media_metrics.xlsx", type: "csv", size: "48 KB", path: "../YU_Research_Documentation/03_Social_Media_Analysis/social_media_metrics.xlsx" },
        { name: "executive_metrics.xlsx", type: "csv", size: "36 KB", path: "../YU_Research_Documentation/03_Social_Media_Analysis/executive_metrics.xlsx" },
        { name: "social_media_analysis.tex", type: "tex", size: "54 KB", path: "../YU_Research_Documentation/03_Social_Media_Analysis/social_media_analysis.tex" }
      ],
      description: "Platform metrics + Engagement Analysis (Informal vs Formal tone 2.8x boost)"
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
        { name: "email_marketing_analysis.pdf", type: "pdf", size: "92 KB", pages: 7, path: "../YU_Research_Documentation/06_Email_Marketing/email_marketing_analysis.pdf" },
        { name: "email_marketing_analysis.tex", type: "tex", size: "58 KB", path: "../YU_Research_Documentation/06_Email_Marketing/email_marketing_analysis.tex" },
        { name: "email_marketing_data.csv", type: "csv", size: "9 KB", path: "../YU_Research_Documentation/06_Email_Marketing/email_marketing_data.csv" }
      ],
      description: "70K+ alumni reach, verified contacts, monthly frequency ~85% verified"
    },
    {
      id: "07",
      name: "Digital Ads",
      icon: MonitorPlay,
      color: "bg-orange-600",
      files: [
        { name: "digital_ads_analysis.pdf", type: "pdf", size: "147 KB", pages: 20, path: "../YU_Research_Documentation/07_Digital_Ads/digital_ads_analysis.pdf" },
        { name: "digital_ads_analysis.tex", type: "tex", size: "95 KB", path: "../YU_Research_Documentation/07_Digital_Ads/digital_ads_analysis.tex" },
        { name: "digital_ads_data.csv", type: "csv", size: "8 KB", path: "../YU_Research_Documentation/07_Digital_Ads/digital_ads_data.csv" }
      ],
      description: "21 Meta Ads verified, YouTube (3 channels), Press Releases & WSJ campaigns"
    },
    {
      id: "08",
      name: "Website Analysis",
      icon: Globe,
      color: "bg-teal-600",
      files: [
        { name: "website_analysis.pdf", type: "pdf", size: "150 KB", pages: 16, path: "../YU_Research_Documentation/08_Website_Analysis/website_analysis.pdf" },
        { name: "website_analysis.tex", type: "tex", size: "82 KB", path: "../YU_Research_Documentation/08_Website_Analysis/website_analysis.tex" },
        { name: "website_analysis_data.csv", type: "csv", size: "8 KB", path: "../YU_Research_Documentation/08_Website_Analysis/website_analysis_data.csv" }
      ],
      description: "100% verified via WebFetch - Homepage, admissions, donations & UX analysis"
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
            className="w-full flex-1 rounded-lg border border-slate-200 dark:border-slate-700"
            title={file.name}
          />
        </div>
      )
    }

    if (file.type === 'csv') {
      return (
        <div className="p-6 text-center">
          <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <p className="text-slate-700 dark:text-slate-300 mb-4">CSV files can be downloaded and opened in Excel or Google Sheets</p>
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
          <p className="text-slate-700 dark:text-slate-300 mb-4">LaTeX source file - compile in Overleaf or local TeX environment</p>
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
        <p className="text-slate-700 dark:text-slate-300">Preview not available for this file type</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-6xl h-[90vh] bg-white dark:bg-slate-900 rounded-lg shadow-2xl flex flex-col border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            {file.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
            {file.type === 'image' && <ImageIcon className="w-5 h-5 text-purple-500" />}
            {file.type === 'csv' && <Database className="w-5 h-5 text-green-500" />}
            {file.type === 'tex' && <FileCode className="w-5 h-5 text-blue-500" />}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-200">{file.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{file.size}{file.pages && ` • ${file.pages} pages`}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <XCircle className="w-6 h-6 text-slate-500 dark:text-slate-400" />
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

const universityComparisons = {
  'Academic Excellence': {
    'YU': 30,
    'NYU': 20,
    'Columbia': 25,
    'Rutgers': 18,
    'Brandeis': 28,
    'Maryland': 15
  },
  'Student Life': {
    'YU': 25,
    'NYU': 35,
    'Columbia': 32,
    'Rutgers': 38,
    'Brandeis': 30,
    'Maryland': 40
  },
  'Campus Events': {
    'YU': 20,
    'NYU': 15,
    'Columbia': 18,
    'Rutgers': 20,
    'Brandeis': 22,
    'Maryland': 18
  },
  'Athletics': {
    'YU': 8,
    'NYU': 12,
    'Columbia': 10,
    'Rutgers': 15,
    'Brandeis': 8,
    'Maryland': 20
  },
  'Research Highlights': {
    'YU': 10,
    'NYU': 10,
    'Columbia': 12,
    'Rutgers': 5,
    'Brandeis': 8,
    'Maryland': 4
  }
}

function App() {
  const { isAuthenticated, isLoading, logout } = useAuth()
  const [activeFolder, setActiveFolder] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [previewFile, setPreviewFile] = useState(null)
  const [showChangelog, setShowChangelog] = useState(true)
  const [activeComparison, setActiveComparison] = useState(null)
  const [showInsightPanel, setShowInsightPanel] = useState(true)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  // useEffect debe estar antes de cualquier return condicional
  useEffect(() => {
    console.log('Dark mode changed to:', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
      console.log('Added dark class')
    } else {
      document.documentElement.classList.remove('dark')
      console.log('Removed dark class')
    }
  }, [darkMode])

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900 dark:border-slate-100 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated) {
    return <Login />
  }

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-600 dark:text-red-500" />
      case 'tex': return <FileCode className="w-5 h-5 text-blue-600 dark:text-blue-500" />
      case 'csv': return <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-500" />
      case 'image': return <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-500" />
      default: return <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
    }
  }

  const filteredFolders = researchStructure.folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Category Analysis - Methodology and Data Sources
  const categoryAnalysis = {
    "01": {
      title: "Executive Summary - Data Methodology",
      subtitle: "How we calculated 5,200+ data points and 95% verification rate",
      metrics: [
        { value: "1.5%", label: "Current Instagram", color: "text-amber-400" },
        { value: "4.80%", label: "TikTok Benchmark", color: "text-green-400" },
        { value: "133%", label: "Improvement Potential", color: "text-blue-400" },
        { value: "285%", label: "TikTok Launch ROI", color: "text-purple-400" }
      ],
      methodology: "WHY 1.5% current Instagram? Table 1.1 line 71 shows YU's current Instagram engagement rate vs 2.99% benchmark = -1.49% gap (High impact). WHY 4.80% for TikTok? Line 72: Industry benchmark for higher ed TikTok with 92% completion rate (Table 1.2 line 92). Current 0% because YU has no TikTok presence = -4.80% gap marked 'Critical'. WHY 133% improvement? Line 80: implementing optimized content strategies can drive 133%+ improvements within 6 months. WHY 285% ROI for TikTok? Table 1.3 line 127: TikTok Launch costs $45,000, 90-day timeline, expected 285% return on investment. WHY these exact numbers? Instagram Reels: 1.99% avg engagement (line 91), Static Posts: 0.80% (line 93), Video content 1.8 to 4.2x better than static (line 100). Weekly follower growth: 2.28% (line 110). Resource allocation: 40% content creation, 30% platform management, 30% analytics (line 138).",
      sources: "executive_summary.tex Table 1.1 (lines 64-78): Platform Performance with exact current vs benchmark gaps. Table 1.2 (lines 84-98): Content Format Performance showing TikTok 4.80%, Reels 1.99%, Static 0.80%. Table 1.3 (lines 120-134): Implementation costs - TikTok $45K/285% ROI, Video Production $75K/180% ROI, Team Expansion $120K/150% ROI. Lines 146-148: 60-80% follower growth + 100-150% engagement improvements expected in 6 months."
    },
    "02": {
      title: "Competitive Analysis - Peer Selection Methodology",
      subtitle: "How we selected and analyzed 6 peer institutions",
      metrics: [
        { value: "3.2%", label: "NYU Engagement", color: "text-blue-400" },
        { value: "3.5%", label: "Brandeis Peak", color: "text-green-400" },
        { value: "1.5%", label: "YU Current", color: "text-amber-400" },
        { value: "8%", label: "YU Market Share", color: "text-red-400" }
      ],
      methodology: "WHY 3.2% for NYU? Table 2.1 line 53 shows NYU as market leader with 35% digital share, 3.2% engagement rate, +2.5% growth rate. WHY 3.5% for Brandeis? Line 56: Brandeis achieves 3.5% engagement despite only 12% market share, classified as 'Niche' player. WHY YU at 1.5%? Line 58: Yeshiva has 8% digital share, 1.5% engagement rate, +0.8% growth, positioned as 'Emerging'. WHY these specific competitors? NYU (35% share, Leader), Columbia (28% share, 2.8% engagement, Premium), Rutgers (15% share, 3.1% engagement, Challenger), Brandeis (12% share, 3.5% engagement, Niche), Maryland (10% share, 2.7% engagement, Traditional). Table 2.2 line 108-110 shows Leaders use 65% video content vs YU's 20% (Emerging tier). WHY 50-75% above average? Line 40: Digital Leaders achieve engagement rates 50-75% above industry averages through sophisticated content strategies. Leaders post 65% video, 25% Stories/Reels, 10% static. Emerging (YU) posts 20% video, 15% Stories/Reels, 65% static.",
      sources: "competitive_analysis.tex Table 2.1 (lines 48-58): Exact engagement rates - NYU 3.2%, Columbia 2.8%, Rutgers 3.1%, Brandeis 3.5%, Maryland 2.7%, Yeshiva 1.5%. Market shares on same lines. Table 2.2 (lines 103-112): Content Type distribution - Leaders 65% video vs Emerging 20% video, showing exact format gaps. Line 40: '50-75% above industry averages' for leaders. Line 73: NYU's video content exceeds benchmarks by 50-75%."
    },
    "03": {
      title: "Social Media - Engagement Rate Calculation",
      subtitle: "How we determined 2.8x informal vs formal engagement difference",
      metrics: [
        { value: "15,010", label: "Instagram Followers", color: "text-purple-400" },
        { value: "2.8x", label: "Informal vs Formal", color: "text-green-400" },
        { value: "3.45%", label: "Avg Engagement Rate", color: "text-blue-400" },
        { value: "4.12%", label: "Student Voice Peak", color: "text-green-500" }
      ],
      methodology: "WHY 15,010 followers? Verified directly from @yeshiva_university Instagram profile Oct 2025, not rounded. WHY 2.8x exactly? Calculated as 3.45% divided by 1.23% = 2.8048, rounded to 2.8x. WHY 3.45%? Industry benchmark for informal/conversational content in higher ed (average of 100+ institutions analyzed). WHY 4.12%? Student Voice/UGC content performs best - calculated from analyzing posts where students created content vs institutional posts. Table 3.4 in LaTeX shows: Informal 3.45% (42 comments/post, 18 shares), Student Voice 4.12% (67 comments, 31 shares), Formal 1.23% (8 comments, 3 shares). Formula: (likes + comments) / followers × 100. Example: 525 interactions / 15,010 followers = 3.5% engagement.",
      sources: "social_media_analysis.tex lines 135-147 (Table 3.4: Engagement Rates by Content Tone). Lines 151-195 show concrete examples with projected engagement for YU's 15K base. WHY +340% for student faces? Line 207: tested across multiple posts, student-generated content consistently outperforms institutional by this margin. WHY +180% for informal shift? Line 284: calculated expected lift if 60% of content switches to informal tone."
    },
    "04": {
      title: "Qualitative Research - Content Categorization Method",
      subtitle: "How we calculated 30% Academic Excellence, 25% Student Life percentages",
      metrics: [
        { value: "30%", label: "YU Academic", color: "text-blue-400" },
        { value: "25%", label: "YU Student Life", color: "text-green-400" },
        { value: "0.72", label: "YU Diversity Score", color: "text-amber-400" },
        { value: "0.85", label: "NYU Diversity", color: "text-purple-400" }
      ],
      methodology: "WHY 30% Academic Excellence? Table 4.1 line 74 shows YU posts 30% academic content - highest among all peers. Calculated from 100 Instagram posts categorized manually. WHY 25% Student Life? Line 73: YU only 25% student life vs NYU 35%, Columbia 32%, Rutgers 38%, Brandeis 30%, Maryland 40%. YU significantly below peer average. WHY 0.72 diversity score? Line 81: Shannon diversity index where 1.0 = perfect distribution. YU's 0.72 is lowest among peers. NYU leads at 0.85 (line 84). WHY does diversity matter? Line 84: 'potential over-reliance on academic content' limits engagement. Complete breakdown: Student Life 25%, Academic 30%, Campus Events 20%, Athletics 8%, Research 10%, Alumni 5%, Cultural/Religious 2% (lines 73-79). WHY these exact percentages? Each of 100 posts coded into categories, percentages = (category count / 100). NYU comparison: They post 35% Student Life (10% more than YU), only 20% Academic (10% less). Line 86: 'Gen Z audiences prioritize authentic student experience content' - explaining why NYU's strategy outperforms YU's academic-heavy approach.",
      sources: "qualitative_research.tex Table 4.1 (lines 52-82): Complete content category distribution for all 6 institutions. Lines 73-79 show exact percentages per category. Line 81: Diversity scores calculated via Shannon index. Line 84: NYU 0.85 (leader) vs YU 0.72 explanation. Line 86: Strategic implications - student life content's 'superior engagement potential' vs academic content."
    },
    "05": {
      title: "Data & Metrics - Chart Generation Process",
      subtitle: "How we created 8 data visualizations with statistical validation",
      metrics: [
        { value: "8", label: "Charts Generated", color: "text-purple-400" },
        { value: "4.52%", label: "Wed 8PM Peak", color: "text-green-400" },
        { value: "1.85x", label: "Optimal Time Boost", color: "text-blue-400" },
        { value: "87%", label: "Institutions on IG", color: "text-amber-400" }
      ],
      methodology: "WHY 8 charts? Folder has 8 PNG files: chart_engagement_comparison.png, chart_engagement_trends.png, chart_follower_comparison.png, chart_follower_growth.png, chart_performance_heatmap.png, chart_posting_frequency.png, chart_video_percentage.png, chart_yu_gap_analysis.png - all generated from generate_metric_charts.py using matplotlib. WHY 4.52% Wed 8PM? Table line 274: Instagram content posted Wednesday 8:00 PM achieves 4.52% engagement rate - optimal posting time. WHY 1.85x boost? Same line: 1.85 times average performance when posting at optimal time. WHY 87%? Line 50: '87% of surveyed institutions maintaining active' Instagram presences. Table shows TikTok benchmark 4.80% engagement, Instagram 2.99%, LinkedIn 2.95% (lines 214-216). WHY 9.2/10 ROI for Instagram? Line 215: Instagram scores 9.2 out of 10 for ROI, marked 'Critical' priority. TikTok scores 9.8/10. WHY Wednesday/Tuesday optimal? Line 274-275: Wednesday 8PM for Instagram (4.52%, 96% of maximum), Tuesday 7:30PM for TikTok (5.80%, 94% of maximum). Line 281: 85% higher engagement when posting at optimal times.",
      sources: "data_metrics.tex line 38: 'eight primary platforms' monitored. Line 50: 87% of institutions on Instagram. Table lines 214-216: Platform benchmarks - TikTok 4.80%, Instagram 2.99%, ROI scores. Lines 274-275: Optimal posting times with exact engagement rates. Line 281: '85% higher' engagement at optimal times. Python script generate_metric_charts.py creates all 8 charts from instagram_metrics.csv."
    },
    "06": {
      title: "Email Marketing - Data Verification Process",
      subtitle: "How we verified 70K+ alumni reach and monthly frequency",
      metrics: [
        { value: "70,000+", label: "Alumni Worldwide", color: "text-blue-400" },
        { value: "Monthly", label: "Newsletter Freq", color: "text-green-400" },
        { value: "646.592.4493", label: "Director Phone", color: "text-purple-400" },
        { value: "Tri-annual", label: "Brandeis Freq", color: "text-amber-400" }
      ],
      methodology: "WHY 70,000+ alumni? Lines 30, 46, 83, 159: 'Strong alumni base of 70,000+ worldwide' verified from YU official statements. Exact number appears 4 times in LaTeX confirming consistency. WHY monthly frequency? Lines 27, 158, 176: 'monthly alumni newsletter' with 'consistent delivery' documented. Archive analysis showed regular monthly publications. WHY 646.592.4493? Line 47: Beth Lebenson Praver (Director) verified phone number from yu.edu/alumni contact page. Email: beth.lebensonpraver@yu.edu. General contact line 48: 646.592.4490 | alumni@yu.edu. WHY tri-annual for Brandeis? Line 104: Brandeis publishes 'tri-annual vs monthly' - meaning 3 times per year (every 4 months), not quarterly. They have 'award-winning alumni magazine with professional production quality' but less frequent. Line 175-176: Recommendation to 'maintain monthly updates but supplement with richer quarterly content' following Touro model.",
      sources: "email_marketing_analysis.tex lines 27, 30: Monthly frequency and 70K alumni base stated upfront. Lines 46-48: Complete contact verification - Director Beth Lebenson Praver phone/email, general alumni@yu.edu. Line 83: Alumni segmentation shows 70,000+ contacts. Line 159: Table row 'Total Alumni Reach: 70,000+ Worldwide distribution'. Lines 104-106: Brandeis tri-annual comparison with production quality notes."
    },
    "07": {
      title: "Digital Ads - Meta Ads Library Verification",
      subtitle: "How we documented 21 active campaigns with real Library IDs",
      metrics: [
        { value: "21", label: "Active Meta Ads", color: "text-green-400" },
        { value: "$210K-$354K", label: "WSJ Ad Cost", color: "text-amber-400" },
        { value: "214K", label: "Top Video Views", color: "text-red-400" },
        { value: "5,810", label: "YouTube Subs", color: "text-blue-400" }
      ],
      methodology: "WHY 21 active campaigns? Manually counted each active ad in Meta Ads Library search 'Yeshiva University' Oct 2025. WHY $210K-$354K? Verified from WSJ Media Kit 2024 official rate card for full-page color magazine insert (lines 65-66 in LaTeX). YU runs semi-annual WSJ ads (2x/year), verified publications March 31 and April 30, 2025. WHY 5,810 subscribers exactly? Scraped from youtube.com/@YeshivaUniversity Oct 2025 (5.81K displayed = 5,810 actual). WHY 214K views for Maccabeats? YU Maccabeats White House performance is all-time most viewed video (14 years old, line 183). Recent top: Rachel Goldberg-Polin 29K views (line 186). WHY 81% graduate recruitment? 17 ads out of 21 total are for Azrieli Graduate School (11 ads) + Revel Graduate School (6 ads) = 17/21 = 81%. Library ID example: 1987105728741190 (Israel advocacy video ad, started Oct 17, 2025).",
      sources: "digital_ads_analysis.tex lines 65-66 (WSJ rates), line 179 (YouTube 5,810 subs), line 183 (214K Maccabeats views), lines 296-298 (Meta Ads Library ID 1987105728741190 documented). Lines 289-290: '21 active ad campaigns' verified via facebook.com/ads/library. Line 224: Y-Studs secondary channel has 36K+ subs, 10M+ views. Line 230: Total social reach 70,000+ followers combined."
    },
    "08": {
      title: "Website Analysis - 100% Direct Verification Method",
      subtitle: "How we verified 4 critical pages across 3 institutions with zero estimations",
      metrics: [
        { value: "100%", label: "Verified Data", color: "text-green-400" },
        { value: "4", label: "Pages Analyzed", color: "text-blue-400" },
        { value: "3", label: "Institutions", color: "text-purple-400" },
        { value: "97%", label: "Employment Rate", color: "text-emerald-400" }
      ],
      methodology: "WHY 100% verified? Lines 586, 652, 681: 'All data in this report is derived from direct, real-time analysis of live university websites' - zero estimations or assumptions. Every finding observable and verifiable. WHY 4 pages? Lines 591-596: Homepage (yu.edu), Admissions (yu.edu/admissions), Donations (yu.edu/give), Alumni (yu.edu/alumni) - each analyzed for design, messaging, CTAs, brand consistency. WHY 3 institutions? Line 23: YU, Brandeis, Touro comparative analysis. WHY 97% employment? Lines 31, 140, 603, 669: Exact statistic verified directly from YU homepage - strong outcomes messaging. WHY 92% medical school acceptance? Same lines: pre-med program strength metric verified. WHY 'a place to' critical? Lines 160, 464: INCOMPLETE HEADLINE on admissions page - appears unfinished, damages first impression, priority CRITICAL. WHY 5 Hebrew values? Lines 29, 77-93: Emet (Truth), Adam (Human), Chaim (Life), Chesed (Kindness), Tzion (Zion) - Table shows all translations. WHY $613M campaign? Line 314: 'Rise Up: The Campaign for 613' launched 2019, unprecedented scale. Line 316: Annual giving grew $30M (2018) to $92M (2021). WHY 301 redirect? Line 287: yu.edu/give uses '301 Moved Permanently' to GiveCampus platform - potential brand disruption but industry standard.",
      sources: "website_analysis.tex lines 586-606: Methodology section '100% Direct Website Analysis' explains verification process. Lines 591-596: All 4 pages listed. Lines 599-606: Verified elements include incomplete headline, Hebrew values, employment/medical data, NYC photography, 301 redirect. Line 681: 'October 2025 | Method: Direct website analysis (100% verified, zero estimations)'. Lines 160-172: Critical admissions headline issue with impact assessment. Table 79-93: Hebrew values framework with complete translations."
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`h-screen ${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden fixed left-0 top-0 z-40 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900`}>
        <div className="p-8 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-slate-900 dark:text-slate-100 tracking-tight">Research</h1>
                <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Documentation Portal</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={logout}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition group"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition group"
                  title="Collapse sidebar"
                >
                  <ChevronRight className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
              <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-sm transition-colors"
            />
          </div>

          {/* Stats */}
          <div className="space-y-6 mb-8">
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Overview</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-light text-slate-900 dark:text-slate-100">{researchStructure.overview.totalDocuments}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Documents</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-light text-slate-900 dark:text-slate-100">{researchStructure.overview.totalPages}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pages</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Analysis</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-light text-slate-900 dark:text-slate-100">{researchStructure.overview.chartsGenerated}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Charts</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-light text-slate-900 dark:text-slate-100">{researchStructure.overview.dataPoints}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Data Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Folders */}
          <div className="flex-1 overflow-y-auto scrollbar-custom">
            <div className="space-y-6">
              {filteredFolders.map((folder) => {
                const Icon = folder.icon
                const isActive = activeFolder?.id === folder.id
                return (
                  <div key={folder.id} className="space-y-1">
                    <button
                      onClick={() => setActiveFolder(folder)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-500/10'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                        isActive ? 'bg-blue-500/10 dark:bg-blue-500/20' : 'bg-slate-50 dark:bg-slate-800'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isActive ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`text-sm font-medium ${
                          isActive ? 'text-blue-500' : 'text-slate-900 dark:text-slate-100'
                        }`}>
                          {folder.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {folder.files.length} files
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${
                        isActive ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'
                      }`} />
                    </button>
                    {isActive && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
                        {folder.description}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Theme Toggle & Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <div className="font-medium">Research Documentation</div>
              <div className="mt-1">Angel Ramirez & Stephany Nayz</div>
              <div className="mt-0.5">Yeshiva University</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'lg:ml-72' : 'ml-0'} transition-all duration-300 relative z-10`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all hover:scale-110 group border border-slate-200 dark:border-slate-700"
                title="Expand sidebar"
              >
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </button>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-light text-slate-900 dark:text-white tracking-tight mb-1 truncate">
                {activeFolder ? activeFolder.name : 'Research Documentation'}
              </h2>
              {activeFolder && (
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate">
                  {activeFolder.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {activeFolder && (
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {activeFolder.files.length} files
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-white dark:bg-slate-950">
          {!activeFolder ? (
            // Welcome
            <div className="max-w-5xl mx-auto">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 corporate-shadow">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Folder className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-slate-900 dark:text-slate-100 mb-2">
                    YU Digital Presence Research
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Comprehensive analysis and strategic recommendations for digital transformation
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-500 mb-2" />
                    <div className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1">250</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Total Pages</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-500 mb-2" />
                    <div className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1">~95%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Data Verified</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                    <Database className="w-6 h-6 text-green-500 mb-2" />
                    <div className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1">5,200+</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Data Points</div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  {researchStructure.folders.slice(0, 4).map((folder) => {
                    const Icon = folder.icon
                    return (
                      <button
                        key={folder.id}
                        onClick={() => setActiveFolder(folder)}
                        className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:border-slate-900 dark:hover:border-slate-100 transition-colors text-left group"
                      >
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">{folder.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{folder.files.length} files</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Files Grid
            <div className="max-w-7xl mx-auto">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 corporate-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-light text-slate-900 dark:text-slate-100 tracking-tight">Available Documents</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select a document to view or analyze</p>
                  </div>
                  {activeFolder && (
                    <button
                      onClick={() => setShowAnalysis(activeFolder.id)}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded flex items-center gap-2 transition-colors text-xs font-medium"
                    >
                      <FileBarChart className="w-4 h-4" />
                      Analysis
                    </button>
                  )}
                </div>

                {/* Visual Insights Section */}
                {activeFolder.id === '03' && (
                  <div className="mb-8">
                    <VisualInsights categoryId={activeFolder.id} />
                  </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeFolder.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-4 hover:border-slate-900 dark:hover:border-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                            {file.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">{file.size}</span>
                            {file.pages && (
                              <>
                                <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{file.pages} pages</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" />
                          </button>
                          <button
                            onClick={() => window.open(getDownloadUrl(file.path), '_blank')}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                          >
                            <Download className="w-4 h-4 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" />
                          </button>
                        </div>
                      </div>

                      {file.highlights && (
                        <div className="mt-4 space-y-2">
                          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">Key Highlights</div>
                          {file.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                              <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {file.keyFindings && (
                        <div className="mt-4 space-y-3">
                          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">Key Findings</div>
                          {file.keyFindings.map((finding, i) => (
                            <div key={i} className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-600 dark:text-slate-400">{finding.title}</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{finding.value}</span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-500">{finding.detail}</div>
                              <div className={`h-1 rounded-full mt-2 ${
                                finding.trend === 'positive' ? 'bg-green-500' :
                                finding.trend === 'negative' ? 'bg-red-500' :
                                'bg-slate-500'
                              }`}></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                  {/* Interactive Category Bubbles */}
                {activeFolder.name === "Content Analysis" && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-200">Content Category Impact</h4>
                      <button
                        onClick={() => setActiveComparison('detailed_analysis')}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
                      >
                        <FileBarChart className="w-4 h-4" />
                        View Full Analysis
                      </button>
                    </div>
                    <div className="relative h-[400px] bg-slate-100 dark:bg-slate-800/30 rounded-lg p-6 overflow-hidden group border border-slate-200 dark:border-transparent">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-green-500/10 opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                      
                      {/* Interactive bubbles */}
                      <div className="bubble-container">
                        {[
                          { name: 'Academic Excellence', value: 30, color: 'bubble-gradient-blue', textColor: 'text-blue-200', description: 'Leading in academic content with focus on faculty achievements and research excellence' },
                          { name: 'Student Life', value: 25, color: 'bubble-gradient-green', textColor: 'text-green-200', description: 'Engaging student community through campus life and activities' },
                          { name: 'Campus Events', value: 20, color: 'bubble-gradient-orange', textColor: 'text-orange-200', description: 'Comprehensive coverage of university events and initiatives' },
                          { name: 'Research Highlights', value: 10, color: 'bubble-gradient-purple', textColor: 'text-purple-200', description: 'Showcasing groundbreaking research and academic discoveries' },
                          { name: 'Athletics', value: 8, color: 'bubble-gradient-amber', textColor: 'text-amber-200', description: 'Celebrating sports achievements and team accomplishments' }
                        ].map((category, index) => {
                          // Calculate position with adjusted radius based on bubble size
                          const radius = 160; // Base radius
                          const angle = (index * 72 - 90) * (Math.PI / 180); // Start from top (-90 degrees) and space evenly
                          return (
                            <div
                              key={category.name}
                              className={`category-bubble ${category.color}`}
                              style={{
                                width: `${category.value * 8}px`,
                                height: `${category.value * 8}px`,
                                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            onClick={() => setActiveComparison(category.name)}
                            onMouseEnter={() => {
                              const insightPanel = document.querySelector('.insight-panel');
                              if (insightPanel) {
                                insightPanel.innerHTML = `
                                  <div class="flex items-center gap-2 mb-2">
                                    <div class="w-2 h-2 rounded-full ${category.textColor.replace('text-', 'bg-')}"></div>
                                    <span class="font-semibold ${category.textColor}">${category.name}</span>
                                    <span class="text-white font-bold">${category.value}%</span>
                                  </div>
                                  <p class="text-slate-300">${category.description}</p>
                                  <p class="text-slate-400 text-xs mt-2">Click para ver comparación con otras universidades</p>
                                `;
                              }
                            }}
                          >
                              <div className="text-center p-4">
                                <div className="text-xl font-bold text-white mb-1">{category.value}%</div>
                                <div className={`text-xs ${category.textColor} whitespace-nowrap font-medium`}>{category.name}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Insight panel */}
                      <div className="absolute bottom-0 left-0 right-0" style={{ pointerEvents: 'none' }}>
                        <button 
                          onClick={() => setShowInsightPanel(!showInsightPanel)}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-t-lg border-t border-l border-r border-slate-700 hover:bg-slate-800/90 transition-colors"
                          style={{ pointerEvents: 'auto' }}
                        >
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${!showInsightPanel ? 'rotate-180' : ''}`} />
                        </button>
                        <div 
                          className={`bg-slate-900/90 backdrop-blur-sm p-4 transform transition-all duration-300 ease-in-out ${showInsightPanel ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                          style={{ pointerEvents: 'auto' }}
                        >
                          <div className="insight-panel text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                              <span className="font-semibold text-blue-200">Content Distribution</span>
                            </div>
                            <p className="text-slate-300">
                              Hover over each category to see insights and click for comparisons.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                  {/* Charts Grid */}
                {activeFolder.files.some(f => f.type === 'image') && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-4">Generated Charts</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeFolder.files.filter(f => f.type === 'image').map((file, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPreviewFile(file)}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:border-blue-500/50 dark:hover:border-slate-600 transition cursor-pointer group"
                        >
                          <div className="aspect-video bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                            <img
                              src={getFileUrl(file.path)}
                              alt={file.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'
                              }}
                            />
                          </div>
                          <div className="p-3">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">{file.name}</div>
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

      {/* Comparison Modal */}
      {activeComparison && activeComparison !== 'detailed_analysis' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-3xl mx-4 bg-white border border-slate-200 rounded-xl shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-light text-slate-900">
                    Category Comparison
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{activeComparison}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveComparison(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(universityComparisons[activeComparison]).map(([uni, value]) => (
                  <div key={uni} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{uni}</span>
                      <span className="text-sm font-bold text-slate-900">{value}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          uni === 'YU' ? 'bg-blue-500' : 'bg-slate-300'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  <strong className="text-blue-600 font-medium">Analysis:</strong> {' '}
                  {activeComparison === 'Academic Excellence' && 'YU leads in academic excellence with 30%, outperforming NYU (20%) and approaching Columbia (25%). This focus demonstrates a strong commitment to educational quality.'}
                  {activeComparison === 'Student Life' && 'At 25%, YU maintains a balanced student life content, though below NYU (35%) and Maryland (40%). This suggests opportunities to increase student-focused content.'}
                  {activeComparison === 'Campus Events' && 'YU (20%) maintains consistent event coverage, on par with Rutgers and above NYU (15%). This consistency contributes to an active community presence.'}
                  {activeComparison === 'Athletics' && 'At 8% for athletics, comparable to Brandeis but lower than other institutions, reflecting a more academically-focused communication strategy.'}
                  {activeComparison === 'Research Highlights' && 'With 10% in research content, YU matches NYU and maintains significant research presence, outperforming several competitor institutions.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Analysis Modal */}
      {activeComparison === 'detailed_analysis' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-5xl h-[90vh] mx-4 bg-white border border-slate-200 rounded-xl shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileBarChart className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-light text-slate-900">
                    Detailed Content Analysis
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">Comprehensive analysis of content distribution</p>
                </div>
              </div>
              <button
                onClick={() => setActiveComparison(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-8">
                {/* Academic Excellence Section */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-slate-900 mb-2">Academic Excellence (30%)</h4>
                      <div className="space-y-4">
                        <p className="text-slate-600">Leading percentage reflects YU's strategic focus on academic content. Key findings:</p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Highest proportion among peer institutions (30% vs. NYU 20%, Columbia 25%)</li>
                          <li>Strong emphasis on faculty achievements and research publications</li>
                          <li>Content focuses on academic program innovations and research breakthroughs</li>
                          <li>Direct correlation with increased graduate program engagement</li>
                        </ul>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-blue-700 font-medium mb-2">Impact Analysis:</p>
                          <p className="text-slate-600">The 30% allocation to academic excellence has shown measurable results in:</p>
                          <ul className="list-disc pl-5 space-y-1 text-slate-600">
                            <li>Higher engagement from prospective graduate students</li>
                            <li>Increased visibility of faculty research</li>
                            <li>Stronger academic reputation metrics</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Life Section */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Folder className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-slate-900 mb-2">Student Life (25%)</h4>
                      <div className="space-y-4">
                        <p className="text-slate-600">Second highest content category, focusing on community engagement. Analysis shows:</p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Balanced coverage of student activities and achievements</li>
                          <li>Strong focus on community building and student experiences</li>
                          <li>Integration of academic and social aspects of campus life</li>
                          <li>Room for growth compared to peer institutions (NYU 35%, Maryland 40%)</li>
                        </ul>
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                          <p className="text-green-700 font-medium mb-2">Engagement Metrics:</p>
                          <p className="text-slate-600">Student life content shows:</p>
                          <ul className="list-disc pl-5 space-y-1 text-slate-600">
                            <li>2.8x higher engagement rate than formal academic posts</li>
                            <li>Strongest performance on Instagram and YouTube</li>
                            <li>High correlation with prospective student inquiries</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Research Highlights Section */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <FileBarChart className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-slate-900 mb-2">Research Impact Analysis</h4>
                      <div className="space-y-4">
                        <p className="text-slate-600">Combined analysis of research-related content across categories reveals:</p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Research content generates highest engagement from alumni</li>
                          <li>Cross-category impact on Academic Excellence and Faculty profiles</li>
                          <li>Strong correlation with institutional reputation metrics</li>
                        </ul>
                        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <p className="text-purple-700 font-medium mb-2">Key Recommendations:</p>
                          <ul className="list-disc pl-5 space-y-1 text-slate-600">
                            <li>Increase research highlight frequency in social media</li>
                            <li>Develop dedicated research spotlight series</li>
                            <li>Enhanced integration with faculty achievements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategic Insights */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="text-lg font-light text-slate-900 mb-4">Strategic Content Distribution Insights</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="text-slate-900 font-medium">Strengths:</p>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Leading in academic excellence content (30%)</li>
                        <li>Strong balance between academic and student life</li>
                        <li>Effective research communication strategy</li>
                        <li>Consistent event coverage maintaining community engagement</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="text-slate-900 font-medium">Opportunities:</p>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Increase student life content to match peer benchmarks</li>
                        <li>Enhance athletics coverage while maintaining academic focus</li>
                        <li>Expand research highlights across channels</li>
                        <li>Develop more integrated multi-category content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Research Analysis Modal - Dinámico por Categoría */}
      {showAnalysis && categoryAnalysis[showAnalysis] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl h-[80vh] mx-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <FileBarChart className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                    {categoryAnalysis[showAnalysis].title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{categoryAnalysis[showAnalysis].subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAnalysis(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 scrollbar-custom">
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-300 dark:border-blue-500/30">
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-6">Key Numbers</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categoryAnalysis[showAnalysis].metrics.map((metric, idx) => (
                      <div key={idx} className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 rounded-lg">
                        <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Methodology Section */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-blue-300 mb-4">Research Methodology</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {categoryAnalysis[showAnalysis].methodology}
                  </p>
                </div>

                {/* Data Sources Section */}
                <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-6 border border-blue-200 dark:border-blue-500/30">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-blue-300 mb-4">Data Sources & Verification</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-sm">
                    {categoryAnalysis[showAnalysis].sources}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Changelog Modal */}
      {showChangelog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <FileBarChart className="w-5 h-5 text-slate-900 dark:text-slate-100" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-light text-slate-900 dark:text-slate-100 tracking-tight truncate">Platform Update v2.5</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">New Features - Visual Analytics & AI Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangelog(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 max-h-[70vh] overflow-y-auto">
              {/* Stats Update */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Latest Update - October 2025</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded">
                    <div className="text-2xl font-light text-slate-900 dark:text-slate-100">10+</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Interactive Charts</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded">
                    <div className="text-2xl font-light text-slate-900 dark:text-slate-100">100%</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Real Data Visualized</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded">
                    <div className="text-2xl font-light text-slate-900 dark:text-slate-100">AI</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Einstein Assistant</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded">
                    <div className="text-2xl font-light text-slate-900 dark:text-slate-100">2025</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Updated Year</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Visual Analytics */}
                  <div className="p-4 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 text-sm">Interactive Visual Analytics</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                          New visual insights section with 10+ interactive charts using real Instagram data.
                          Includes platform performance comparison, follower analysis, engagement by tone, posting schedule,
                          sentiment analysis, and top hashtags. All data sourced from verified research and live analytics.
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            10+ charts
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            Real-time data
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            Recharts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Einstein AI Assistant */}
                  <div className="p-4 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 text-sm">Einstein AI - Research Assistant</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                          New floating chatbot powered by knowledge base with 10+ research topics.
                          Ask about Instagram performance, TikTok opportunities, engagement strategies, competitors,
                          email marketing, digital ads, website analysis, and more. Instant responses with verified data.
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            AI powered
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            10+ topics
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            Floating chat
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UI/UX Improvements */}
                  <div className="p-4 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <FileBarChart className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 text-sm">Enhanced Minimalist Design</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                          Complete UI overhaul with minimalist design principles. Background pattern decoration,
                          simplified category titles, professional iconography, Instagram profile showcase,
                          informational modals with React Portal, and updated copyright year to 2025.
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            Minimalist
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            Year 2025
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            React Portal
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Digital Ads Expansion */}
                  <div className="p-4 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 text-sm">Digital Ads PDF Expanded - Now 20 Pages</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                          Digital Ads analysis expanded from 10 to 20 pages with full Meta Ads verification,
                          YouTube multi-channel strategy, Press Releases 2024-2025, WSJ verified rates ($210K-$354K), Faculty With Impact campaign,
                          and Rise Up fundraising ($520M raised toward $613M goal). ~95% verified data.
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            20 pages
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            95% verified
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                            WSJ + Meta + YT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Coverage */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3 text-sm">Data Verification Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded">
                    <span className="text-slate-700 dark:text-slate-300">Social Media (100% verified)</span>
                    <span className="text-slate-500 dark:text-slate-400">15K IG + engagement data</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded">
                    <span className="text-slate-700 dark:text-slate-300">Digital Ads (~95% verified)</span>
                    <span className="text-slate-500 dark:text-slate-400">21 Meta Ads + YouTube + Press</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded">
                    <span className="text-slate-700 dark:text-slate-300">Email Marketing (~85% verified)</span>
                    <span className="text-slate-500 dark:text-slate-400">70K alumni + real contacts</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded">
                    <span className="text-slate-700 dark:text-slate-300">Website Analysis (100% verified)</span>
                    <span className="text-slate-500 dark:text-slate-400">Direct WebFetch analysis</span>
                  </div>
                </div>
              </div>

              {/* Researcher Info */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Research by</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Angel Ramirez</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Research Partner</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Stephany Nayz - Yeshiva University</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4">
              <button
                onClick={() => setShowChangelog(false)}
                className="w-full py-2.5 sm:py-3 rounded bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-medium transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Einstein AI Chatbot */}
      <EinsteinAI />
    </div>
  )
}

export default App
