import { X, Sparkles, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if banner was previously closed
    const bannerClosed = sessionStorage.getItem('topBannerClosed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
    }
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('topBannerClosed', 'true');
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-primary to-purple-600 text-white py-3 px-4 shadow-lg z-[100] animate-fade-in-down">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center justify-center gap-2 text-center">
            <Gift className="w-5 h-5 flex-shrink-0 animate-pulse hidden sm:block" />
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-base font-bold flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Limited Time Offer!
              </span>
              <span className="text-xs sm:text-sm font-medium">
                Get 20% OFF on all services this month
              </span>
              <Link 
                to="/pricing" 
                className="inline-flex items-center gap-1 px-3 py-1 bg-white text-primary rounded-full text-xs sm:text-sm font-bold hover:bg-yellow-100 transition-colors shadow-md mt-1 sm:mt-0"
              >
                View Pricing →
              </Link>
            </div>
            <Gift className="w-5 h-5 flex-shrink-0 animate-pulse hidden sm:block" />
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors group"
            aria-label="Close banner"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
