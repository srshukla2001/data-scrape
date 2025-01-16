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
    const BASE_URL = 'http://192.168.1.16:8000'
    const API_URL = `${BASE_URL}/api/analyze`

    try {
      // Check if server is running with timeout
      try {
        const healthCheck = await fetch(`${BASE_URL}/api/health`, {
          signal: AbortSignal.timeout(5000), // 5 second timeout
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
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 relative inline-block">
            <span className="absolute -top-6 -right-6 text-2xl text-blue-500 font-bold bg-white px-2 py-1 rounded-full shadow-lg transform rotate-12 border-2 border-blue-500">
              AI
            </span>
            YouTube Video SEO Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Harness the power of <span className="font-semibold text-blue-600">Artificial Intelligence</span> to optimize your YouTube video's SEO performance
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div>
              <label
                htmlFor="videoUrl"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                YouTube Video URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-5 py-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg transition-all duration-200 font-semibold text-lg relative overflow-hidden ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105 transform'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  <span className="opacity-0">Analyze with AI</span>
                </>
              ) : (
                'Analyze with AI'
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>

            {/* SEO Score */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">SEO Score</h3>
                <span className={`text-2xl font-bold ${analysis.seo_score >= 80 ? 'text-green-600' :
                    analysis.seo_score >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                  }`}>
                  {analysis.seo_score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${analysis.seo_score >= 80 ? 'bg-green-600' :
                      analysis.seo_score >= 60 ? 'bg-yellow-600' :
                        'bg-red-600'
                    }`}
                  style={{ width: `${analysis.seo_score}%` }}
                ></div>
              </div>
            </div>

            {/* Video Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1 text-lg text-gray-900">{analysis.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Views</h3>
                  <p className="mt-1 text-lg text-gray-900">{analysis.views.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Length</h3>
                  <p className="mt-1 text-lg text-gray-900">{Math.floor(analysis.length / 60)}:{(analysis.length % 60).toString().padStart(2, '0')}</p>
                </div>
              </div>

              <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap break-words leading-relaxed">
                  {analysis.description}
                </p>
              </div>



              {analysis.keywords && analysis.keywords.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Keywords</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {analysis.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gemini AI Analysis */}
              {analysis.gemini_analysis && (
                <div className="mt-8 border-t pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered SEO Analysis</h3>
                  <div className="prose prose-slate prose-lg max-w-none">
                    {/* Render Gemini analysis with markdown styling */}
                    <ReactMarkdown className="text-gray-700 whitespace-pre-wrap">
                      {analysis.gemini_analysis}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Transcript Status */}
              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${analysis.has_transcript
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {analysis.has_transcript ? '✓ Transcript Available' : '⚠ No Transcript Found'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!analysis && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI-Powered Keyword Analysis', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { title: 'Smart Engagement Metrics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { title: 'AI-Driven Competitor Insights', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform">
                <div className="text-blue-600 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">Leverage AI to {feature.title.toLowerCase()} and optimize your video content.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

