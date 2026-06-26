import { stats } from "@/lib/services";

/** Dark "By the numbers" card with corner glows (`.stats`). */
export function Stats() {
  return (
    <div className="stats-card bg-ink mt-20 rounded-3xl px-12 py-20 text-center text-white max-[900px]:rounded-[18px] max-[900px]:px-6 max-[900px]:py-12 max-[400px]:px-5">
      <div className="relative z-[1]">
        <div className="mb-12 text-base font-medium tracking-[-0.01em] text-white/60">
          By the numbers
        </div>
        <div className="grid grid-cols-4 gap-12 max-[900px]:grid-cols-2 max-[900px]:gap-8 max-[400px]:grid-cols-1 max-[400px]:gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-gradient-light mb-2 text-[clamp(40px,5vw,64px)] leading-none font-semibold tracking-[-0.04em]">
                {stat.value}
              </div>
              <div className="text-sm font-medium tracking-[-0.005em] text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
