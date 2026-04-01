import type { OSFeature } from "../types";
import { SectionHeader, Reveal } from "./ui";

interface OSSectionProps {
  features: OSFeature[];
}

export default function OSSection({ features }: OSSectionProps) {
  return (
    <section
      id="os"
      className="px-4 sm:px-6 py-24 border-t border-b border-[#1e2d45]"
      style={{ background: "linear-gradient(135deg, #050810 0%, #0b1225 50%, #050810 100%)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <span className="inline-block font-mono text-[0.68rem] tracking-widest px-3.5 py-1.5 border border-rose-500 text-rose-500 uppercase mb-6">
            ★ Capstone Project
          </span>
          <SectionHeader
            label="The Big Build"
            title={<>You Will Write<br />a Real OS.</>}
          />
          <p className="text-[#6b7a99] text-sm leading-relaxed font-light mt-4 mb-6 max-w-md">
            Not a simulation. Not a toy example. A bootable mini operating system that runs in QEMU — from a blank screen to a working shell.
          </p>
          <ul className="space-y-0">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-[0.9rem] text-[#6b7a99] py-2.5 border-b border-[#1e2d45] font-light last:border-0">
                <span className="text-cyan-400 text-lg">⚡</span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Terminal */}
        <Reveal>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}

function Terminal() {
  return (
    <div className="bg-black border border-[#1e2d45] rounded overflow-hidden font-mono text-[0.78rem]">
      {/* Bar */}
      <div className="bg-[#101828] px-4 py-2.5 flex items-center gap-2 border-b border-[#1e2d45]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[0.7rem] text-[#555]">coremtrx_os — QEMU</span>
      </div>
      {/* Body */}
      <div className="p-6 leading-8 text-[#aaa]">
        <div><span className="text-[#444]">$</span> <span className="text-cyan-400">make</span> <span className="text-white">all</span></div>
        <div><span className="text-yellow-400">ld</span> -T linker.ld -o kernel.elf kernel.o boot.o</div>
        <div><span className="text-yellow-400">objcopy</span> -O binary kernel.elf kernel.bin</div>
        <div className="text-[#333]">...</div>
        <div><span className="text-cyan-400">✓</span> kernel.bin built (12KB)</div>
        <br />
        <div><span className="text-[#444]">$</span> <span className="text-cyan-400">qemu-system-i386</span> -kernel kernel.bin</div>
        <br />
        <div className="text-cyan-400">CoreMtrx OS v0.1</div>
        <div>
          <span className="text-yellow-400">CPU:</span> i386 |{" "}
          <span className="text-yellow-400">MEM:</span> 64MB |{" "}
          <span className="text-yellow-400">MODE:</span> Protected
        </div>
        <div>Initializing GDT... <span className="text-cyan-400">OK</span></div>
        <div>Initializing IDT... <span className="text-cyan-400">OK</span></div>
        <div>Scheduler: Round Robin (4 processes)</div>
        <br />
        <div className="text-white">
          CoreMtrx${" "}
          <span className="inline-block w-2 h-4 bg-white align-middle" style={{ animation: "blink 1s infinite" }} />
        </div>
      </div>
      <style>{`@keyframes blink { 50%{opacity:0} }`}</style>
    </div>
  );
}
