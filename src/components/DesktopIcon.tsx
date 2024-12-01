'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type DesktopIconProps = {
  name: string;
  icon: string;
  onClick: () => void;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  imageClassName?: string;
};

export default function DesktopIcon({ 
  name, 
  icon, 
  onClick, 
  position,
  width = 100,
  height = 100,
  imageClassName = "mx-auto pointer-events-none"
}: DesktopIconProps) {
  const [dragConstraints, setDragConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDragConstraints({
        left: 0,
        top: 0,
        right: window.innerWidth - 80,
        bottom: window.innerHeight - 100,
      });
    }
  }, []);

  return (
    <motion.div
      className="absolute w-[80px] cursor-pointer select-none"
      style={{ left: position.x, top: position.y }}
      drag
      dragMomentum={false}
      onDoubleClick={onClick}
      dragConstraints={dragConstraints}
    >
      <div className="text-center">
        <Image 
          src={icon}
          alt={name}
          width={width}
          height={height}
          className={imageClassName}
          draggable={false}
        />
        <span className="text-white text-xs block group-hover:bg-[#316AC5]">
          {name}
        </span>
      </div>
    </motion.div>
  );
}