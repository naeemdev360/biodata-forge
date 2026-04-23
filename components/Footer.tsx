import { Heart, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="w-full py-6 px-6 border-t"
      style={{
        background: "#FAFAF9",
        borderColor: "rgba(212,130,42,0.12)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <span
          className="text-sm font-semibold tracking-tight select-none"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "1rem",
          }}
        >
          <span style={{ color: "#D4822A" }}>Biodata</span>
          <span style={{ color: "#242220" }}>Forge</span>
        </span>

        {/* Credit */}
        <p
          className="text-xs flex items-center gap-1.5"
          style={{ color: "#A39F98" }}
        >
          Developed with
          <Heart
            size={11}
            fill="#D4822A"
            style={{ color: "#D4822A", flexShrink: 0 }}
          />
          by
          <span style={{ color: "#6B6560", fontWeight: 600 }}>Naeem Hasan</span>
        </p>

        {/* GitHub */}
        <Link
          href="https://github.com/naeemdev360"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium no-underline transition-colors duration-150 hover:opacity-80"
          style={{ color: "#6B6560" }}
        >
          <SquareArrowOutUpRight size={14} />
          naeemdev360
        </Link>
      </div>
    </footer>
  );
}
