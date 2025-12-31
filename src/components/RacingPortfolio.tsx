import { useEffect, useState, useRef } from "react";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import Car from "@/components/Car";
import ParallaxLayer from "@/components/ParallaxLayer";
import MilestoneMarker from "@/components/MilestoneMarker";
import MilestoneModal from "@/components/MilestoneModal";
import Speedometer from "@/components/Speedometer";
import TouchControls from "@/components/TouchControls";
import FinishScreen from "@/components/FinishScreen";
import { MILESTONES, TOTAL_DISTANCE, Milestone } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

export default function RacingPortfolio() {
  const keyboardControls = useKeyboardControls();
  const [touchControls, setTouchControls] = useState({
    left: false,
    right: false,
    interact: false,
  });
  const [gamePosition, setGamePosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  // Constants
  const MAX_SPEED = 15;
  const ACCELERATION = 0.5;
  const FRICTION = 0.98;
  // Merge controls
  const controls = {
    left: keyboardControls.left || touchControls.left,
    right: keyboardControls.right || touchControls.right,
    interact: keyboardControls.interact || touchControls.interact,
  };
  // Handle touch control updates
  const handleTouchControl = (
    control: "left" | "right" | "interact",
    active: boolean,
  ) => {
    setTouchControls((prev) => ({
      ...prev,
      [control]: active,
    }));
  };
  // Restart Game
  const handleRestart = () => {
    setIsFinished(false);
    setGamePosition(0);
    setVelocity(0);
    setIsModalOpen(false);
    setActiveMilestone(null);
  };
  // Intro Sequence
  useEffect(() => {
    const timer = setTimeout(() => setIntroFinished(true), 2500);
    return () => clearTimeout(timer);
  }, []);
  // Game Loop
  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined) {
      // Calculate physics
      let newVelocity = velocity;
      if (!isModalOpen && !isFinished && introFinished) {
        if (controls.right) {
          newVelocity += ACCELERATION;
        } else if (controls.left) {
          newVelocity -= ACCELERATION;
        } else {
          newVelocity *= FRICTION;
          if (Math.abs(newVelocity) < 0.1) newVelocity = 0;
        }
      } else {
        newVelocity *= 0.8;
        if (Math.abs(newVelocity) < 0.1) newVelocity = 0;
      }
      newVelocity = Math.max(Math.min(newVelocity, MAX_SPEED), -MAX_SPEED);
      let newPosition = gamePosition + newVelocity;
      if (newPosition < 0) {
        newPosition = 0;
        newVelocity = 0;
      }
      if (newPosition >= TOTAL_DISTANCE) {
        newPosition = TOTAL_DISTANCE;
        newVelocity = 0;
        if (!isFinished && Math.abs(velocity) > 0) {
          setIsFinished(true);
        }
      }
      setVelocity(newVelocity);
      setGamePosition(newPosition);
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [
    velocity,
    gamePosition,
    controls,
    isModalOpen,
    isFinished,
    introFinished,
  ]);
  // Interaction Handler
  useEffect(() => {
    if (controls.interact && !isModalOpen && !isFinished && introFinished) {
      const nearestMilestone = MILESTONES.find(
        (m) => Math.abs(m.x - gamePosition) < 150,
      );
      if (nearestMilestone) {
        setActiveMilestone(nearestMilestone);
        setIsModalOpen(true);
        setVelocity(0);
      }
    }
  }, [controls.interact, gamePosition, isModalOpen, isFinished, introFinished]);
  const progress = (gamePosition / TOTAL_DISTANCE) * 100;
  const isNearMilestone = MILESTONES.some(
    (m) => Math.abs(m.x - gamePosition) < 150,
  );
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900 select-none touch-none font-sans">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]" />

      {/* Retro Sun */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-t from-yellow-500 via-orange-500 to-pink-600 blur-sm opacity-90 shadow-[0_0_100px_rgba(236,72,153,0.5)]">
        {/* Sun Stripes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full bg-[#1e1b4b] opacity-80"
            style={{
              height: `${i * 4 + 2}px`,
              bottom: `${10 + i * 15}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Stars */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Parallax Layers */}
      <ParallaxLayer
        speed={0.1}
        offset={gamePosition}
        className="bottom-48 h-64"
      >
        <div className="w-[200%] h-full absolute bottom-0 left-0 flex items-end opacity-60">
          <svg
            viewBox="0 0 1200 300"
            className="w-full h-full text-[#312e81] fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,300 L150,100 L300,300 L450,150 L600,300 L750,50 L900,300 L1050,200 L1200,300 Z" />
          </svg>
          <svg
            viewBox="0 0 1200 300"
            className="w-full h-full text-[#312e81] fill-current ml-[-1px]"
            preserveAspectRatio="none"
          >
            <path d="M0,300 L150,100 L300,300 L450,150 L600,300 L750,50 L900,300 L1050,200 L1200,300 Z" />
          </svg>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.3}
        offset={gamePosition}
        className="bottom-40 h-48"
      >
        <div className="w-[300%] h-full absolute bottom-0 left-0 flex items-end opacity-80">
          <div
            className="w-full h-32 bg-repeat-x"
            style={{
              backgroundImage:
                "linear-gradient(to top, #1e1b4b 0%, transparent 100%), linear-gradient(90deg, #1e1b4b 20px, transparent 20px), linear-gradient(90deg, transparent 40px, #1e1b4b 40px)",
              backgroundSize: "100% 100%, 60px 100%, 90px 80%",
            }}
          >
            <div
              className="w-full h-full opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(#fcd34d 1px, transparent 1px)",
                backgroundSize: "10px 15px",
              }}
            />
          </div>
        </div>
      </ParallaxLayer>

      {/* Grid Floor */}
      <div className="absolute bottom-0 w-full h-1/3 bg-[#0f172a] road-perspective overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[200%]"
          style={{
            backgroundImage: `linear-gradient(transparent 95%, rgba(6, 182, 212, 0.4) 95%), linear-gradient(90deg, transparent 95%, rgba(236, 72, 153, 0.2) 95%)`,
            backgroundSize: "60px 60px",
            transform: `translateY(${gamePosition % 60}px) rotateX(60deg)`,
            backgroundPosition: `${-gamePosition}px 0`,
          }}
        />
      </div>

      {/* Road */}
      <div className="absolute bottom-0 w-full h-32 bg-slate-900 border-t-4 border-cyan-500 shadow-[0_-5px_30px_rgba(6,182,212,0.3)]">
        <div
          className="w-full h-full flex flex-col justify-center space-y-8"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, #fbbf24 40px, #fbbf24 80px)",
            backgroundPosition: `${-gamePosition}px 0`,
            opacity: 0.8,
          }}
        >
          <div className="w-full h-2 bg-transparent" />
        </div>
      </div>

      {/* Game World */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `translateX(${-gamePosition + window.innerWidth / 3}px)`,
          }}
        >
          {/* Start Line - Retro Arcade Style */}
          <div className="absolute bottom-32 left-[-60px] z-10 w-[140px]">
            {/* Left Pole */}
            <div className="absolute bottom-0 left-0 w-4 h-48 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 rounded-t-full shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
              {/* Pole stripes */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-4 bg-pink-500"
                  style={{ top: `${i * 32 + 8}px` }}
                />
              ))}
            </div>

            {/* Right Pole */}
            <div className="absolute bottom-0 right-0 w-4 h-48 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 rounded-t-full shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
              {/* Pole stripes */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-4 bg-pink-500"
                  style={{ top: `${i * 32 + 8}px` }}
                />
              ))}
            </div>

            {/* Banner/Arch */}
            <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-40">
              {/* Gradient Banner */}
              <div
                className="w-full h-12 rounded-lg shadow-lg border-4 border-cyan-400 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500"
                style={{
                  boxShadow:
                    "0 0 30px rgba(6,182,212,0.4), inset 0 0 20px rgba(0,0,0,0.3)",
                }}
              />

              {/* Flag Icon */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div
                  className="text-5xl animate-bounce"
                  style={{
                    filter: "drop-shadow(0 0 15px #06b6d4)",
                  }}
                >
                  🏁
                </div>
              </div>

              {/* Neon START Text */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div
                  className="text-4xl font-black tracking-wider italic"
                  style={{
                    color: "#fff",
                    textShadow: `
                      0 0 10px #06b6d4,
                      0 0 20px #06b6d4,
                      0 0 40px #06b6d4,
                      0 0 80px #06b6d4,
                      2px 2px 0 #ec4899,
                      -2px -2px 0 #8b5cf6
                    `,
                  }}
                >
                  START
                </div>
              </div>

              {/* Flashing Lights on Banner */}
              <div className="absolute -top-2 left-0 w-full flex justify-between px-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4]"
                    style={{
                      animation: `pulse 0.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Checkered Start Pattern on Road */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(#fff 0deg 90deg, #000 90deg 180deg)",
                backgroundSize: "16px 16px",
                opacity: 0.8,
              }}
            />
          </div>

          {/* Milestones */}
          {MILESTONES.map((milestone) => (
            <MilestoneMarker
              key={milestone.id}
              milestone={milestone}
              isVisible={
                Math.abs(milestone.x - gamePosition) < window.innerWidth * 1.5
              }
              distanceFromCar={milestone.x - gamePosition}
            />
          ))}

          {/* Finish Line - Retro Arcade Style */}
          <div
            className="absolute bottom-32 z-10"
            style={{
              left: TOTAL_DISTANCE - 60,
            }}
          >
            {/* Left Pole */}
            <div className="absolute bottom-0 left-0 w-4 h-48 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-t-full shadow-[0_0_20px_rgba(250,204,21,0.5)]">
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-red-500/30 to-transparent animate-pulse" />
              {/* Pole stripes */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-4 bg-red-500"
                  style={{ top: `${i * 32 + 8}px` }}
                />
              ))}
            </div>

            {/* Right Pole */}
            <div className="absolute bottom-0 right-0 w-4 h-48 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-t-full shadow-[0_0_20px_rgba(250,204,21,0.5)]">
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-red-500/30 to-transparent animate-pulse" />
              {/* Pole stripes */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-4 bg-red-500"
                  style={{ top: `${i * 32 + 8}px` }}
                />
              ))}
            </div>

            {/* Banner/Arch */}
            <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-40">
              {/* Checkered Banner */}
              <div
                className="w-full h-12 rounded-lg shadow-lg border-4 border-yellow-400"
                style={{
                  backgroundImage:
                    "repeating-conic-gradient(#fff 0deg 90deg, #000 90deg 180deg)",
                  backgroundSize: "12px 12px",
                  boxShadow:
                    "0 0 30px rgba(250,204,21,0.4), inset 0 0 20px rgba(0,0,0,0.3)",
                }}
              />

              {/* Trophy Icon - Above FINISH text */}
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2">
                <div
                  className="text-6xl animate-bounce"
                  style={{
                    filter: "drop-shadow(0 0 20px gold)",
                  }}
                >
                  🏆
                </div>
              </div>

              {/* Neon FINISH Text */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div
                  className="text-5xl font-black tracking-wider italic"
                  style={{
                    color: "#fff",
                    textShadow: `
                      0 0 10px #ff00ff,
                      0 0 20px #ff00ff,
                      0 0 40px #ff00ff,
                      0 0 80px #ff00ff,
                      2px 2px 0 #00ffff,
                      -2px -2px 0 #ffff00
                    `,
                  }}
                >
                  FINISH
                </div>
              </div>

              {/* Flashing Lights on Banner */}
              <div className="absolute -top-2 left-0 w-full flex justify-between px-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_10px_#fbbf24]"
                    style={{
                      animation: `pulse 0.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Car */}
      <div className="absolute bottom-24 left-1/3 transform -translate-x-1/2 z-30">
        <Car
          isMoving={Math.abs(velocity) > 0.1}
          direction={
            velocity > 0.5 ? "right" : velocity < -0.5 ? "left" : "idle"
          }
        />
      </div>

      {/* HUD */}
      <Speedometer speed={Math.abs(velocity)} progress={progress} />
      <TouchControls onControlChange={handleTouchControl} />

      {/* Intro Overlay */}
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            className="absolute inset-0 bg-black z-50 flex items-center justify-center"
            exit={{
              opacity: 0,
              transition: {
                duration: 1,
              },
            }}
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="text-center"
            >
              <p className="text-cyan-300 text-xl tracking-widest uppercase animate-pulse">
                Accelerating innovation at light speed
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions (Post-Intro) */}
      {introFinished && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full px-4 z-40"
          animate={{
            opacity: gamePosition > 200 ? 0 : 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className="hidden md:block bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-2xl">
            <p className="text-2xl text-white font-bold mb-4">CONTROLS</p>
            <div className="flex justify-center gap-8 mb-4">
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                  <span className="w-10 h-10 border-2 border-cyan-500 rounded flex items-center justify-center text-cyan-400 font-bold bg-cyan-950/50">
                    ←
                  </span>
                  <span className="w-10 h-10 border-2 border-cyan-500 rounded flex items-center justify-center text-cyan-400 font-bold bg-cyan-950/50">
                    →
                  </span>
                </div>
                <span className="text-xs text-slate-400 uppercase tracking-wider">
                  Drive
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="h-10 px-4 border-2 border-pink-500 rounded flex items-center justify-center text-pink-400 font-bold bg-pink-950/50 mb-2">
                  ENTER
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">
                  Interact
                </span>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <p className="text-lg text-white font-bold drop-shadow-md animate-pulse">
              TAP ARROWS TO DRIVE
            </p>
          </div>
        </motion.div>
      )}

      {/* Interaction Prompt */}
      <AnimatePresence>
        {isNearMilestone && !isModalOpen && !isFinished && (
          <motion.div
            className="fixed bottom-56 inset-x-0 flex justify-center pointer-events-none z-40"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.8,
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-pink-500 blur-lg opacity-50 animate-pulse rounded-full" />
              <div className="relative bg-slate-900 text-white px-6 py-3 rounded-full border-2 border-pink-500 flex items-center gap-3 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                <span className="hidden md:inline font-bold text-pink-400">
                  ENTER
                </span>
                <span className="md:hidden font-bold text-pink-400">
                  TAP VIEW
                </span>
                <span className="w-px h-4 bg-slate-700" />
                <span className="font-medium">Open Milestone</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MilestoneModal
        milestone={activeMilestone}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {isFinished && (
        <FinishScreen isOpen={isFinished} onRestart={handleRestart} />
      )}
    </div>
  );
}
