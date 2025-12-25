import React, { useEffect, useRef, useState } from "react";
import { triggerFireworks } from "./components/Fireworks";
import bgMain from "./assets/Gemini_Generated_Image_9fhkij9fhkij9fhk.png";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

const App = () => {
  const [senderName, setSenderName] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Read name from URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) setSenderName(name);

    // Fireworks on load
    triggerFireworks();

    // 🌊 Scroll tracking
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* 🌄 FIXED BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 bg-repeat-y bg-top"
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundSize: "100% auto",
        }}
      >
        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>

      {/* CONTENT */}
      <Page1 senderName={senderName} />
      <Page2 />
    </div>
  );
};

export default App;