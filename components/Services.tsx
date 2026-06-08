import { Container } from "@/components/ui/Container";
import { Stats } from "@/components/Stats";
import { services, type Service } from "@/lib/services";

const cardBase =
  "bento-card relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-transparent bg-section p-9 transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-border hover:bg-white hover:shadow-card";

function BentoCard({ service }: { service: Service }) {
  const isFeature = service.size === "feature";
  const span = isFeature
    ? "col-span-3 row-span-2 max-[900px]:col-span-1 max-[900px]:row-auto"
    : "col-span-3 max-[900px]:col-span-1";

  return (
    <article className={`${cardBase} ${span}`}>
      <div>
        <div className="text-accent mb-3.5 font-mono text-xs font-medium tracking-[0.02em]">
          {service.num} — {service.label}
        </div>
        <h3
          className={`text-ink mb-3.5 leading-[1.1] font-semibold tracking-[-0.03em] ${
            isFeature ? "text-[36px]" : "text-[28px]"
          }`}
        >
          {service.title}
        </h3>
        <p className="text-dim mb-6 text-[15px] leading-[1.55] tracking-[-0.005em]">
          {service.desc}
        </p>
      </div>

      {service.visual && (
        <div
          className="relative my-3 flex min-h-[80px] flex-1 items-center justify-center"
          aria-hidden="true"
        >
          <div className="bento-blob bento-blob-1" />
          <div className="bento-blob bento-blob-2" />
        </div>
      )}

      <div className="border-border flex items-center justify-between border-t pt-[18px] text-[13px]">
        <div className="text-ink font-semibold tracking-[-0.01em]">
          {service.price}
        </div>
        <div className="text-faint font-mono text-[11px] tracking-[0.02em]">
          {service.detail}
        </div>
      </div>
    </article>
  );
}

/** "Three ways to work together" bento grid + stats (`#services`). */
export function Services() {
  return (
    <section id="services" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          What I do
        </span>
        <h2 className="text-ink mb-5 max-w-[720px] text-[clamp(36px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          Four ways to work together.
        </h2>
        <p className="text-dim mb-16 max-w-[600px] text-[19px] leading-[1.5] tracking-[-0.01em]">
          Pick the engagement that matches where you are. Most clients start
          with one and grow into another.
        </p>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-6 gap-4 max-[900px]:grid-cols-1">
          {services.map((service) => (
            <BentoCard key={service.num} service={service} />
          ))}
        </div>

        <Stats />
      </Container>
    </section>
  );
}
