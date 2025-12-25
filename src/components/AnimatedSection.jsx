import { useEffect, useRef, useState } from "react";
import { triggerFireworks } from "./Fireworks";

export default function AnimatedSection({
  children,
  fireOnReveal = false,
  id,
  centerOnLoad = false,
  stackIndex = 0,
}) {
  const ref = useRef(null);
  const [hasTriggeredFireworks, setHasTriggeredFireworks] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPage2Visible, setIsPage2Visible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section has entered viewport (slide in from bottom)
      if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
        setIsVisible(true);
      }

      // Check if Page2 is entering viewport
      const page2Element = document.getElementById('page2');
      if (page2Element) {
        const page2Rect = page2Element.getBoundingClientRect();
        // Page2 is entering when its top is within viewport
        setIsPage2Visible(page2Rect.top < windowHeight);
      }

      // Fireworks trigger - when section is centered in viewport
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      if (
        fireOnReveal &&
        !hasTriggeredFireworks &&
        Math.abs(sectionCenter - viewportCenter) < 100
      ) {
        triggerFireworks();
        setHasTriggeredFireworks(true);
      }

      // Reset trigger when section is completely out of view
      if (rect.bottom < 0 || rect.top > windowHeight) {
        setHasTriggeredFireworks(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fireOnReveal, hasTriggeredFireworks]);

  return (
    <section
      ref={ref}
      id={id}
      className={`sticky top-0
        ${centerOnLoad ? "h-screen flex items-center justify-center" : "flex items-start"}
        px-4 sm:px-6 md:px-8
      `}
      style={{
     top: `${stackIndex * 96}px`,
      }}
      >
      <div 
        className={`
          w-full max-w-2xl mx-auto transition-all duration-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
          ${isPage2Visible ? 'opacity-0 scale-95' : ''}
        `}
        style={{
         transform: isVisible
         ? `translateY(${stackIndex * -12}px)`
         : "translateY(40px)",
         }}
        >
        {children}
      </div>
    </section>
  );
}