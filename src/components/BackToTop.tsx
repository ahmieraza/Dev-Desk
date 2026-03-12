import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-2.5 md:p-3 rounded-full gradient-gold text-primary-foreground shadow-lg hover:opacity-90 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
