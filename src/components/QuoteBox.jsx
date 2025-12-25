import { useState, useEffect } from "react";
import { localQuotes } from "../data/newYearQuotes";

export default function QuoteBox() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);

      // 1️⃣ Define quote sources
      const sources = [
        {
          type: "api",
          fetcher: async () => {
            const res = await fetch("https://api.quotable.io/random");
            if (!res.ok) throw new Error();
            const data = await res.json();
            return data.content;
          },
        },
        {/*
          type: "api",
          fetcher: async () => {
            const res = await fetch("https://zenquotes.io/api/random");
            if (!res.ok) throw new Error();
            const data = await res.json();
            return data[0].q;
          },
        */},
        {
          type: "local",
          fetcher: async () => {
            return localQuotes[Math.floor(Math.random() * localQuotes.length)];
          },
        },
      ];

      // 2️⃣ Pick one source equally
      const selectedSource =
        sources[Math.floor(Math.random() * sources.length)];

      try {
        const quoteText = await selectedSource.fetcher();
        setQuote(quoteText);
      } catch{
        // 3️⃣ Final fallback (always safe)
        setQuote(localQuotes[Math.floor(Math.random() * localQuotes.length)]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        loading ? "opacity-0" : "opacity-100"
      } 
      max-w-md mx-auto p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 italic text-center text-gray-200`}
    >
      "{quote}"
    </div>
  );
}
