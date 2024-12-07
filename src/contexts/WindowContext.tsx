'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Define all possible window types
export type WindowType = 'cmd' | 'text' | 'notepad' | 'error';

type WindowState = {
  [K in WindowType]: {
    isOpen: boolean;
    content?: string;
    title?: string;
  };
};

type WindowContextType = {
  windows: WindowState;
  openWindow: (type: WindowType, props?: { content?: string; title?: string }) => void;
  closeWindow: (type: WindowType) => void;
  isWindowOpen: (type: WindowType) => boolean;
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState>({
    cmd: { isOpen: false },
    text: { isOpen: false, content: '', title: '' },
    notepad: { isOpen: false, content: '', title: '' },
    error: { isOpen: false, content: '', title: '' },
  });

  const openWindow = (type: WindowType, props?: { content?: string; title?: string }) => {
    setWindows(prev => ({
      ...prev,
      [type]: {
        isOpen: true,
        content: props?.content || prev[type].content,
        title: props?.title || prev[type].title,
      },
    }));
  };

  const closeWindow = (type: WindowType) => {
    setWindows(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        isOpen: false,
      },
    }));
  };

  const isWindowOpen = (type: WindowType) => windows[type].isOpen;

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, isWindowOpen }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
}