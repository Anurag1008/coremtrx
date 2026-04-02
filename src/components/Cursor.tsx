import { useEffect, useState } from "react";
import { useCursor } from "../hooks";

/** Only mounts the custom cursor when a mouse / fine pointer is available (not touch). */
export default function Cursor() {
  const [useFinePointer, setUseFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setUseFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!useFinePointer) return null;

  return <CursorLayers />;
}

function CursorLayers() {
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
