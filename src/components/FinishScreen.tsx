import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RefreshCw, Send, CheckCircle, Linkedin } from "lucide-react";
import { useSendEmail } from "@/hooks/useSendEmail";
import Confetti from "@/components/Confetti";
interface FinishScreenProps {
  isOpen: boolean;
  onRestart: () => void;
}
export default function FinishScreen({ onRestart }: FinishScreenProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { isSubmitting, isSent, sendEmail } = useSendEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail(formState);
  };

  return (
    <AnimatePresence>
      <Confetti isActive />
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{
            scale: 0.8,
            y: 50,
          }}
          animate={{
            scale: 1,
            y: 0,
          }}
          className="w-full max-w-lg bg-slate-900 border-2 border-yellow-500 rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.3)] overflow-hidden relative"
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
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
                type: "spring",
                bounce: 0.5,
                delay: 0.2,
              }}
              className="w-20 h-20 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-white"
            >
              <Trophy size={40} className="text-yellow-800" />
            </motion.div>
            <h2 className="text-3xl font-black text-white uppercase tracking-widest italic">
              Mission Complete!
            </h2>
            <p className="text-yellow-100 font-medium mt-2">
              You've explored the entire journey.
            </p>
          </div>

          <div className="p-8">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    Let's Build Something Together
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Send me a message to discuss your next project or just say
                    hi!
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold text-slate-500 uppercase mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Player One"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-slate-500 uppercase mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="player@example.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-slate-500 uppercase mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    maxLength={250}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                    placeholder="Ready to start the next level..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        message: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-slate-500 text-right mt-1">
                    {formState.message.length}/250
                  </p>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onRestart}
                    className="flex-1 py-3 px-4 rounded font-bold text-slate-300 border border-slate-600 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Replay
                  </button>
                  <a
                    href="https://www.linkedin.com/in/robert-joshua-lopez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded font-bold text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors flex items-center justify-center gap-2"
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-3 px-4 rounded font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-slate-400 mb-8">
                  Thanks for reaching out. I'll get back to you faster than this
                  car drives.
                </p>
                <button
                  onClick={onRestart}
                  className="w-full py-3 px-4 rounded font-bold text-white bg-slate-700 hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  Play Again
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
