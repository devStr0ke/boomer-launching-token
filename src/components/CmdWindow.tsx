import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

type CmdWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  topZIndex: number;
  setTopZIndex: (value: number) => void;
};

export default function CmdWindow({ isOpen, onClose, topZIndex, setTopZIndex }: CmdWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputHistory, setInputHistory] = useState<string[]>(['C:\\>']);
  const [currentInput, setCurrentInput] = useState('');
  const [windowZIndex, setWindowZIndex] = useState(topZIndex);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newHistory = [...inputHistory, `C:\\>${currentInput}`, `Unknown command: ${currentInput}`];
      setInputHistory(newHistory);
      setCurrentInput('');
    }
  };

  const handleDragStart = () => {
    const newZIndex = topZIndex + 1;
    setTopZIndex(newZIndex);
    setWindowZIndex(newZIndex);
  };

  const handleMaximize = () => {
    const newZIndex = topZIndex + 1;
    setTopZIndex(newZIndex);
    setWindowZIndex(newZIndex);
    setIsMaximized(!isMaximized);
  };

  const WindowContent = () => (
    <>
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-[#0054E3] via-[#0054E3] to-[#0054E3] p-1 flex justify-between items-center h-[28px]">
        <div className="flex items-center gap-1">
          <Image 
            src="/cmd.png" 
            alt="CMD"
            width={16}
            height={16}
            className="mr-1"
          />
          <span className="text-white text-xs font-bold">Command Prompt</span>
        </div>
        <div className="flex gap-[2px]">
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
          
          <button 
            onClick={handleMaximize}  // Replace the old onClick handler
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

      {/* Terminal Content */}
      <div 
        className={`bg-black p-2 font-mono text-white overflow-auto ${
          isMaximized ? 'h-[calc(100vh-60px)]' : 'h-[300px]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {inputHistory.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div className="flex">
          <span>C:\&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none ml-1"
            autoFocus
          />
        </div>
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
          className="fixed inset-0 bg-black border border-[#848484] shadow-lg"
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
          className="fixed left-[20%] top-[20%] w-[500px] bg-black border border-[#848484] shadow-lg"
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