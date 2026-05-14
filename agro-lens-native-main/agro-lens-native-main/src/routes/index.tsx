import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Languages, Volume2, WifiOff, Sparkles } from "lucide-react";
import heroLeaf from "@/assets/hero-leaf.jpg";
import farmer from "@/assets/farmer.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "AgroLens — Crop Disease Detection in Your Language" },
      { name: "description", content: "Snap a leaf, get instant crop disease diagnosis and treatment in your local language. Built for rural farmers." },
    ],
  }),
});

const CROPS = [
  { name: "Rice", emoji: "🌾" }, { name: "Wheat", emoji: "🌾" }, { name: "Maize", emoji: "🌽" },
  { name: "Tomato", emoji: "🍅" }, { name: "Potato", emoji: "🥔" }, { name: "Cotton", emoji: "🪴" },
  { name: "Sugarcane", emoji: "🎋" }, { name: "Coffee", emoji: "☕" }, { name: "Banana", emoji: "🍌" },
  { name: "Mango", emoji: "🥭" }, { name: "Chili", emoji: "🌶️" }, { name: "Grape", emoji: "🍇" },
];

function Home() {
  const { t } = useI18n();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          data-decorative-bg="true"
          className="absolute inset-0 -z-10 opacity-[0.18]"
          style={{ backgroundImage: `url(${heroLeaf})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> {t("hero_eyebrow")}
            </span>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-foreground">
              {t("hero_title")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{t("hero_sub")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/scan">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 h-12 px-6 text-base shadow-[var(--shadow-leaf)]">
                  <Camera className="size-5" /> {t("cta_scan")}
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-6 text-base">
                  {t("cta_learn")} <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {LANGUAGES.slice(0, 7).map((l) => (
                <span key={l.code} className="font-medium text-foreground/80">{l.native}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/40 blur-3xl rounded-full" />
              <img
                src={farmer}
                alt="Farmer using AgroLens in a wheat field"
                width={1024}
                height={1024}
                className="relative rounded-[2rem] shadow-[var(--shadow-card)] object-cover aspect-square w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-[var(--shadow-card)] p-4 border border-border/60 max-w-[220px]">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary"><span className="size-2 rounded-full bg-primary animate-pulse" /> Live diagnosis</div>
                <p className="mt-2 font-display font-bold">Tomato Late Blight</p>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "94%" }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">94% confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/50 bg-card/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "40+", k: "stat_1" }, { n: "7", k: "stat_2" },
            { n: "120k", k: "stat_3" }, { n: "96%", k: "stat_4" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-4xl font-extrabold text-primary">{s.n}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(s.k)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <h2 className="font-display text-4xl sm:text-5xl font-bold max-w-2xl">{t("feat_title")}</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Camera, t: "feat_1_t", d: "feat_1_d" },
            { icon: Languages, t: "feat_2_t", d: "feat_2_d" },
            { icon: Volume2, t: "feat_3_t", d: "feat_3_d" },
            { icon: WifiOff, t: "feat_4_t", d: "feat_4_d" },
          ].map((f, i) => (
            <div key={i} className="group rounded-3xl border border-border/60 bg-card p-6 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all">
              <span className="size-12 rounded-2xl bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{t(f.t)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(f.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CROPS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <h2 className="font-display text-3xl sm:text-4xl font-bold">{t("crops_title")}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {CROPS.map((c) => (
            <span key={c.name} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary hover:bg-primary/5 transition">
              <span className="text-lg">{c.emoji}</span>{c.name}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="rounded-[2.5rem] p-10 sm:p-16 text-primary-foreground relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-white/10 blur-3xl" />
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold max-w-2xl">{t("hero_title")}</h2>
          <p className="mt-4 text-primary-foreground/90 max-w-xl text-lg">{t("hero_sub")}</p>
          <Link to="/scan" className="mt-8 inline-block">
            <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90 h-12 px-6 text-base">
              <Camera className="size-5" /> {t("cta_scan")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
