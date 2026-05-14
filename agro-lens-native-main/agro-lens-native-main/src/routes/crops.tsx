import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/crops")({
  component: CropsPage,
  head: () => ({ meta: [{ title: "Supported Crops — AgroLens" }, { name: "description", content: "AgroLens supports 40+ diseases across rice, wheat, maize, tomato and more." }] }),
});

const CROPS = [
  { name: "Rice", emoji: "🌾", diseases: ["Bacterial Leaf Blight", "Blast", "Brown Spot", "Sheath Blight"] },
  { name: "Wheat", emoji: "🌾", diseases: ["Leaf Rust", "Stripe Rust", "Powdery Mildew", "Karnal Bunt"] },
  { name: "Maize", emoji: "🌽", diseases: ["Common Rust", "Northern Leaf Blight", "Gray Leaf Spot"] },
  { name: "Tomato", emoji: "🍅", diseases: ["Early Blight", "Late Blight", "Leaf Curl", "Mosaic Virus"] },
  { name: "Potato", emoji: "🥔", diseases: ["Early Blight", "Late Blight", "Black Scurf"] },
  { name: "Cotton", emoji: "🪴", diseases: ["Bacterial Blight", "Leaf Curl Virus", "Boll Rot"] },
  { name: "Sugarcane", emoji: "🎋", diseases: ["Red Rot", "Smut", "Rust"] },
  { name: "Coffee", emoji: "☕", diseases: ["Leaf Rust", "Berry Disease"] },
  { name: "Banana", emoji: "🍌", diseases: ["Panama Wilt", "Sigatoka", "Bunchy Top"] },
  { name: "Mango", emoji: "🥭", diseases: ["Anthracnose", "Powdery Mildew", "Mealy Bug"] },
  { name: "Chili", emoji: "🌶️", diseases: ["Anthracnose", "Leaf Curl", "Wilt"] },
  { name: "Grape", emoji: "🍇", diseases: ["Downy Mildew", "Powdery Mildew", "Anthracnose"] },
];

function CropsPage() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="font-display text-5xl sm:text-6xl font-extrabold">{t("crops_title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">12 staple crops · 40+ diseases · trained on 100,000+ field photos.</p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CROPS.map((c) => (
          <div key={c.name} className="rounded-3xl border border-border bg-card p-6 hover:border-primary hover:shadow-[var(--shadow-card)] transition">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{c.emoji}</span>
              <h3 className="font-display text-2xl font-bold">{c.name}</h3>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              {c.diseases.map((d) => <li key={d} className="flex items-center gap-2"><span className="size-1 rounded-full bg-primary" />{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
