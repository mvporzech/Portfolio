import { motion } from "framer-motion";

const DOT_COUNT = 8;
const DOT_RADIUS = 24;
const SPINNER_DURATION = 1.1;

type TransitionPhase = "loading" | "exiting";

type LanguageTransitionProps = {
  phase: TransitionPhase;
  label: string;
};

function DotSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.65, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-16 w-16"
      aria-hidden
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: SPINNER_DURATION, repeat: Infinity, ease: "linear" }}
        className="relative h-full w-full"
      >
        {Array.from({ length: DOT_COUNT }, (_, index) => {
          const angle = (index / DOT_COUNT) * Math.PI * 2;
          const x = Math.cos(angle) * DOT_RADIUS;
          const y = Math.sin(angle) * DOT_RADIUS;
          const opacity = 0.25 + (index / DOT_COUNT) * 0.75;

          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.045, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-silver-bright"
              style={{ marginLeft: x, marginTop: y }}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export function LanguageTransition({ phase, label }: LanguageTransitionProps) {
  const isLoading = phase === "loading";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      aria-live="polite"
      aria-label={label}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-black/35 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.92, filter: "blur(10px)" }}
        animate={{
          opacity: isLoading ? 1 : 0,
          y: isLoading ? 0 : -8,
          scale: isLoading ? 1 : 0.7,
          filter: isLoading ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <DotSpinner />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18, ease: "easeOut" }}
          className="font-mono text-xs uppercase tracking-[0.28em] text-silver-bright"
        >
          {label}
        </motion.p>
      </motion.div>
    </div>
  );
}
