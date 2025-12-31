import { ReactNode } from "react";
import { motion } from "framer-motion";
interface ParallaxLayerProps {
  children: ReactNode;
  speed: number;
  offset: number;
  className?: string;
  zIndex?: number;
}
export default function ParallaxLayer({
  children,
  speed,
  offset,
  className = "",
  zIndex = 0,
}: ParallaxLayerProps) {
  // Calculate position based on offset and speed
  // If speed is 0.5, it moves at half the speed of the foreground
  // We use negative offset because as we move right (positive x), the world moves left
  const x = -offset * speed;
  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{
        x,
        zIndex,
        // Ensure the layer is wide enough or repeats.
        // For this implementation, we'll assume the children handle the width/repetition
        // or we just move a really wide container.
      }}
    >
      {children}
    </motion.div>
  );
}
