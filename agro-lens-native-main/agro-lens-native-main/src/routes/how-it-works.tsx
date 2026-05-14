import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Camera, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  component: HowPage,
  head: () => ({ meta: [{ title: "How AgroLens Works" }, { name: "description", content: "Three simple steps to diagnose any crop disease." }] }),
});

function HowPage() {
  const { t } = useI18n();
  const steps = [
    { icon: Camera, t: "how_1_t", d: "how_1_d" },
    { icon: Sparkles, t: "how_2_t", d: "how_2_d" },
    { icon: Leaf, t: "how_3_t", d: "how_3_d" },
  ];
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="font-display text-5xl sm:text-6xl font-extrabold">{t("how_title")}</h1>
      <div className="mt-14 space-y-6">
        {steps.map((s, i) => (
          <div key={i} className="rounded-3xl border border-border bg-card p-8 flex gap-6 items-start hover:shadow-[var(--shadow-card)] transition">
            <span className="font-display text-6xl font-extrabold text-primary/30 leading-none">0{i + 1}</span>
            <div className="flex-1">
              <span className="size-12 rounded-2xl bg-primary/10 text-primary grid place-items-center"><s.icon className="size-6" /></span>
              <h2 className="mt-4 font-display text-2xl font-bold">{t(s.t)}</h2>
              <p className="mt-2 text-muted-foreground text-lg leading-relaxed">{t(s.d)}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/scan"><Button size="lg" className="mt-10 rounded-full"><Camera className="size-5" /> {t("cta_scan")}</Button></Link>
    </section>
  );
}
