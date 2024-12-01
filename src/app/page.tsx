'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DesktopIcon from '@/components/DesktopIcon';
import TextWindow from '@/components/TextWindow';
import CmdWindow from "@/components/CmdWindow";

// Create a type for our popup
type Popup = {
  zIndex?: number;
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
  const [topZIndex, setTopZIndex] = useState(1000);
  const [isTextWindowOpen, setIsTextWindowOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  const handleBuyClick = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    createPopup(window.innerWidth/2, window.innerHeight/2);
  };

  const handleDragStart = (popupId: number) => {
    setTopZIndex(prev => prev + 1);
    setPopups(prev => prev.map(p => ({
      ...p,
      zIndex: p.id === popupId ? topZIndex : p.zIndex || 1000
    })));
  };

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

  const textContent = `Wallet seed phrases to remember if  I get Alzheimer (I'm not sure if I'm going to get Alzheimer, but I'm going to write them down anyway) : 
Retirement wallet : pencil nature travel focus ladder talent unique skate glance immense echo village
Mortgage wallet : anchor metal globe elite mango motion silent power velvet garden glove beyond
  `;

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/xp-background.jpg')" }}
    >
      {/* Desktop Icons */}
      <DesktopIcon
        name="SeedPhrases.txt"
        icon="/txt_windows_xp.png"
        onClick={() => setIsTextWindowOpen(true)}
        position={{ x: 20, y: 20 }}
        imageClassName="mb-[-15px]"
      />
      <DesktopIcon
        name="Command Prompt"
        icon="/cmd.png"
        onClick={() => setIsCmdOpen(true)}
        position={{ x: 20, y: 120 }}
        width={50}
        height={50}
      />
      {/* Text Window */}
      <TextWindow
        isOpen={isTextWindowOpen}
        onClose={() => setIsTextWindowOpen(false)}
        content={textContent}
        title="ReadME.txt"
      />
      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">$BIGS</h1>
        <p className="text-2xl text-white mb-8">Boomer Is Getting Scammed</p>
        <button
          onClick={handleBuyClick}
          className="bg-[#0058e6] text-white px-8 py-4 rounded-none hover:bg-[#0046b8]"
        >
          Buy $BIGS Now!
        </button>
      </main>
      {/* Cmd Window */}
      <CmdWindow
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
      />

      {/* Popups */}
      {popups.map(popup => (
        <motion.div
          key={popup.id}
          drag
          dragMomentum={false}
          onDragStart={() => handleDragStart(popup.id)}
          className="fixed bg-[#ECE9D8] border border-[#848484] shadow-[2px_2px_3px_rgba(0,0,0,0.25)] rounded-none w-[300px]"
          style={{
            left: popup.position.x,
            top: popup.position.y,
            zIndex: popup.zIndex || 1000
          }}
        >
          <div className="bg-gradient-to-r from-[#0054E3] via-[#0054E3] to-[#0054E3] p-1 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Image 
                src="/error.png" 
                alt="Warning" 
                width={16} 
                height={16} 
                className="mr-1"
              />
              <span className="text-white text-xs font-bold select-none">Windows</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={(e) => handlePopupAction(e, popup, 'close')}
                className="relative w-[20px] h-[20px] group"
              >
                <Image 
                  src="/close.png"
                  alt="Close"
                  width={20}
                  height={20}
                  className="absolute top-0 left-0 group-hover:hidden"
                />
                <Image 
                  src="/close_hover.png"
                  alt="Close"
                  width={20}
                  height={20}
                  className="absolute top-0 left-0 hidden group-hover:block"
                />
              </button>
            </div>
          </div>
          <div className="p-4 text-center flex flex-col items-center">
            <p className="text-black font-system text-sm mb-4">{popup.message}</p>
            {popup.type === 'claim' ? (
              <div className="flex justify-center gap-2">
                <button
                  onClick={(e) => handlePopupAction(e, popup, 'claim')}
                  className="min-w-[75px] px-4 py-1 text-black bg-[#ECE9D8] border-t border-l border-[#ffffff] border-r-2 border-b-2 border-r-[#848484] border-b-[#848484] active:border active:border-[#848484] active:border-t-[#404040] active:border-l-[#404040]"
                >
                  Claim Now!
                </button>
                <button
                  onClick={(e) => handlePopupAction(e, popup, 'close')}
                  className="min-w-[75px] px-4 py-1 text-black bg-[#ECE9D8] border-t border-l border-[#ffffff] border-r-2 border-b-2 border-r-[#848484] border-b-[#848484] active:border active:border-[#848484] active:border-t-[#404040] active:border-l-[#404040]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => handlePopupAction(e, popup, 'close')}
                className="min-w-[75px] px-4 py-1 text-black bg-[#ECE9D8] border-t border-l border-[#ffffff] border-r-2 border-b-2 border-r-[#848484] border-b-[#848484] active:border active:border-[#848484] active:border-t-[#404040] active:border-l-[#404040]"
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