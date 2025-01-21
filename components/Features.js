import React from 'react'

const Features = ({ analysis }) => {
    return (
        <>
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
        </>
    )
}

export default Features