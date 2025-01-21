import React from 'react'

const VideoDetails = ({ analysis }) => {
  return (
    <>
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
          {/* <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Length</h3>
                      <p className="text-xl text-slate-900 font-medium">
                        {Math.floor(analysis.length / 60)}:{(analysis.length % 60).toString().padStart(2, '0')}
                      </p>
                    </div> */}
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
    </>
  )
}

export default VideoDetails