import { useState } from 'react';
import { triggerFireworks } from './Fireworks';

export default function ShareBox() {
  const [newName, setNewName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('name', newName);
    const finalUrl = url.toString();
    
    setGeneratedLink(finalUrl);
    triggerFireworks(); // Visual feedback for generation
  };

  const shareToWhatsApp = () => {
    const text = `✨ ${newName} sent you a New Year Surprise! Check it out here: ${generatedLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="mt-12 p-6 bg-gray-900/50 rounded-2xl w-full max-w-sm mx-auto shadow-2xl border border-pink-500/30">
      <h2 className="text-white font-semibold mb-4 text-center">Create Your Own Website & Share:</h2>
      <form onSubmit={handleGenerate} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter your name"
          className="p-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:border-pink-500 transition-all"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <button className="bg-linear-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:scale-105 active:scale-95 transition-transform">
          Generate Wish Link
        </button>
      </form>

      {generatedLink && (
        <div className="mt-6 space-y-3 animate-in fade-in zoom-in duration-300">
          <p className="text-xs text-pink-300 break-all bg-black/30 p-2 rounded border border-pink-500/20">
            {generatedLink}
          </p>
          <button 
            onClick={shareToWhatsApp}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
          >
            <span>Share on WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  );
}