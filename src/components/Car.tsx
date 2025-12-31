import { motion } from "framer-motion";
interface CarProps {
  isMoving: boolean;
  direction: "left" | "right" | "idle";
}
export default function Car({ isMoving, direction }: CarProps) {
  return (
    <div className="relative w-32 h-16">
      {/* Car Body Container with animations */}
      <motion.div
        animate={{
          y: isMoving ? [0, -2, 0] : 0,
          rotate: direction === "right" ? -2 : direction === "left" ? 2 : 0,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 0.2,
          },
          rotate: {
            type: "spring",
            stiffness: 100,
          },
        }}
        className="w-full h-full relative z-10"
      >
        {/* Retro Car Graphic (CSS Art) */}
        <div className="absolute bottom-2 left-0 w-full h-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-lg skew-x-[-20deg] shadow-[0_0_15px_rgba(236,72,153,0.6)]">
          {/* Cockpit */}
          <div className="absolute -top-4 left-8 w-16 h-6 bg-cyan-900/80 rounded-t-lg border-t border-cyan-400/50 skew-x-[20deg]" />

          {/* Side Stripe */}
          <div className="absolute top-3 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_5px_#06b6d4]" />

          {/* Tail light */}
          <div className="absolute top-1 -left-1 w-2 h-4 bg-red-500 rounded-sm shadow-[0_0_10px_red]" />

          {/* Headlight */}
          <div className="absolute top-2 -right-1 w-2 h-3 bg-yellow-200 rounded-sm shadow-[0_0_15px_yellow]" />
        </div>

        {/* Wheels */}
        <motion.div
          className="absolute bottom-0 left-4 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-600 flex items-center justify-center"
          animate={{
            rotate: isMoving ? 360 : 0,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            ease: "linear",
          }}
        >
          <div className="w-4 h-4 border border-cyan-500 rounded-full opacity-50" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-4 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-600 flex items-center justify-center"
          animate={{
            rotate: isMoving ? 360 : 0,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            ease: "linear",
          }}
        >
          <div className="w-4 h-4 border border-cyan-500 rounded-full opacity-50" />
        </motion.div>
      </motion.div>

      {/* Underglow */}
      <div className="absolute bottom-0 left-2 right-2 h-2 bg-cyan-500/50 blur-md rounded-full" />

      {/* Exhaust Particles (Simple CSS animation) */}
      {isMoving && (
        <div className="absolute bottom-2 -left-4 flex space-x-1">
          <motion.div
            initial={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              x: -20,
              scale: 0,
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: 0,
            }}
            className="w-2 h-2 bg-pink-500 rounded-full blur-[1px]"
          />
          <motion.div
            initial={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              x: -25,
              scale: 0,
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: 0.1,
            }}
            className="w-1 h-1 bg-purple-500 rounded-full blur-[1px]"
          />
        </div>
      )}
    </div>
  );
}
