import { motion } from "framer-motion";
import { Milestone } from "@/data/portfolioData";
interface MilestoneMarkerProps {
  milestone: Milestone;
  isVisible: boolean;
  distanceFromCar: number; // For scaling/opacity effects based on distance
}
export default function MilestoneMarker({
  milestone,
  isVisible,
  distanceFromCar,
}: MilestoneMarkerProps) {
  // Only render if reasonably close to viewport to save resources
  if (!isVisible) return null;
  const isClose = Math.abs(distanceFromCar) < 200;
  return (
    <div
      className="absolute bottom-20 transform -translate-x-1/2 flex flex-col items-center group"
      style={{
        left: milestone.x,
      }}
    >
      {/* Floating Icon/Sign */}
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, -10, 0],
          scale: isClose ? 1.2 : 1,
          filter: isClose ? `drop-shadow(0 0 15px ${milestone.color})` : "none",
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2,
          },
          scale: {
            duration: 0.3,
          },
        }}
        className="relative z-20 cursor-pointer"
      >
        <div
          className="w-16 h-16 rounded-lg border-2 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm transition-colors duration-300"
          style={{
            borderColor: milestone.color,
            boxShadow: `0 0 10px ${milestone.color}40`,
          }}
        >
          <span className="text-3xl">{milestone.icon}</span>
        </div>
        {/* Pole */}
        <div className="w-1 h-12 bg-slate-600 mx-auto mt-[-2px]" />
        <div className="w-4 h-1 bg-slate-600 mx-auto" /> {/* Base */}
      </motion.div>

      {/* Label (visible when close) */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: isClose ? 1 : 0,
          y: isClose ? 0 : 10,
        }}
        className="absolute -top-12 whitespace-nowrap bg-black/70 px-3 py-1 rounded border border-white/20 backdrop-blur-md"
      >
        <span className="text-sm font-bold text-white tracking-wider">
          {milestone.title}
        </span>
      </motion.div>
    </div>
  );
}
