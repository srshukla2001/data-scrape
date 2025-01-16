'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    const videoUrl = e.target.videoUrl.value
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yt-backend-qe1s.onrender.com'
    const API_URL = `${BASE_URL}/api/analyze`

    try {
      try {
        const healthCheck = await fetch(`${BASE_URL}/api/health`, {
          signal: AbortSignal.timeout(5000),
          headers: {
            'Accept': 'application/json',
          },
        })

        if (!healthCheck.ok) {
          throw new Error('Server health check failed')
        }

        const healthData = await healthCheck.json()
        if (!healthData.status === 'ok') {
          throw new Error('Server is not ready')
        }
      } catch (err) {
        console.error('Server check failed:', err)
        throw new Error('Cannot connect to the analysis server. Please make sure the backend server is running and accessible')
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ url: videoUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to analyze video' }))
        throw new Error(errorData.detail || 'Failed to analyze video')
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err.message || 'An error occurred while analyzing the video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative w-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto">
            <div className="relative inline-block mb-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 tracking-tight leading-none">
                YouTube Video SEO Analyzer
              </h1>
              <div className="absolute -top-4 -right-8 sm:-top-6 sm:-right-10">
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg transform rotate-12 animate-pulse">
                  AI Powered
                </span>
              </div>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
              Harness the power of <span className="text-blue-700 font-semibold">Advanced AI</span> to optimize your video's SEO performance and reach
            </p>
          </div>

          {/* Main Content Container */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Form Section */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-300 hover:shadow-blue-200/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="videoUrl" className="block text-lg font-semibold text-slate-700 mb-3">
                    Enter YouTube Video URL
                  </label>
                  <div className="relative group">
                    <input
                      type="url"
                      id="videoUrl"
                      name="videoUrl"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-base sm:text-lg placeholder-slate-400 group-hover:border-blue-300"
                      required
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform ${isLoading
                      ? 'opacity-75 cursor-not-allowed'
                      : 'hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.01]'
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing Video...</span>
                    </div>
                  ) : (
                    'Analyze with AI'
                  )}
                </button>
              </form>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl animate-fade-in">
                <div className="flex items-center space-x-4">
                  <svg className="h-6 w-6 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 animate-fade-in space-y-8">
                <div className="border-b border-slate-200 pb-6">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                    Analysis Results
                  </h2>
                </div>

                {/* SEO Score */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-semibold text-slate-700">SEO Performance Score</h3>
                    <span className={`text-3xl sm:text-4xl font-bold ${analysis.seo_score >= 80 ? 'text-emerald-600' :
                        analysis.seo_score >= 60 ? 'text-amber-600' :
                          'text-red-600'
                      }`}>
                      {analysis.seo_score}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${analysis.seo_score >= 80 ? 'bg-emerald-500' :
                          analysis.seo_score >= 60 ? 'bg-amber-500' :
                            'bg-red-500'
                        }`}
                      style={{ width: `${analysis.seo_score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Video Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Title</h3>
                    <p className="text-xl text-slate-900 font-medium line-clamp-2">{analysis.title}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Views</h3>
                      <p className="text-xl text-slate-900 font-medium">{analysis.views.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Length</h3>
                      <p className="text-xl text-slate-900 font-medium">
                        {Math.floor(analysis.length / 60)}:{(analysis.length % 60).toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Description</h3>
                  <p className="text-slate-700 whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto">
                    {analysis.description}
                  </p>
                </div>

                {/* Keywords */}
                {analysis.keywords && analysis.keywords.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Target Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 transition-all duration-200 hover:bg-blue-200"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gemini AI Analysis */}
                {analysis.gemini_analysis && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">AI-Powered SEO Insights</h3>
                    <div className="prose prose-slate prose-lg max-w-none">
                      <ReactMarkdown className="text-slate-700 whitespace-pre-wrap">
                        {analysis.gemini_analysis}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Transcript Status */}
                <div className="flex justify-end">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${analysis.has_transcript
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                    {analysis.has_transcript ? '✓ Transcript Available' : '⚠ No Transcript Found'}
                  </span>
                </div>
              </div>
            )}

            {/* Features Section */}
            {!analysis && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    title: "AI-Powered Analysis",
                    description: "Get deep insights into your video's SEO performance using advanced AI algorithms",
                    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
                  },
                {
                  title: 'Smart Metrics',
                description: 'Track and analyze key engagement metrics to optimize your content strategy',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  },
                {
                  title: 'Competitor Insights',
                description: 'Understand how your content stacks up against competitors in your niche',
                icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  }
                ].map((feature, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="text-blue-600 mb-6 transform transition-transform group-hover:scale-110">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}