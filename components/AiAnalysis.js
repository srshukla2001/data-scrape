import React from 'react'

const AiAnalysis = ({ analysis, renderContent }) => {
    return (
        <>
            {analysis.gemini_analysis && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-3 border border-indigo-200 shadow-md space-y-8">
                    <h3 className="text-3xl font-semibold text-slate-900 mb-6 text-center">AI-Powered SEO Insights</h3>
                    <div className="space-y-6">
                        {Object.entries(analysis.gemini_analysis).map(([section, content], index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-indigo-100">
                                <h4 className="text-xl font-medium text-indigo-800 mb-4 capitalize">{section.replace(/_/g, ' ')}</h4>
                                <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap">
                                    {renderContent(content)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default AiAnalysis