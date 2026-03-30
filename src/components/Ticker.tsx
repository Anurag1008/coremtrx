interface TickerProps {
  items: string[];
}

export default function Ticker({ items }: TickerProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="bg-cyan-400 overflow-hidden py-3">
      <div
        className="flex gap-[60px] whitespace-nowrap"
        style={{ animation: "tick 20s linear infinite", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-[0.72rem] font-bold tracking-widest uppercase text-black">
            {item}
            <span className="opacity-40 ml-[60px]">///</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}
