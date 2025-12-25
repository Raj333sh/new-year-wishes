// Alternative AnimatedSection.jsx - Simplified version
import { useEffect, useRef, useState } from "react";
import { triggerFireworks } from "./Fireworks";

export default function AnimatedSection({
  children,
  fireOnReveal = false,
  id,
  stickToPrevious = null
}) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [hasTriggeredFireworks, setHasTriggeredFireworks] = useState(false);
  const [stickyTop, setStickyTop] = useState(0);
  const [isPage2Visible, setIsPage2Visible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if Page2 is visible (detect when it enters viewport)
      const page2Element = document.querySelector('[data-page2="true"]');
      if (page2Element) {
        const page2Rect = page2Element.getBoundingClientRect();
        // When Page2 enters viewport (top is less than window height)
        const page2IsVisible = page2Rect.top < windowHeight && page2Rect.bottom > 0;
        setIsPage2Visible(page2IsVisible);
      }

      // Check for fireworks trigger
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      if (fireOnReveal && !hasTriggeredFireworks && 
          Math.abs(sectionCenter - viewportCenter) < 50) {
        triggerFireworks();
        setHasTriggeredFireworks(true);
      }

      // Only apply sticky logic if Page2 is NOT visible
      if (!isPage2Visible) {
      // Simple sticky logic
      if (stickToPrevious) {
        const previousSection = document.getElementById(stickToPrevious);
        if (previousSection) {
          const prevRect = previousSection.getBoundingClientRect();
          
          // Start sticking when we reach the previous section's bottom
          if (rect.top <= Math.max(prevRect.bottom, 0)) {
            setIsActive(true);
            
            // Calculate top position based on previous sections
            let topPosition = 0;
            const sections = ['wish-sender', 'wish-card', 'quote-box'];
            const currentIndex = sections.indexOf(id);
            
            if (currentIndex > 0) {
              for (let i = 0; i < currentIndex; i++) {
                const prevId = sections[i];
                const prevElement = document.querySelector(`[data-sticky-id="${prevId}"]`);
                if (prevElement) {
                  const prevStickyRect = prevElement.getBoundingClientRect();
                  if (prevStickyRect.height > 0) {
                    topPosition += prevStickyRect.height;
                  }
                }
              }
            }
            
            setStickyTop(topPosition);
          } else {
            setIsActive(false);
          }
        }
      } else {
        // First section sticks to top
        setIsActive(rect.top <= 0);
      }

      if (rect.bottom < 0 || rect.top > windowHeight) {
        setHasTriggeredFireworks(false);
      }
    }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fireOnReveal, hasTriggeredFireworks, stickToPrevious, id]);

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div
        data-sticky-id={id}
        className={`
          w-full max-w-2xl mx-auto transition-all duration-500
          ${isActive && !isPage2Visible ? 'fixed left-1/2 -translate-x-1/2 z-10' : 'relative'}
          ${isPage2Visible ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
        `}
        style={{
          top: isActive && !isPage2Visible ? `${stickyTop}px` : 'auto',
        }}
      >
        {children}
      </div>
    </section>
  );
}