import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import farmer from "@/assets/farmer.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About AgroLens" }, { name: "description", content: "Built with farmers, for farmers — across India, Latin America, and East Africa." }] }),
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold">{t("about_title")}</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("about_p")}</p>
        <div className="mt-10 grid grid-cols-2 gap-6">
          {[{n:"40+",k:"stat_1"},{n:"7",k:"stat_2"},{n:"120k",k:"stat_3"},{n:"96%",k:"stat_4"}].map(s=>(
            <div key={s.k}><p className="font-display text-4xl font-extrabold text-primary">{s.n}</p><p className="text-sm text-muted-foreground mt-1">{t(s.k)}</p></div>
          ))}
        </div>
      </div>
      <img src={farmer} alt="Farmer" loading="lazy" width={1024} height={1024} className="rounded-[2rem] shadow-[var(--shadow-card)]" />
    </section>
  );
}
