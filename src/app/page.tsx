'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Create a type for our popup
type Popup = {
  id: number;
  message: string;
  position: { x: number; y: number };
};

const popupMessages = [
  "🎉 You won 1 Solana! Click here to claim now!",
  "⚠️ Your $BIGS tokens need urgent verification!",
  "💰 Congratulations! You're the 1,000,000th visitor!",
  "🚨 Warning: Your Windows XP needs an update",
  "💸 Double your $BIGS instantly! Click here!",
  "🎮 You have won a rare Crypto Monkey NFT!",
];

export default function Home() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [audio] = useState(typeof window !== 'undefined' ? new Audio('/erro-2.mp3') : null);

  const createPopup = (x: number, y: number) => {
    const newPopup: Popup = {
      id: Math.random(),
      message: popupMessages[Math.floor(Math.random() * popupMessages.length)],
      position: { x, y },
    };
    setPopups(prev => [...prev, newPopup]);
  };

  const handlePopupClick = (e: React.MouseEvent, popup: Popup) => {
    e.preventDefault();
    // Play the sound
    if (audio) {
      audio.currentTime = 0; // Reset sound to start
      audio.play();
    }
    
    // Remove clicked popup
    setPopups(prev => prev.filter(p => p.id !== popup.id));
    // Create 2 new popups at random positions
    for (let i = 0; i < 2; i++) {
      const x = Math.random() * (window.innerWidth - 300);
      const y = Math.random() * (window.innerHeight - 200);
      createPopup(x, y);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/xp-background.jpg')" }}
    >
      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">$BIGS</h1>
        <p className="text-2xl text-white mb-8">Boomer Is Getting Scammed</p>
        <button
          onClick={() => createPopup(window.innerWidth/2, window.innerHeight/2)}
          className="bg-[#0058e6] text-white px-8 py-4 rounded-lg hover:bg-[#0046b8]"
        >
          Buy $BIGS Now!
        </button>
      </main>

      {/* Popups */}
      {popups.map(popup => (
        <motion.div
          key={popup.id}
          drag
          dragMomentum={false}
          className="fixed bg-[#ECE9D8] border-2 border-[#0058e6] rounded-t-lg w-[300px]"
          style={{
            left: popup.position.x,
            top: popup.position.y,
          }}
        >
          <div className="bg-gradient-to-r from-[#0058e6] to-[#3d91ff] p-2 flex justify-between items-center rounded-t-lg cursor-pointer">
            <span className="text-white text-sm select-none">System Message</span>
            <button
              onClick={(e) => handlePopupClick(e, popup)}
              className="text-white hover:bg-red-500 px-2"
            >
              X
            </button>
          </div>
          <div className="p-4 text-center">
            <p className="text-black font-system text-sm">⚠️ {popup.message}</p>
            <button
              onClick={(e) => handlePopupClick(e, popup)}
              className="mt-4 bg-[#ECE9D8] border border-gray-400 px-4 py-1 rounded text-black hover:bg-[#e1ddc9]"
            >
              OK
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}