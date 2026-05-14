import { Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="size-8 rounded-lg bg-primary text-primary-foreground grid place-items-center"><Leaf className="size-4" /></span>
          <span className="font-display font-bold">AgroLens</span>
          <span className="text-muted-foreground text-sm ml-2">— {t("footer_tag")}</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AgroLens</p>
      </div>
    </footer>
  );
}
