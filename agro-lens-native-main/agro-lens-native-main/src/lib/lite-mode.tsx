import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const Ctx = createContext<{ lite: boolean; toggle: () => void; online: boolean }>({
  lite: false, toggle: () => {}, online: true,
});

export function LiteModeProvider({ children }: { children: ReactNode }) {
  const [lite, setLite] = useState(false);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("agrolens-lite") === "1";
    setLite(saved);
    setOnline(navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("lite", lite);
    }
  }, [lite]);

  const toggle = () => {
    setLite((v) => {
      const next = !v;
      localStorage.setItem("agrolens-lite", next ? "1" : "0");
      return next;
    });
  };

  return <Ctx.Provider value={{ lite, toggle, online }}>{children}</Ctx.Provider>;
}

export const useLiteMode = () => useContext(Ctx);
