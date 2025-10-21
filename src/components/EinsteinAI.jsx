import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

const EinsteinAI = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m Einstein AI, your research assistant. I can help you understand the Yeshiva University marketing research. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Knowledge base basada en la investigación real
  const knowledgeBase = {
    'instagram': {
      keywords: ['instagram', 'ig', 'followers', 'engagement', 'social media'],
      response: 'Instagram Analysis: YU currently has 15.4K followers with a 1.5% engagement rate, below the 2.99% industry benchmark. The optimal posting time is Monday at 5 PM. Student voice content generates 4.12% engagement, 2.8x higher than formal institutional posts.'
    },
    'tiktok': {
      keywords: ['tiktok', 'video', 'short form'],
      response: 'TikTok Opportunity: Currently YU has no TikTok presence. Industry benchmark shows 4.80% engagement rate - the highest among all platforms. This represents a critical growth opportunity with potential 2.28% weekly growth rate.'
    },
    'engagement': {
      keywords: ['engagement', 'rate', 'performance', 'metrics'],
      response: 'Engagement Analysis: Informal/conversational content generates 3.45% engagement vs 1.23% for formal posts. Student voice content performs best at 4.12%. Instagram Reels achieve 1.99% engagement, while static posts only reach 0.80%.'
    },
    'competitors': {
      keywords: ['competitor', 'comparison', 'brandeis', 'nyu', 'columbia'],
      response: 'Competitive Landscape: NYU leads with 593K Instagram followers, Columbia has 457K, Rutgers 124K, Brandeis 25K (closest peer), and YU has 15K. This shows significant growth opportunity in the market.'
    },
    'recommendations': {
      keywords: ['recommend', 'strategy', 'advice', 'what should', 'how to'],
      response: 'Key Recommendations: 1) Launch TikTok presence immediately (30-day timeline), 2) Increase Instagram Reels production, 3) Adopt informal/student voice tone, 4) Post Monday at 5 PM for peak engagement, 5) Focus on visual storytelling over formal announcements.'
    },
    'email': {
      keywords: ['email', 'newsletter', 'alumni', 'marketing email'],
      response: 'Email Marketing: YU reaches 70,000+ alumni through newsletters including "The View from YU" and school-specific communications. Segmentation includes donors, prospective students, and alumni networks.'
    },
    'digital ads': {
      keywords: ['ads', 'advertising', 'meta ads', 'facebook ads', 'campaigns'],
      response: 'Digital Ads: 21 active Meta Ads campaigns verified (Oct 2025). 81% focus on graduate recruitment, 10% on Israel advocacy. Campaigns include Azrieli Graduate (11 ads), Revel (6 ads), Israel Advocacy (2 ads), and Fish Center (2 ads).'
    },
    'website': {
      keywords: ['website', 'web', 'homepage', 'yu.edu'],
      response: 'Website Analysis: 100% verified data through direct analysis. Key findings: 97% employment rate, 92% medical school acceptance rate. Critical issue: incomplete headline "a place to" on admissions page needs immediate attention. Features 5 Hebrew values: Emet, Adam, Chaim, Chesed, Tzion.'
    },
    'youtube': {
      keywords: ['youtube', 'video content', 'channel'],
      response: 'YouTube Presence: 3 official channels - @YeshivaUniversity (5.81K subs, 1K videos, Maccabeats White House 214K views), Y-Studs A Cappella (36K+ subs, 10M+ views), and Innovation Lab. Combined reach: 70,000+ followers.'
    },
    'data': {
      keywords: ['data', 'verified', 'source', 'methodology', 'research'],
      response: 'Research Methodology: ~95% of data is verified from real sources including Meta Ads Library, direct website analysis (WebFetch), Instagram analytics, and official press releases. All findings include exact URLs and access dates (Oct 2025).'
    }
  }

  const findResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    // Buscar coincidencias en la base de conocimiento
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        return data.response
      }
    }

    // Respuesta por defecto
    return 'I can help you with information about: Instagram performance, TikTok opportunities, engagement strategies, competitor analysis, email marketing, digital ads, website analysis, YouTube channels, and research methodology. What would you like to know?'
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Agregar mensaje del usuario
    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])

    // Simular "typing" y responder
    setTimeout(() => {
      const botResponse = { type: 'bot', text: findResponse(input) }
      setMessages(prev => [...prev, botResponse])
    }, 500)

    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
        >
          <Sparkles className="w-6 h-6 text-white dark:text-slate-900 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-slate-900 dark:bg-slate-800 px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-slate-900 dark:text-slate-100" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white dark:text-slate-100">Einstein AI</h3>
                <p className="text-xs text-slate-300 dark:text-slate-400">Research Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-slate-800 dark:hover:bg-slate-700 rounded transition"
            >
              <X className="w-5 h-5 text-white dark:text-slate-100" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 dark:border-slate-800 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the research..."
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
              >
                <Send className="w-5 h-5 text-white dark:text-slate-900" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EinsteinAI
