import Image from 'next/image';
import { motion } from 'framer-motion';

type DesktopIconProps = {
  name: string;
  icon: string;
  onClick: () => void;
  position: { x: number; y: number };
};

export default function DesktopIcon({ name, icon, onClick, position }: DesktopIconProps) {
  return (
    <motion.div
      className="absolute w-[80px] cursor-pointer select-none"
      style={{ left: position.x, top: position.y }}
      drag
      dragMomentum={false}
      onDoubleClick={onClick}
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 80, bottom: window.innerHeight - 100 }}
    >
      <div className="text-center">
        <Image 
          src={icon}
          alt={name}
          width={100}
          height={100}
          className="mx-auto pointer-events-none mb-[-15px]"
          draggable={false}
        />
        <span className="text-white text-xs block group-hover:bg-[#316AC5]">
          {name}
        </span>
      </div>
    </motion.div>
  );
}