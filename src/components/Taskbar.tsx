'use client';
import Image from 'next/image';
import { useState } from 'react';
import StartMenu from './StartMenu';

export default function TaskBar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase();

   // Close start menu when clicking outside
   const handleClickOutside = (e: React.MouseEvent) => {
    if (isStartMenuOpen && !(e.target as HTMLElement).closest('.start-button')) {
      setIsStartMenuOpen(false);
    }
  };

  return (
    <>
      <div 
      className="fixed bottom-0 left-0 right-0 h-[40px] bg-[#235ADA] flex items-center justify-between z-[9999]"
      onClick={handleClickOutside}
      >
        {/* Start Button Section */}
        <div className="flex items-center h-full">
          <button 
            className="h-full relative group start-button"
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          >
            <Image
              src="/xp_btn_norm.png"
              alt="Start"
              width={130}
              height={45}
              className={`${isStartMenuOpen ? 'hidden' : 'group-hover:hidden'}`}
            />
            <Image
              src="/xp_btn_hover.png"
              alt="Start"
              width={130}
              height={45}
              className={`${isStartMenuOpen ? 'block' : 'hidden group-hover:block'}`}
            />
          </button>
        </div>

        {/* Quick Launch & Active Programs */}
        <div className="flex-grow flex items-center">
          <div className="border-l border-[#0F41C0] border-r border-[#3B70E3] h-full mx-2" />
        </div>

        {/* System Tray */}
        <div className="flex items-center h-full bg-[#0F41C0]">
          <div className="flex items-center px-2 py-1">
            {/* System Icons */}
            <Image
              src="/green_shield.png"
              alt="Security"
              width={16}
              height={16}
              className="mx-1"
            />
            <Image
              src="/removabledevice.png"
              alt="USB Device"
              width={16}
              height={16}
              className="mx-1"
            />
            <Image
              src="/sound.png"
              alt="Volume"
              width={16}
              height={16}
              className="mx-1"
            />
            <Image
              src="/internet.png"
              alt="Network"
              width={16}
              height={16}
              className="mx-1"
            />
            
            {/* Time */}
            <div className="text-white text-xs px-2">
              {currentTime}
            </div>
          </div>
        </div>
      </div>
      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)} 
      />
    </>
  );
}