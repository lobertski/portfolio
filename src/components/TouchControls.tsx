import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Hand } from "lucide-react";
import { motion } from "framer-motion";
interface TouchControlsProps {
  onControlChange: (
    control: "left" | "right" | "interact",
    active: boolean,
  ) => void;
}
export default function TouchControls({ onControlChange }: TouchControlsProps) {
  // Only show on touch devices (simple check, can be refined)
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  if (!isTouchDevice) return null;
  const handleTouchStart =
    (control: "left" | "right" | "interact") => (e: React.TouchEvent) => {
      e.preventDefault(); // Prevent scrolling/selection
      onControlChange(control, true);
    };
  const handleTouchEnd =
    (control: "left" | "right" | "interact") => (e: React.TouchEvent) => {
      e.preventDefault();
      onControlChange(control, false);
    };
  return (
    <div className="absolute bottom-4 left-0 w-full px-4 pb-4 z-50 flex justify-between items-end pointer-events-none">
      {/* Directional Controls */}
      <div className="flex gap-4 pointer-events-auto">
        <motion.button
          whileTap={{
            scale: 0.9,
            backgroundColor: "rgba(6, 182, 212, 0.4)",
          }}
          className="w-16 h-16 rounded-full border-2 border-cyan-500 bg-cyan-900/50 backdrop-blur-sm flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          onTouchStart={handleTouchStart("left")}
          onTouchEnd={handleTouchEnd("left")}
          aria-label="Move Left"
        >
          <ArrowLeft size={32} />
        </motion.button>

        <motion.button
          whileTap={{
            scale: 0.9,
            backgroundColor: "rgba(6, 182, 212, 0.4)",
          }}
          className="w-16 h-16 rounded-full border-2 border-cyan-500 bg-cyan-900/50 backdrop-blur-sm flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          onTouchStart={handleTouchStart("right")}
          onTouchEnd={handleTouchEnd("right")}
          aria-label="Move Right"
        >
          <ArrowRight size={32} />
        </motion.button>
      </div>

      {/* Interact Button */}
      <div className="pointer-events-auto">
        <motion.button
          whileTap={{
            scale: 0.9,
            backgroundColor: "rgba(236, 72, 153, 0.4)",
          }}
          className="w-20 h-20 rounded-full border-2 border-pink-500 bg-pink-900/50 backdrop-blur-sm flex flex-col items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
          onTouchStart={handleTouchStart("interact")}
          onTouchEnd={handleTouchEnd("interact")}
          aria-label="Interact"
        >
          <Hand size={32} />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
            View
          </span>
        </motion.button>
      </div>
    </div>
  );
}
