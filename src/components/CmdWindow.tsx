import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

type CmdWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  topZIndex: number;
  setTopZIndex: (value: number) => void;
};

type FileSystemItem = {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileSystemItem };
};

type FileSystem = {
  [key: string]: FileSystemItem;
};

export default function CmdWindow({ isOpen, onClose, topZIndex, setTopZIndex }: CmdWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputHistory, setInputHistory] = useState<string[]>(['C:\\Users\\Boomer>']);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState(['C:', 'Users', 'Boomer']);
  const [windowZIndex, setWindowZIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const newZIndex = topZIndex + 1;
      setTopZIndex(newZIndex);
      setWindowZIndex(newZIndex);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const fileSystem: FileSystem = {
    'C:': {
      name: 'C:',
      type: 'directory',
      children: {
        Users: {
          name: 'Users',
          type: 'directory',
          children: {
            Boomer: {
              name: 'Boomer',
              type: 'directory',
              children: {
                Desktop: {
                  name: 'Desktop',
                  type: 'directory',
                  children: {
                    'SeedPhrases.txt': {
                      name: 'SeedPhrases.txt',
                      type: 'file',
                      content: 'Retirement wallet: pencil nature travel focus ladder talent unique skate glance immense echo village\nMortgage wallet: anchor metal globe elite mango motion silent power velvet garden glove beyond'
                    },
                    'Command Prompt': {
                      name: 'Command Prompt',
                      type: 'file'
                    }
                  }
                },
                Documents: {
                  name: 'Documents',
                  type: 'directory',
                  children: {}
                }
              }
            }
          }
        }
      }
    }
  };

  const getCurrentDirectory = () => {
    let current = fileSystem;
    for (const part of currentPath) {
      current = current[part].children || {};
    }
    return current;
  };

  const handleCommand = (command: string) => {
    const parts = command.trim().split(' ');  // Remove toLowerCase() here
    const cmd = parts[0].toLowerCase();  // Only make the command lowercase
    const args = parts.slice(1);  // Keep original case for arguments
    let output: string[] = [];
  
    switch (cmd) {
      case 'cls':
        setInputHistory(['C:\\' + currentPath.slice(1).join('\\') + '>']);
        break;
  
      case 'ls':
      case 'dir':
        const currentDir = getCurrentDirectory();
        output = [
          ' Directory of C:\\' + currentPath.slice(1).join('\\'),
          '',
          ...Object.values(currentDir).map(item => 
            `${item.type === 'directory' ? '<DIR>' : '     '} ${item.name}`
          ),
          ''
        ];
        break;
  
      case 'cd':
        if (!args[0] || args[0] === '.') {
          output = [`C:\\${currentPath.slice(1).join('\\')}`];
        } else if (args[0] === '..') {
          if (currentPath.length > 3) {
            setCurrentPath(prev => prev.slice(0, -1));
            output = [`Changed to C:\\${currentPath.slice(1, -1).join('\\')}`];
          } else {
            output = ['Cannot go up from root directory'];
          }
        } else {
          // Find the directory case-insensitively but preserve original case
          const currentDir = getCurrentDirectory();
          const targetName = Object.keys(currentDir).find(
            key => key.toLowerCase() === args[0].toLowerCase()
          );
          
          if (targetName) {
            const targetDir = currentDir[targetName];
            if (targetDir.type === 'directory') {
              setCurrentPath(prev => [...prev, targetName]);  // Use the correct case
              output = [`Changed to C:\\${[...currentPath.slice(1), targetName].join('\\')}`];
            } else {
              output = [`${args[0]} is not a directory`];
            }
          } else {
            output = [`Directory '${args[0]}' not found`];
          }
        }
        break;
  
      default:
        output = [`'${parts[0]}' is not recognized as an internal or external command`];
    }
  
    const newHistory = [
      ...inputHistory,
      `C:\\${currentPath.slice(1).join('\\')}>${command}`,  // Use original command with case
      ...output
    ];
    setInputHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
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

  if (!isOpen) return null;

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
            onClick={handleMaximize}
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
          <span>C:\{currentPath.slice(1).join('\\')}&gt;</span>
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