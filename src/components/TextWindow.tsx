import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

type TextWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
  topZIndex: number;
  setTopZIndex: (value: number) => void;
};

export default function TextWindow({ isOpen, onClose, content, title, topZIndex, setTopZIndex }: TextWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [windowZIndex, setWindowZIndex] = useState(topZIndex);

  if (!isOpen) return null;

  const handleDragStart = () => {
    const newZIndex = topZIndex + 1;
    setTopZIndex(newZIndex);
    setWindowZIndex(newZIndex);
  };

  const WindowContent = () => (
    <>
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-[#0054E3] via-[#0054E3] to-[#0054E3] p-1 flex justify-between items-center h-[28px]">
        <div className="flex items-center gap-1">
          <div className="relative w-[32px] h-[32px]">
            <Image 
              src="/txt_windows_xp.png" 
              alt="Notepad"
              fill
              className="object-contain mr-[-15px]"
            />
          </div>
          <span className="text-white text-xs font-bold">{title}</span>
        </div>
        <div className="flex gap-[2px]">
          {/* Minimize */}
          <button className="relative w-[20px] h-[20px] group">
            <Image 
              src="/minimise.png"
              alt="Minimize"
              width={20}
              height={20}
              className="absolute top-0 left-0 group-hover:hidden"
            />
            <Image 
              src="/minimise_hover.png"
              alt="Minimize"
              width={20}
              height={20}
              className="absolute top-0 left-0 hidden group-hover:block"
            />
          </button>
          
          {/* Maximize/Restore */}
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="relative w-[20px] h-[20px] group"
          >
            <Image 
              src={isMaximized ? "/resize.png" : "/maximise.png"}
              alt={isMaximized ? "Restore" : "Maximize"}
              width={20}
              height={20}
              className="absolute top-0 left-0 group-hover:hidden"
            />
            <Image 
              src={isMaximized ? "/resize_hover.png" : "/maximise_hover.png"}
              alt={isMaximized ? "Restore" : "Maximize"}
              width={20}
              height={20}
              className="absolute top-0 left-0 hidden group-hover:block"
            />
          </button>
          
          {/* Close */}
          <button
            onClick={onClose}
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

      {/* Menu Bar */}
      <div className="bg-[#ECE9D8] border-b border-[#848484] px-1 py-0.5">
        <div className="text-xs text-black">
          File Edit Format View Help
        </div>
      </div>

      {/* Content */}
      <div className={`bg-white p-2 overflow-auto ${isMaximized ? 'h-[calc(100vh-60px)]' : 'h-[300px]'}`}>
        <pre className="text-black text-sm whitespace-pre-wrap font-[system-ui]">
          {content}
        </pre>
      </div>
    </>
  );

  return (
    <>
      {isMaximized && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white border border-[#848484] shadow-lg"
          style={{ transform: 'none', zIndex: windowZIndex }}
        >
          <WindowContent />
        </motion.div>
      )}

      {!isMaximized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed left-[20%] top-[20%] w-[500px] bg-white border border-[#848484] shadow-lg"
          style={{ zIndex: windowZIndex }}
          drag
          dragMomentum={false}
          onDragStart={handleDragStart}
        >
          <WindowContent />
        </motion.div>
      )}
    </>
  );
}