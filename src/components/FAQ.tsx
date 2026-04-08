import { useState } from "react";
import type { FAQItem } from "../types";
import { SectionHeader } from "./ui";

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="bg-[#0b1120] px-4 sm:px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeader label="FAQ" title="Questions Answered" centered />
        </div>
        <div className="divide-y divide-[#1e2d45]">
          {items.map((item, i) => (
            <FAQRow
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FAQRowProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQRow({ item, isOpen, onToggle }: FAQRowProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 text-left font-[Syne] font-semibold text-base transition-colors duration-200 hover:text-cyan-400 bg-transparent border-0 text-white cursor-pointer"
      >
        {item.question}
        <span
          className={`text-cyan-400 text-xl font-mono font-light transition-transform duration-300 ml-4 flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out text-[0.9rem] text-[#6b7a99] leading-relaxed font-light ${
          isOpen ? "max-h-64 pb-5" : "max-h-0"
        }`}
      >
        {item.answer}
      </div>
    </div>
  );
}
