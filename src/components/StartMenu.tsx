import { motion } from 'framer-motion';
import Image from 'next/image';

type StartMenuProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="start-menu fixed left-0 bottom-[40px] w-[430px] h-[600px] bg-[#2754DE] rounded-t-md shadow-lg z-[9999] overflow-hidden"
      data-start-menu-open={isOpen}
      ref={(element) => {
        if (element) {
          (element as any).__onClose = onClose;
        }
      }}
    >
      {/* Blue header section with user info */}
      <div className="h-[70px] bg-[#2a7ae0] flex items-center px-4">
        <div className="w-[48px] h-[48px] rounded-xl bg-[#1E50CB] mr-2" />
        <span className="text-white font-bold">Boomer PC</span>
      </div>

      {/* Main menu area */}
      <div className="flex h-[calc(100%-120px)]">
        {/* Left sidebar - frequently used programs */}
        <div className="w-[190px] bg-white flex flex-col gap-1 p-1">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 p-1 text-black hover:bg-[#316AC5] hover:text-white rounded group">
              <Image src="/ie.png" alt="Internet" width={32} height={32} />
              <div className="flex flex-col gap-0">
                <span className="text-sm font-bold">Internet</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-1 text-black hover:bg-[#316AC5] hover:text-white rounded group">
              <Image src="/outlook.png" alt="Email" width={32} height={32} />
              <div className="flex flex-col">
                <span className="text-sm font-bold">E-mail</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-1 text-black hover:bg-[#316AC5] hover:text-white rounded group">
              <Image src="/cmd.png" alt="Work" width={32} height={32} />
              <div className="flex flex-col">
                <span className="text-sm font-bold">CMD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-[#d2e5fa] p-2">
          <div className="flex flex-col gap-2">
            {/* Programs Section */}
            <div className="mb-4 text-black font-extrabold">
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/folder.png" alt="My Documents" width={32} height={32} />
                <span className="text-xs">My Documents</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/recentdoc.png" alt="Recent Documents" width={32} height={32} />
                <span className="text-xs">My Recent Documents</span>
                <span className="ml-auto text-[7px]">▶</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/folder_image.png" alt="My Pictures" width={32} height={32} />
                <span className="text-xs">My Pictures</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/folder_music.png" alt="My Music" width={32} height={32} />
                <span className="text-xs">My Music</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/mycomputer.png" alt="My Computer" width={32} height={32} />
                <span className="text-xs">My Computer</span>
              </div>
            </div>

            {/* System Section */}
            <div className="text-black font-light">
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/clipboard.png" alt="Control Panel" width={32} height={32} />
                <span className="text-xs">Control Panel</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/defaultprog.png" alt="Set Program Access" width={32} height={32} />
                <span className="text-xs">Set Program Access and Defaults</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/printerfax.png" alt="Printers" width={32} height={32} />
                <span className="text-xs">Printers and Faxes</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/help.png" alt="Help" width={32} height={32} />
                <span className="text-xs">Help and Support</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/search.png" alt="Search" width={32} height={32} />
                <span className="text-xs">Search</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white rounded">
                <Image src="/run.png" alt="Run" width={32} height={32} />
                <span className="text-xs">Run...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="h-[50px] bg-[#2a7ae0] border-t border-[#7BA4E3] flex items-center justify-end px-0">
        <button className="flex items-center gap-1 p-1 hover:bg-[#316AC5] hover:text-white rounded">
          <Image src="/logoff.png" alt="Log Off" width={32} height={32} />
          <span className="text-xs">Log Off</span>
        </button>
        <button className="flex items-center gap-1 p-1 hover:bg-[#316AC5] hover:text-white rounded">
          <Image src="/shutdown.png" alt="Shut Down" width={32} height={32} />
          <span className="text-xs">Turn Off Computer</span>
        </button>
      </div>
    </motion.div>
  );
}