import { useState, useEffect } from 'react';
import { Youtube, ArrowLeft, ArrowRight } from 'lucide-react';

function SeoTipsSlider() {
    const seoTips = [
        "Use engaging thumbnails to attract clicks.",
        "Optimize video titles with relevant keywords.",
        "Add timestamps for better viewer navigation.",
        "Include closed captions for accessibility.",
        "Share your video on social media platforms.",
        "Use descriptive and keyword-rich tags.",
        "Create custom thumbnails with bold text and relevant imagery.",
        "Ensure your video description is clear, detailed, and keyword-optimized.",
        "Encourage viewers to like, comment, and subscribe to boost engagement.",
        "Use end screens and cards to promote related content.",
        "Post consistent content to keep your audience engaged and grow your channel.",
        "Focus on watch time as it significantly impacts ranking.",
        "Include your target keywords in the first 25 words of your description.",
        "Use high-quality audio and video for better user experience and retention.",
        "Add your video to relevant playlists to increase visibility.",
        "Embed your YouTube videos on your website or blog for more views.",
        "Collaborate with other creators in your niche to increase exposure.",
        "Optimize your video file name with target keywords before uploading.",
        "Use a compelling call-to-action (CTA) in your video and description.",
        "Respond to comments to increase engagement and build community."
    ];

    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentTipIndex((prevIndex) => (prevIndex + 1) % seoTips.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isPaused, seoTips.length]);

    const goToPrevious = () => {
        setCurrentTipIndex((prevIndex) =>
            prevIndex === 0 ? seoTips.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentTipIndex((prevIndex) =>
            (prevIndex + 1) % seoTips.length
        );
    };

    return (
        <div
            className="relative border border-slate-200 p-1 rounded-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >

            <div className="flex items-center justify-between space-x-2 pl-7">
                <button
                    onClick={goToPrevious}
                    className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Previous tip"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                </button>

                <div className="flex-1">
                    <div className="relative h-8 flex items-center justify-center">
                        <p
                            className="text-sm text-slate-700 text-center font-medium px-2 transition-opacity duration-200"
                            key={currentTipIndex}
                        >
                            {seoTips[currentTipIndex]}
                        </p>
                    </div>
                </div>

                <button
                    onClick={goToNext}
                    className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Next tip"
                >
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>
            </div>

            <div className="flex justify-center mt-1 space-x-1">
                {[...Array(3)].map((_, i) => {
                    const tipIndex = (currentTipIndex + i - 1 + seoTips.length) % seoTips.length;
                    return (
                        <div
                            key={tipIndex}
                            className={`h-1 rounded-full transition-all duration-200 ${i === 1 ? 'w-4 bg-blue-400' : 'w-1.5 bg-slate-200'
                                }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default SeoTipsSlider;