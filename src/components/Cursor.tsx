import { useCursor } from "../hooks";

export default function Cursor() {
  const { dotPos, ringPos } = useCursor();

  return (
    <>
      <div
        className="fixed w-2.5 h-2.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-100"
        style={{ transform: `translate(${dotPos.x - 5}px, ${dotPos.y - 5}px)` }}
      />
      <div
        className="fixed w-9 h-9 border border-cyan-400 rounded-full pointer-events-none z-[9998] opacity-50 mix-blend-screen"
        style={{ transform: `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px)`, transition: "none" }}
      />
    </>
  );
}
