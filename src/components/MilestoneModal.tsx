import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Milestone } from "@/data/portfolioData";
import { X, Calendar, Tag, ChevronRight } from "lucide-react";
interface MilestoneModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
}
export default function MilestoneModal({
  milestone,
  isOpen,
  onClose,
}: MilestoneModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!milestone) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 50,
                rotateX: 10,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                y: 50,
                rotateX: -10,
              }}
              transition={{
                type: "spring",
                bounce: 0.4,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative group"
              style={{
                borderColor: milestone.color,
                boxShadow: `0 0 50px ${milestone.color}20`,
              }}
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />

              {/* Header */}
              <div className="relative p-8 overflow-hidden">
                {/* Header Background Pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundColor: milestone.color,
                    backgroundImage:
                      "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 10px 10px",
                  }}
                />

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-start gap-6">
                    <motion.div
                      initial={{
                        scale: 0,
                        rotate: -180,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                      }}
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg border-2 border-white/20"
                      style={{
                        backgroundColor: milestone.color,
                        boxShadow: `0 0 20px ${milestone.color}60`,
                      }}
                    >
                      {milestone.icon}
                    </motion.div>

                    <div>
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.3,
                        }}
                      >
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-2 border border-white/20 bg-black/30 text-white/80">
                          {milestone.type}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-2">
                          {milestone.title}
                        </h2>
                      </motion.div>

                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          delay: 0.4,
                        }}
                        className="flex items-center gap-3 text-slate-300 text-sm font-medium"
                      >
                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded">
                          <Calendar size={14} className="text-white/60" />
                          <span>{milestone.date}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8 bg-slate-900/50 backdrop-blur-sm">
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  className="text-slate-300 leading-relaxed text-lg border-l-2 border-slate-700 pl-4"
                >
                  {milestone.description}
                </motion.p>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.6,
                  }}
                >
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Tag size={12} />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {milestone.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay: 0.7 + index * 0.05,
                        }}
                        className="px-3 py-1.5 rounded text-sm font-medium bg-slate-800 border border-slate-700 text-cyan-300 shadow-sm hover:border-cyan-500/50 transition-colors cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
                <div className="text-xs text-slate-500 font-mono">
                  ID: {milestone.id.toString().padStart(4, "0")}
                </div>
                <button
                  onClick={onClose}
                  className="group relative px-8 py-3 rounded-lg font-bold overflow-hidden transition-transform active:scale-95"
                >
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{
                      backgroundColor: milestone.color,
                    }}
                  />
                  <div
                    className="relative flex items-center gap-2"
                    style={{
                      color: milestone.color,
                    }}
                  >
                    <span>CONTINUE DRIVING</span>
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
