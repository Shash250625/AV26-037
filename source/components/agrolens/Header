import { Link } from "@tanstack/react-router";
import { Leaf, Globe2, Check, Battery, WifiOff } from "lucide-react";
import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";
import { useLiteMode } from "@/lib/lite-mode";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const { lite, toggle, online } = useLiteMode();
  const current = LANGUAGES.find((l) => l.code === lang)!;
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="size-9 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-[var(--shadow-leaf)] group-hover:rotate-6 transition-transform">
            <Leaf className="size-5" />
          </span>
          <span className="font-display font-extrabold text-xl tracking-tight">AgroLens</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/scan" className="hover:text-foreground transition">{t("nav_scan")}</Link>
          <Link to="/how-it-works" className="hover:text-foreground transition">{t("nav_how")}</Link>
          <Link to="/crops" className="hover:text-foreground transition">{t("nav_crops")}</Link>
          <Link to="/about" className="hover:text-foreground transition">{t("nav_about")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          {!online && (
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-destructive/10 text-destructive px-3 py-1 text-xs font-semibold">
              <WifiOff className="size-3" /> Offline
            </span>
          )}
          <Button
            onClick={toggle}
            variant={lite ? "default" : "outline"}
            size="sm"
            className="rounded-full gap-2"
            title={lite ? "Lite mode on — saves data & battery" : "Turn on Lite mode for low-power / remote use"}
          >
            <Battery className="size-4" />
            <span className="hidden sm:inline">{lite ? "Lite ON" : "Lite"}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full gap-2">
                <Globe2 className="size-4" />
                <span className="hidden sm:inline">{current.native}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLang(l.code as Lang)} className="flex justify-between">
                  <span><span className="font-medium">{l.native}</span> <span className="text-muted-foreground text-xs">· {l.english}</span></span>
                  {l.code === lang && <Check className="size-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/scan" className="hidden lg:block">
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">{t("cta_scan")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
