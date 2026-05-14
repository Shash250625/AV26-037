import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Camera, RotateCcw, Volume2, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/scan")({
  component: ScanPage,
  head: () => ({ meta: [{ title: "Scan a Leaf — AgroLens" }, { name: "description", content: "Upload a leaf photo for instant crop disease diagnosis." }] }),
});

type Diagnosis = {
  diseaseKey: string;
  confidence: number;
  severity: "low" | "med" | "high";
  treatKey: string;
};

const POOL: Diagnosis[] = [
  { diseaseKey: "Tomato — Late Blight", confidence: 0.94, severity: "high", treatKey: "tomato_late" },
  { diseaseKey: "Wheat — Leaf Rust", confidence: 0.89, severity: "med", treatKey: "wheat_rust" },
  { diseaseKey: "Rice — Bacterial Leaf Blight", confidence: 0.92, severity: "high", treatKey: "rice_blb" },
  { diseaseKey: "Maize — Common Rust", confidence: 0.87, severity: "low", treatKey: "maize_rust" },
  { diseaseKey: "Potato — Early Blight", confidence: 0.91, severity: "med", treatKey: "potato_early" },
  { diseaseKey: "Healthy Leaf", confidence: 0.97, severity: "low", treatKey: "healthy" },
];

const TREATMENTS: Record<string, Partial<Record<Lang, string[]>>> = {
  tomato_late: {
    en: ["Remove infected leaves and burn them away from field.", "Spray copper oxychloride 0.3% every 7 days.", "Avoid overhead irrigation; water at the base.", "Plant resistant varieties next season."],
    hi: ["संक्रमित पत्तियाँ हटाकर खेत से दूर जलाएँ।", "हर 7 दिन में 0.3% कॉपर ऑक्सीक्लोराइड छिड़कें।", "ऊपर से सिंचाई न करें, जड़ में पानी दें।", "अगले मौसम में प्रतिरोधी किस्म लगाएँ।"],
    ta: ["தொற்றுள்ள இலைகளை அகற்றி வயலுக்கு வெளியே எரிக்கவும்.", "ஒவ்வொரு 7 நாட்களுக்கும் 0.3% காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்.", "மேல் நீர்ப்பாசனத்தைத் தவிர்க்கவும்.", "அடுத்த பருவத்தில் எதிர்ப்பு வகைகளை நடவும்."],
    te: ["సోకిన ఆకులను తీసి పొలానికి దూరంగా కాల్చండి.", "ప్రతి 7 రోజులకు 0.3% కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ చేయండి.", "పైనుండి నీరు పెట్టడం మానండి.", "వచ్చే సీజన్‌లో నిరోధక రకాలను నాటండి."],
    bn: ["সংক্রমিত পাতা সরিয়ে মাঠ থেকে দূরে পুড়িয়ে ফেলুন।", "প্রতি ৭ দিনে ০.৩% কপার অক্সিক্লোরাইড স্প্রে করুন।", "উপর থেকে সেচ এড়িয়ে চলুন।", "পরের মৌসুমে প্রতিরোধী জাত লাগান।"],
    kn: ["ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ಹೊಲದಿಂದ ದೂರ ಸುಡಿರಿ.", "ಪ್ರತಿ 7 ದಿನಗಳಿಗೊಮ್ಮೆ 0.3% ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಸಿಂಪಡಿಸಿ.", "ಮೇಲಿನಿಂದ ನೀರಾವರಿ ಮಾಡಬೇಡಿ; ಬೇರಿನ ಬಳಿ ನೀರು ಹಾಕಿ.", "ಮುಂದಿನ ಋತುವಿನಲ್ಲಿ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ನೆಡಿರಿ."]
  },
  wheat_rust: {
    en: ["Apply propiconazole 0.1% at first sign of pustules.", "Remove volunteer wheat plants near the field.", "Use rust-resistant seed varieties (HD-3086, DBW-187).", "Monitor weekly during cool, humid weather."],
    hi: ["फफोले दिखते ही 0.1% प्रोपिकोनाज़ोल छिड़कें।", "खेत के पास उगे जंगली गेहूँ हटाएँ।", "रस्ट-प्रतिरोधी बीज (HD-3086, DBW-187) उपयोग करें।", "ठंडे-नम मौसम में हर सप्ताह जाँचें।"],
    ta: ["முதல் கொப்புளம் தோன்றியதும் 0.1% ப்ரோபிகோனஸோல் தெளிக்கவும்.", "வயலுக்கு அருகில் வளரும் கோதுமைச் செடிகளை அகற்றவும்.", "துரு-எதிர்ப்பு விதைகளை பயன்படுத்தவும்.", "குளிர்-ஈரப்பதம் சீசனில் வாரந்தோறும் கண்காணிக்கவும்."],
    te: ["బొబ్బలు కనిపించిన వెంటనే 0.1% ప్రొపికోనజోల్ పిచికారీ చేయండి.", "పొలం దగ్గర పెరిగిన గోధుమ మొక్కలను తొలగించండి.", "తుప్పు-నిరోధక విత్తనాలను వాడండి.", "చల్లని, తేమ వాతావరణంలో వారానికోసారి తనిఖీ చేయండి."],
    bn: ["ফুসকুড়ি দেখা মাত্র ০.১% প্রোপিকোনাজল স্প্রে করুন।", "মাঠের কাছে গজানো গমের চারা সরান।", "মরিচা-প্রতিরোধী বীজ ব্যবহার করুন।", "ঠান্ডা-আর্দ্র আবহাওয়ায় সাপ্তাহিক পর্যবেক্ষণ করুন।"],
    kn: ["ಮೊದಲ ಗುಳ್ಳೆಗಳು ಕಂಡ ತಕ್ಷಣ 0.1% ಪ್ರೊಪಿಕೊನಜೋಲ್ ಸಿಂಪಡಿಸಿ.", "ಹೊಲದ ಬಳಿ ಬೆಳೆಯುವ ಗೋಧಿ ಗಿಡಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.", "ತುಕ್ಕು-ನಿರೋಧಕ ಬೀಜ ತಳಿಗಳನ್ನು ಬಳಸಿ.", "ತಂಪಾದ, ತೇವದ ಹವಾಮಾನದಲ್ಲಿ ವಾರಕ್ಕೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ."]
  },
  rice_blb: { en: ["Drain field and let soil dry for 2 days.", "Apply copper hydroxide 0.2% spray.", "Avoid excess nitrogen fertilizer.", "Use BLB-resistant varieties (Improved Samba Mahsuri)."], hi: ["खेत से पानी निकालकर 2 दिन सुखाएँ।", "0.2% कॉपर हाइड्रॉक्साइड छिड़कें।", "अत्यधिक नाइट्रोजन उर्वरक न डालें।", "BLB-प्रतिरोधी किस्म लगाएँ।"], ta: ["வயலில் இருந்து நீரை வெளியேற்றி 2 நாட்கள் உலர விடுங்கள்.", "0.2% காப்பர் ஹைட்ராக்சைடு தெளிக்கவும்.", "அதிக நைட்ரஜன் உரம் தவிர்க்கவும்.", "BLB-எதிர்ப்பு வகைகள் பயன்படுத்தவும்."], te: ["పొలం నుండి నీరు తీసి 2 రోజులు ఆరనివ్వండి.", "0.2% కాపర్ హైడ్రాక్సైడ్ పిచికారీ చేయండి.", "ఎక్కువ నైట్రోజన్ ఎరువు వాడకండి.", "BLB-నిరోధక రకాలను నాటండి."], bn: ["মাঠ থেকে পানি বের করে ২ দিন শুকাতে দিন।", "০.২% কপার হাইড্রক্সাইড স্প্রে করুন।", "অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন।", "BLB-প্রতিরোধী জাত ব্যবহার করুন।"], kn: ["ಹೊಲದಿಂದ ನೀರು ಹೊರಹಾಕಿ 2 ದಿನ ಮಣ್ಣು ಒಣಗಲು ಬಿಡಿ.", "0.2% ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್ ಸಿಂಪಡಿಸಿ.", "ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಗೊಬ್ಬರವನ್ನು ತಪ್ಪಿಸಿ.", "BLB-ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಳಸಿ."] },
  maize_rust: { en: ["Light infection — monitor for 5 days.", "Apply mancozeb 0.25% if spreading.", "Ensure good air flow between rows.", "Rotate with non-cereal crops next year."], hi: ["हल्का संक्रमण — 5 दिन निगरानी रखें।", "फैलने पर 0.25% मैन्कोज़ेब छिड़कें।", "पंक्तियों के बीच हवा का प्रवाह रखें।", "अगले साल गैर-अनाज फसल चक्र अपनाएँ।"], ta: ["லேசான தொற்று — 5 நாட்கள் கண்காணிக்கவும்.", "பரவினால் 0.25% மான்கோசெப் தெளிக்கவும்.", "வரிசைகளுக்கு இடையே காற்று ஓட்டம் உறுதி செய்யவும்.", "அடுத்த ஆண்டு தானியம் அல்லாத பயிர் சுழற்சி."], te: ["తేలికపాటి సోకుడు — 5 రోజులు పర్యవేక్షించండి.", "వ్యాప్తి చెందితే 0.25% మాంకోజెబ్ పిచికారీ చేయండి.", "వరుసల మధ్య గాలి ప్రసరణ ఉండేలా చూడండి.", "వచ్చే సంవత్సరం తృణధాన్యేతర పంటలతో మార్చండి."], bn: ["হালকা সংক্রমণ — ৫ দিন পর্যবেক্ষণ করুন।", "ছড়িয়ে পড়লে ০.২৫% ম্যানকোজেব স্প্রে করুন।", "সারির মধ্যে বাতাস চলাচল নিশ্চিত করুন।", "পরের বছর শস্য ঘুর্ণন করুন।"], kn: ["ಲಘು ಸೋಂಕು — 5 ದಿನ ಗಮನಿಸಿ.", "ಹರಡಿದರೆ 0.25% ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.", "ಸಾಲುಗಳ ನಡುವೆ ಗಾಳಿಯ ಹರಿವು ಇರಲಿ.", "ಮುಂದಿನ ವರ್ಷ ಧಾನ್ಯವಲ್ಲದ ಬೆಳೆಗಳೊಂದಿಗೆ ತಿರುಗಿಸಿ."] },
  potato_early: { en: ["Remove and destroy lower infected leaves.", "Spray chlorothalonil 0.2% every 10 days.", "Mulch soil to reduce splash from rain.", "Avoid working in wet fields."], hi: ["नीचे की संक्रमित पत्तियाँ हटा दें।", "हर 10 दिन में 0.2% क्लोरोथैलोनिल छिड़कें।", "मिट्टी पर मल्च बिछाएँ।", "गीले खेत में काम न करें।"], ta: ["கீழ் தொற்றுள்ள இலைகளை அகற்றுங்கள்.", "ஒவ்வொரு 10 நாட்களுக்கும் 0.2% குளோரோதலோனில் தெளிக்கவும்.", "மண்ணில் மல்ச் பரப்பவும்.", "ஈரமான வயலில் வேலை செய்யாதீர்கள்."], te: ["కింది సోకిన ఆకులను తీసివేయండి.", "ప్రతి 10 రోజులకు 0.2% క్లోరోతలోనిల్ పిచికారీ చేయండి.", "నేలపై మల్చ్ వేయండి.", "తడి పొలంలో పని చేయవద్దు."], bn: ["নিচের সংক্রমিত পাতা সরান।", "প্রতি ১০ দিনে ০.২% ক্লোরোথ্যালোনিল স্প্রে করুন।", "মাটিতে মালচ দিন।", "ভেজা মাঠে কাজ এড়িয়ে চলুন।"], kn: ["ಕೆಳಗಿನ ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ನಾಶಮಾಡಿ.", "ಪ್ರತಿ 10 ದಿನಗಳಿಗೊಮ್ಮೆ 0.2% ಕ್ಲೋರೋಥಲೊನಿಲ್ ಸಿಂಪಡಿಸಿ.", "ಮಣ್ಣಿನ ಮೇಲೆ ಮಲ್ಚ್ ಹಾಕಿ.", "ಒದ್ದೆ ಹೊಲದಲ್ಲಿ ಕೆಲಸ ಮಾಡಬೇಡಿ."] },
  healthy: { en: ["Your crop looks healthy! Keep monitoring weekly.", "Maintain balanced fertilization.", "Watch for early signs after rain."], hi: ["आपकी फसल स्वस्थ दिख रही है! साप्ताहिक निगरानी जारी रखें।", "संतुलित उर्वरक देते रहें।", "बारिश के बाद शुरुआती लक्षणों पर ध्यान दें।"], ta: ["உங்கள் பயிர் ஆரோக்கியமாக உள்ளது! வாரந்தோறும் கண்காணியுங்கள்.", "சமச்சீர் உரமிடல் பேணுங்கள்.", "மழைக்குப் பின் ஆரம்ப அறிகுறிகளை கவனியுங்கள்."], te: ["మీ పంట ఆరోగ్యంగా ఉంది! వారానికోసారి పర్యవేక్షించండి.", "సమతుల్య ఎరువులను కొనసాగించండి.", "వర్షం తర్వాత లక్షణాలను గమనించండి."], bn: ["আপনার ফসল সুস্থ! সাপ্তাহিক পর্যবেক্ষণ চালিয়ে যান।", "সুষম সার বজায় রাখুন।", "বৃষ্টির পর প্রাথমিক লক্ষণ দেখুন।"], kn: ["ನಿಮ್ಮ ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿ ಕಾಣುತ್ತಿದೆ! ವಾರಕ್ಕೊಮ್ಮೆ ಗಮನಿಸುತ್ತಿರಿ.", "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡುತ್ತಿರಿ.", "ಮಳೆಯ ನಂತರ ಆರಂಭಿಕ ಲಕ್ಷಣಗಳಿಗೆ ಗಮನ ಕೊಡಿ."] },
};

const SEV_COLOR = { low: "bg-emerald-500", med: "bg-amber-500", high: "bg-destructive" };

function ScanPage() {
  const { t, lang } = useI18n();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "analyzing" | "done">("idle");
  const [result, setResult] = useState<Diagnosis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setState("analyzing");
    setResult(null);
    setTimeout(() => {
      setResult(POOL[Math.floor(Math.random() * POOL.length)]);
      setState("done");
    }, 2200);
  };

  const reset = () => { setImgUrl(null); setResult(null); setState("idle"); };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speak = async (text: string) => {
    // Google Translate language codes (work for all our Indian languages).
    const gmap: Partial<Record<Lang, string>> = { en: "en", hi: "hi", ta: "ta", te: "te", bn: "bn", kn: "kn", mr: "mr", gu: "gu", pa: "pa", ml: "ml", or: "or", ur: "ur" };
    const code = gmap[lang] ?? "en";
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      const url = `/api/public/tts?lang=${code}&text=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      audioRef.current = audio;
      await audio.play();
      return;
    } catch {
      // Fallback to browser speechSynthesis
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const u = new SpeechSynthesisUtterance(text);
      const bcp: Partial<Record<Lang, string>> = { en: "en-IN", hi: "hi-IN", ta: "ta-IN", te: "te-IN", bn: "bn-IN", kn: "kn-IN", mr: "mr-IN", gu: "gu-IN", pa: "pa-IN", ml: "ml-IN", or: "or-IN", ur: "ur-IN" };
      u.lang = bcp[lang] ?? "en-IN";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold">{t("scan_title")}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{t("scan_sub")}</p>

      {state === "idle" && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
          className="mt-10 rounded-3xl border-2 border-dashed border-border bg-card p-12 text-center hover:border-primary hover:bg-primary/5 transition cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <span className="size-16 rounded-2xl bg-primary/10 text-primary grid place-items-center mx-auto">
            <Upload className="size-8" />
          </span>
          <p className="mt-5 text-lg">{t("scan_drop")} <span className="text-primary font-semibold underline">{t("scan_browse")}</span></p>
          <input ref={inputRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          <Button className="mt-6 rounded-full" size="lg"><Camera className="size-5" /> {t("cta_scan")}</Button>
        </div>
      )}

      {state !== "idle" && imgUrl && (
        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <div className="relative rounded-3xl overflow-hidden bg-card aspect-square shadow-[var(--shadow-card)]">
            <img src={imgUrl} alt="Uploaded leaf" className="w-full h-full object-cover" />
            {state === "analyzing" && (
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm grid place-items-center">
                <div className="text-center">
                  <Loader2 className="size-12 text-primary animate-spin mx-auto" />
                  <p className="mt-4 font-display text-xl font-semibold">{t("scan_analyzing")}</p>
                  <div className="mt-3 flex gap-1 justify-center">
                    {[0,1,2].map(i => <span key={i} className="size-2 rounded-full bg-primary animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            {state === "done" && result && (
              <div className="rounded-3xl bg-card border border-border p-7 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {result.treatKey === "healthy" ? <CheckCircle2 className="size-4 text-primary" /> : <AlertTriangle className="size-4 text-accent" />}
                  {t("scan_result")}
                </div>
                <h2 className="mt-2 font-display text-3xl font-extrabold">{result.diseaseKey}</h2>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("scan_confidence")}</p>
                    <p className="mt-1 font-display text-2xl font-bold text-primary">{Math.round(result.confidence * 100)}%</p>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${result.confidence * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("scan_severity")}</p>
                    <span className={`mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-white ${SEV_COLOR[result.severity]}`}>
                      <span className="size-1.5 rounded-full bg-white" />
                      {t(`sev_${result.severity === "med" ? "med" : result.severity}`)}
                    </span>
                  </div>
                </div>

                {(() => {
                  const steps = TREATMENTS[result.treatKey][lang] ?? TREATMENTS[result.treatKey].en ?? [];
                  return (
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold">{t("scan_treat")}</h3>
                    <Button size="sm" variant="ghost" className="rounded-full" onClick={() => speak(steps.join(". "))}>
                      <Volume2 className="size-4" /> Listen
                    </Button>
                  </div>
                  <ol className="mt-3 space-y-3">
                    {steps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="size-7 shrink-0 rounded-full bg-primary/10 text-primary grid place-items-center text-sm font-bold">{i + 1}</span>
                        <p className="text-foreground/90 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                  );
                })()}

                <Button onClick={reset} variant="outline" className="mt-7 rounded-full w-full" size="lg">
                  <RotateCcw className="size-4" /> {t("scan_again")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
