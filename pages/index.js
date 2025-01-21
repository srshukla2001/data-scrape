'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import { Analytics } from "@vercel/analytics/react"
import Header from '@/components/Header';
import Features from '@/components/Features';
import AiAnalysis from '@/components/AiAnalysis';
import VideoDetails from '@/components/VideoDetails';
import SeoTipsSlider from '@/components/SeoTipsSlider';
export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)
  const [currentWaitIndex, setCurrentWaitIndex] = useState(0);

  // const seoTips = [
  //   "Hang tight! | Tip: Use engaging thumbnails to attract clicks.",
  //   "Almost there! | Optimize video titles with relevant keywords.",
  //   "Processing magic! | Add timestamps for better viewer navigation.",
  //   "Just a moment! | Include closed captions for accessibility.",
  //   "Crunching data! | Share your video on social media platforms.",
  //   "Stay tuned! | Use descriptive and keyword-rich tags."
  // ];
  const waitTexts = [
    "Hang tight!",
    "Almost there!",
    "Processing magic!",
    "Just a moment!",
    "Crunching data!",
    "Stay tuned!"
  ];

  useEffect(() => {
    if (isLoading) {
      const tipInterval = setInterval(() => {
        setCurrentWaitIndex((prevIndex) => (prevIndex + 1) % waitTexts.length);
      }, 4000); // Rotate tips every 3 seconds

      return () => clearInterval(tipInterval); // Cleanup interval on component unmount
    }
  }, [isLoading, waitTexts.length]);
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

      const data = await response.json();
      console.log(data)
      // Clean the gemini_analysis field
      if (data.gemini_analysis) {
        const cleanedAnalysis = data.gemini_analysis
          .replace(/```json/, '') // Remove the starting ```json
          .replace(/```/, '');    // Remove the ending ```

        data.gemini_analysis = JSON.parse(cleanedAnalysis); // Update the field with cleaned content
      }

      setAnalysis(data);
      console.log(data);

    } catch (err) {
      console.error('Analysis error:', err)
      setError(err.message || 'An error occurred while analyzing the video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return content.map((item, i) => (
        <div key={i} className="mb-3">
          <span className="text-slate-900 font-medium text-lg">- {item}</span>
        </div>
      ));
    } else if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value], idx) => (
            <div key={idx} className="space-y-2">
              <div className="font-semibold text-indigo-600 text-lg capitalize">{key.replace(/_/g, ' ')}</div>
              <div className="ml-4 text-slate-700 leading-relaxed text-base">
                {renderContent(value)} {/* Recursively render nested content */}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-slate-700 text-base">{content}</span>; // If it's a string or any other type, just display the content
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <div className="relative w-full">
        {/* Background Pattern */}
        <Analytics />
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto">
        <div className="mb-8">
        <SeoTipsSlider/>
        </div>
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
                      <span>{waitTexts[currentWaitIndex]}</span>
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
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-8 lg:p-10 animate-fade-in space-y-8">
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
                <VideoDetails analysis={analysis} />
                {/*AI Analysis */}
                <AiAnalysis analysis={analysis} renderContent={renderContent} />
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
            <Features analysis={analysis} />
          </div>
        </div>
      </div>
    </main>
  )
}