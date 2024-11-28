'use client';
import { useEffect } from 'react';

export default function ClickOutsideProvider({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const startMenu = document.querySelector('.start-menu');
      const startButton = document.querySelector('.start-button');
      
      if (!startMenu?.contains(e.target as Node) && 
          !startButton?.contains(e.target as Node)) {
        // Find the start menu and call its onClose
        const startMenu = document.querySelector('[data-start-menu-open="true"]');
        if (startMenu) {
          const onClose = (startMenu as any).__onClose;
          if (onClose) onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleGlobalClick);
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, []);

  return <>{children}</>;
}