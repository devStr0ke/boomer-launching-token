'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Create a type for our popup
type Popup = {
  id: number;
  message: string;
  position: { x: number; y: number };
  type: 'claim' | 'verify' | 'regular';  // Add different types of popups
};

const popupMessages: { message: string; type: 'claim' | 'verify' | 'regular' }[] = [
  {
    message: "🎉 You won 1 Solana! Click here to claim now!",
    type: "claim"
  },
  {
    message: "⚠️ Critical Error: System32 needs verification",
    type: "verify"
  },
  {
    message: "⚠️ Fatal Exception 0xC000021A",
    type: "regular"
  },
  {
    message: "🚨 System32.dll not found",
    type: "regular"
  },
  {
    message: "⚠️ Memory allocation failed at 0x00000000",
    type: "regular"
  },
  {
    message: "🛑 Stack overflow at address 0xDEADBEEF",
    type: "regular"
  },
  {
    message: "⚠️ Unexpected error occurred while displaying error",
    type: "regular"
  },
  {
    message: "🚨 Critical process died",
    type: "regular"
  }
];

export default function Home() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [audio] = useState(typeof window !== 'undefined' ? new Audio('/erro-2.mp3') : null);

  const createPopup = (x: number, y: number) => {
    const messageObj = popupMessages[Math.floor(Math.random() * popupMessages.length)];
    const newPopup: Popup = {
      id: Math.random(),
      message: messageObj.message,
      position: { x, y },
      type: messageObj.type
    };
    setPopups(prev => [...prev, newPopup]);
  };

  const spawnManyPopups = () => {
    // Create multiple spawn points across the screen
    const numSpawnPoints = 5; // Number of different starting points for cascades
    
    for (let sp = 0; sp < numSpawnPoints; sp++) {
      // Random starting point for each cascade
      const startX = Math.random() * (window.innerWidth - 500);
      const startY = Math.random() * (window.innerHeight - 400);
      const baseSpacing = 30;
      const numPopups = 8; // popups per cascade
      
      for (let i = 0; i < numPopups; i++) {
        setTimeout(() => {
          createPopup(
            startX + (i * baseSpacing), 
            startY + (i * baseSpacing)
          );
          // Play sound for each popup
          if (audio) {
            // Clone the audio for overlapping sounds
            const audioClone = audio.cloneNode() as HTMLAudioElement;
            audioClone.play();
          }
        }, (sp * 200) + (i * 50)); // Stagger the cascades
      }
    }
  
    // Also spawn completely random ones
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const x = Math.random() * (window.innerWidth - 300);
          const y = Math.random() * (window.innerHeight - 200);
          createPopup(x, y);
          // Play sound for random popups too
          if (audio) {
            const audioClone = audio.cloneNode() as HTMLAudioElement;
            audioClone.play();
          }
        }, i * 50);
      }
    }, 1000);
  };

  const handlePopupAction = (e: React.MouseEvent, popup: Popup, action: 'close' | 'claim') => {
    e.preventDefault();
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  
    if (action === 'close') {
      // Regular close behavior - spawn 2 new popups
      setPopups(prev => prev.filter(p => p.id !== popup.id));
      for (let i = 0; i < 2; i++) {
        const x = Math.random() * (window.innerWidth - 300);
        const y = Math.random() * (window.innerHeight - 200);
        createPopup(x, y);
      }
    } else if (action === 'claim') {
      // Don't close current popup, spawn multiple waves of chaos
      spawnManyPopups();
      // Spawn additional waves with delays
      setTimeout(spawnManyPopups, 1500);
      setTimeout(spawnManyPopups, 3000);
    }
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
          <div className="bg-gradient-to-r from-[#0058e6] to-[#3d91ff] p-2 flex justify-between items-center rounded-t-lg cursor-move">
            <span className="text-white text-sm select-none">System Message</span>
            <button
              onClick={(e) => handlePopupAction(e, popup, 'close')}
              className="text-white hover:bg-red-500 px-2"
            >
              X
            </button>
          </div>
          <div className="p-4 text-center">
            <p className="text-black font-system text-sm">⚠️ {popup.message}</p>
            {popup.type === 'claim' ? (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={(e) => handlePopupAction(e, popup, 'claim')}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Claim Now!
                </button>
                <button
                  onClick={(e) => handlePopupAction(e, popup, 'close')}
                  className="bg-[#ECE9D8] border border-gray-400 px-4 py-1 rounded text-black hover:bg-[#e1ddc9]"
                >
                  Close
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => handlePopupAction(e, popup, 'close')}
                className="mt-4 bg-[#ECE9D8] border border-gray-400 px-4 py-1 rounded text-black hover:bg-[#e1ddc9]"
              >
                OK
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}