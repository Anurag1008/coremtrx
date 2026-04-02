import { Link } from "react-router-dom";
import type { NavLink } from "../types";

interface NavbarProps {
  links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
  return (
    <nav
      className="fixed top-0 left-1/2 z-50 flex w-full max-w-[1600px] min-w-0 -translate-x-1/2 items-center justify-between px-4 sm:px-6 h-[70px] bg-[#050810]/90 backdrop-blur-xl border-b border-[#1e2d45]/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] md:w-[80%]"
      aria-label="Main"
    >
      <Link to="/" className="no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-sm">
        <Logo />
      </Link>
      <ul className="hidden md:flex gap-8 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-mono text-[0.72rem] tracking-widest text-[#6b7a99] hover:text-cyan-400 transition-colors duration-200 no-underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#pricing"
        className="font-mono text-[0.72rem] tracking-widest font-bold px-5 py-2.5 bg-cyan-400 text-black no-underline transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
        style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
      >
        ENROLL NOW
      </a>
    </nav>
  );
}

export function Logo() {
  return (
    <span className="font-[Syne] font-extrabold text-2xl tracking-tight text-white">
      Core<span className="text-cyan-400">Mtrx</span>
    </span>
  );
}
