import React from 'react'
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import WishSender from "../components/WishSender";
import WishCard from "../components/Wishcard";
import QuoteBox from "../components/QuoteBox";
import { triggerFireworks } from "../components/Fireworks";
import bgMain from "../assets/Gemini_Generated_Image_9fhkij9fhkij9fhk.png";
import stars from "../assets/night_time_starry_sky_background_0611-removebg-preview.png";
import Page2 from "../pages/Page2"

const Page1 = () => {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);
  const [senderName, setSenderName] = useState("");
  const [bgOffset, setBgOffset] = useState(0);

  useEffect(() => {
    triggerFireworks();

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Read name from URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) setSenderName(name);

    // Fireworks on load
    triggerFireworks();

    // 🌊 Parallax scrolling (mobile safe)
    const handleScroll = () => {
      // Reduce effect on small screens
      const speed = window.innerWidth < 768 ? 0.15 : 0.35;
      setBgOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white overflow-y-auto scroll-smooth"
      style={{
        scrollSnapType: "y mandatory",
      }}
    >
      {/* 🎆 Main Background */}
      <div
        className="relative min-h-screen bg-repeat-y bg-top"
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundSize: "100% auto",
          backgroundPosition: `center ${-scrollY * 0.35}px`,
        }}
      >
        {/* 🌌 Stars Layer (slowest) 
        <div
          className="fixed inset-0 bg-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${stars})`,
            backgroundPosition: `center ${scrollY * 0.1}px`,
          }}
        /> */}
        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 " />

        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 space-y-24 scroll-smooth">
          <AnimatedSection id="wish-sender">
            <WishSender name={senderName} />
          </AnimatedSection>

          <AnimatedSection
            id="wish-card"
            stickToPrevious="wish-sender"
            fireOnReveal
          >
            <WishCard />
          </AnimatedSection>

          <AnimatedSection id="quote-box" stickToPrevious="wish-card">
            <QuoteBox />
          </AnimatedSection>

          {/* Add data-page2 attribute for detection */}
          <div data-page2="true">
            <Page2/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page1