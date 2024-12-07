'use client';
import { useWindow } from '@/contexts/WindowContext';
import CmdWindow from './CmdWindow';
import TextWindow from './TextWindow';

export default function WindowManager() {
  const { openWindow, closeWindow, isWindowOpen, windows } = useWindow();

  return (
    <>
      <CmdWindow
        isOpen={isWindowOpen('cmd')}
        onClose={() => closeWindow('cmd')}
        topZIndex={9999}
        setTopZIndex={() => {}}
        openTextWindow={(content, title) => openWindow('text', { content, title })}
      />
      <TextWindow
        isOpen={isWindowOpen('text')}
        onClose={() => closeWindow('text')}
        content={windows.text.content || ''}
        title={windows.text.title || ''}
        topZIndex={9999}
        setTopZIndex={() => {}}
      />
    </>
  );
}