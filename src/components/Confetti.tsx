interface ConfettiProps {
  isActive: boolean;
  pieceCount?: number;
}

export default function Confetti({
  isActive,
  pieceCount = 100,
}: ConfettiProps) {
  if (!isActive) return null;

  const colors = [
    "#FFD700",
    "#00D9FF",
    "#3B82F6",
    "#FF8C00",
    "#FF1493",
    "#00FF00",
    "#FF69B4",
    "#32CD32",
    "#FF4500",
    "#1E90FF",
    "#FFB6C1",
    "#00CED1",
  ];

  const confettiPieces = Array.from({ length: pieceCount }, (_, i) => {
    const isRectangle = Math.random() > 0.5;
    const startY = Math.random() * 100 - 100; // Start above viewport
    const rotation = Math.random() * 360;

    return {
      id: i,
      left: Math.random() * 100,
      startY: startY,
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
      width: isRectangle ? 4 + Math.random() * 8 : 6 + Math.random() * 10,
      height: isRectangle ? 8 + Math.random() * 12 : 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      swayAmount: 30 + Math.random() * 50,
      swaySpeed: 1.5 + Math.random() * 1.5,
      isRectangle,
      rotation,
    };
  });

  return (
    <>
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: "fixed",
            left: `${piece.left}%`,
            top: `${piece.startY}%`,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            backgroundColor: piece.color,
            borderRadius: piece.isRectangle ? "2px" : "50%",
            pointerEvents: "none",
            zIndex: 9999,
            animation: `confetti-fall-${piece.id} ${piece.duration}s ease-in forwards`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
      <style>{`
        ${confettiPieces
          .map(
            (piece) => `
          @keyframes confetti-fall-${piece.id} {
            0% {
              transform: translateY(0) translateX(0) rotate(${piece.rotation}deg);
              opacity: 1;
            }
            25% {
              transform: translateY(30vh) translateX(${piece.swayAmount}px) rotate(${piece.rotation + 180}deg);
              opacity: 1;
            }
            50% {
              transform: translateY(60vh) translateX(-${piece.swayAmount}px) rotate(${piece.rotation + 360}deg);
              opacity: 1;
            }
            75% {
              transform: translateY(90vh) translateX(${piece.swayAmount * 0.5}px) rotate(${piece.rotation + 540}deg);
              opacity: 0.5;
            }
            100% {
              transform: translateY(120vh) translateX(0) rotate(${piece.rotation + 720}deg);
              opacity: 0;
            }
          }
        `,
          )
          .join("")}
      `}</style>
    </>
  );
}
