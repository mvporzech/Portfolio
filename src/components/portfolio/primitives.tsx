import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export const softSpring = { type: "spring" as const, stiffness: 60, damping: 20, mass: 1 };

export function Reveal({ children, delay = 0, className, x = 0 }: { children: ReactNode; delay?: number; className?: string; x?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: x ? 0 : 40, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...softSpring, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <Reveal className="mb-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-crimson-bright">{label}</p>
      <h2 className="text-metal text-4xl font-semibold tracking-tight md:text-6xl">{title}</h2>
    </Reveal>
  );
}

type MagneticProps = HTMLMotionProps<"a"> & { variant?: "crimson" | "ghost" };

export function MagneticButton({ children, className, variant = "crimson", ...rest }: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 120, damping: 14 });
  const y = useSpring(0, { stiffness: 120, damping: 14 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-wide transition-shadow duration-500",
        variant === "crimson"
          ? "bg-crimson text-primary-foreground glow-crimson hover:shadow-[0_0_60px_-4px_var(--crimson-bright)]"
          : "liquid-glass text-silver-bright hover:border-crimson-bright/60",
        className,
      )}
      {...rest}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-3">{children as ReactNode}</span>
    </motion.a>
  );
}

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 80, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 80, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY] as never,
    ([gx, gy]: string[]) => `radial-gradient(circle at ${gx} ${gy}, oklch(1 0 0 / 0.12), transparent 55%)`,
  );

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("group liquid-glass relative h-full rounded-2xl transition-shadow duration-700 hover:shadow-[0_0_70px_-20px_var(--crimson-bright)]", className)}
      >
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-2xl" />
        <div style={{ transform: "translateZ(40px)" }} className="relative h-full">{children}</div>
      </motion.div>
    </div>
  );
}

export function LiquidBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blob blob-crimson left-[-10%] top-[-10%] h-[55vw] w-[55vw]" />
      <div className="blob blob-silver right-[-15%] top-[20%] h-[45vw] w-[45vw] [animation-delay:-8s] [animation-duration:32s]" />
      <div className="blob blob-crimson bottom-[-20%] left-[30%] h-[40vw] w-[40vw] opacity-60 [animation-delay:-16s] [animation-duration:38s]" />
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
}

export function GithubIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
