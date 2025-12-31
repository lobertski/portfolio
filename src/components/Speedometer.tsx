import { motion } from "framer-motion";
import { Flag, Gauge } from "lucide-react";
interface SpeedometerProps {
  speed: number; // 0 to 15
  progress: number; // 0 to 100
}
export default function Speedometer({ speed, progress }: SpeedometerProps) {
  // Convert speed to rotation angle (-90deg to 90deg)
  // Max speed is 15 (displayed as 150 KM/H)
  // Needle should start at -90 degrees (left) for 0 speed
  // And reach 90 degrees (right) at max speed (15)
  const maxSpeed = 15;
  const rotation = -90 + (speed / maxSpeed) * 180;
  // Color zones based on speed
  const speedColor = speed > 12 ? "#ef4444" : speed > 8 ? "#f59e0b" : "#06b6d4";
  return (
    <>
      {/* Mobile/Tablet Progress Bar (Top) */}
      <div className="fixed top-0 left-0 w-full z-40 px-4 pt-4 md:hidden">
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-full p-2 flex items-center gap-3 shadow-lg">
          <Gauge size={16} className="text-cyan-400" />
          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-pink-500"
              style={{
                width: `${progress}%`,
              }}
              layoutId="progressBar"
            />
          </div>
          <Flag
            size={16}
            className={
              progress >= 99
                ? "text-yellow-400 animate-bounce"
                : "text-slate-500"
            }
          />
        </div>

        {/* Mobile Speed Indicator */}
        <div className="flex justify-center mt-2">
          <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-mono text-cyan-300 border border-cyan-900/50">
            {Math.round(speed * 10)} KM/H
          </div>
        </div>
      </div>

      {/* Desktop Radial Gauge (Bottom Right) */}
      <div className="fixed bottom-8 right-8 w-56 h-56 z-40 pointer-events-none hidden md:block">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-2xl" />

        {/* Gauge Background */}
        <div className="relative w-full h-full bg-slate-900/90 rounded-full border-4 border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#06b6d4 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />

          {/* Ticks */}
          {[...Array(21)].map((_, i) => {
            const angle = -90 + i * 9; // 180 degrees total / 20 steps
            const isMajor = i % 5 === 0;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 origin-bottom"
                style={{
                  height: "42%",
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                }}
              >
                <div
                  className="w-full absolute top-0 rounded-full"
                  style={{
                    height: isMajor ? "12px" : "6px",
                    backgroundColor:
                      i > 15 ? "#ef4444" : i > 10 ? "#f59e0b" : "#334155",
                    boxShadow: i > 15 ? "0 0 5px #ef4444" : "none",
                  }}
                />
              </div>
            );
          })}

          {/* Needle - positioned same as ticks, extending upward from center then rotated */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "4px",
              height: "38%",
              background:
                "linear-gradient(to top, transparent, #ec489980, #ec4899, #ec4899cc)",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
              boxShadow: "0 0 15px #ec4899",
              zIndex: 10,
              transition: "transform 0.3s ease-out",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                width: "8px",
                height: "8px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0 0 10px white",
              }}
            />
          </div>

          {/* Center Cap */}
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 border-2 border-slate-600 flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          </div>

          {/* Digital Readout */}
          <div className="absolute bottom-10 left-0 w-full text-center z-10">
            <div
              className="text-4xl font-black text-white tracking-tighter tabular-nums italic"
              style={{
                textShadow: `0 0 15px ${speedColor}`,
              }}
            >
              {Math.round(speed * 10)}
            </div>
            <div className="text-[10px] font-bold text-slate-500 tracking-widest mt-1">
              KM/H
            </div>
          </div>

          {/* Progress Mini-Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
