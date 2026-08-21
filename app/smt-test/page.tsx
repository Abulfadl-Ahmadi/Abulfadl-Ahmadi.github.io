"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Header } from "@/components/header";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import { ShieldAlert, RefreshCcw } from "lucide-react";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const dims = [
  { name: "اعتماد در برابر پارانویا", short: "پارانویا", max: 25 },
  { name: "مدیریت ریسک و تفکر سیستمی", short: "تفکر سیستمی", max: 25 },
  { name: "تفکر بدبینانه (اصول اولیه)", short: "تفکر بدبینانه", max: 25 },
  { name: "حساسیت به حریم خصوصی", short: "حریم خصوصی", max: 25 },
];

const questions = [
  // Dim 0
  { dim: 0, text: "من همیشه فرض می‌کنم که ورودی‌های یک سیستم، حتی اگر از منابع مجاز باشند، آلوده هستند.", reverse: false },
  { dim: 0, text: "وقتی با مکانیزم امنیتی جدیدی روبرو می‌شوم، بلافاصله دنبال راه‌هایی برای دور زدن آن می‌گردم.", reverse: false },
  { dim: 0, text: "وقتی کدی بدون باگ اجرا می‌شود و خروجی درستی می‌دهد، فرض می‌کنم از نظر امنیتی هم کاملاً ایمن است.", reverse: true },
  { dim: 0, text: "من همیشه فرض می‌کنم که شبکه داخلی سازمان به اندازه اینترنت عمومی ناامن (Zero-Trust) است.", reverse: false },
  { dim: 0, text: "اگر یک کتابخانه معروف (Open Source) توسط هزاران نفر استفاده شود، به امنیت کدهای آن اعتماد می‌کنم.", reverse: true },
  
  // Dim 1
  { dim: 1, text: "تغییرات کوچک در یک بخش از سیستم، همواره منجر به تغییرات و پیامدهای پیش‌بینی‌نشده در بخش‌های دیگر می‌شود.", reverse: false },
  { dim: 1, text: 'پیش از اجرای هر راه‌حل، بلافاصله از خود می‌پرسم "و بعد چه؟" و اثرات جانبی آن را شبیه‌سازی می‌کنم.', reverse: false },
  { dim: 1, text: "من می‌توانم یک مسئله پیچیده را از لایه معماری تا لایه فلز تجزیه کرده و الگوهای پنهان ارتباطی را بیابم.", reverse: false },
  { dim: 1, text: "هنگام برخورد با یک رخنه امنیتی، مسدود کردن سریع مسیر حمله (مثل بستن IP) را به بررسی عمیق معماری ترجیح می‌دهم.", reverse: true },
  { dim: 1, text: "معتقدم پیچیدگی بیشتر در کدها لزوماً امنیت سیستم را بالا می‌برد، زیرا فهم آن برای مهاجم سخت‌تر می‌شود.", reverse: true },

  // Dim 2
  { dim: 2, text: "من به طور مستمر قواعد و استانداردهای پذیرفته‌شده در صنعت را زیر سؤال می‌برم تا محدودیت‌های واقعی را از مفروضات موروثی تفکیک کنم.", reverse: false },
  { dim: 2, text: "می‌پذیرم که یک پدیده یا سیستم می‌تواند همزمان پیامدهای مثبت و منفی کاملاً متناقضی داشته باشد و این تناقضات قابل درکند.", reverse: false },
  { dim: 2, text: "وقتی یک متخصص ارشد یا ابزار امنیتی معتبر می‌گوید سیستمی امن است، معمولاً بدون نیاز به اثبات ریاضی، آن را می‌پذیرم.", reverse: true },
  { dim: 2, text: "هنگام طراحی سیستم، سعی می‌کنم بدترین سناریوهای فاجعه‌بار (Black Swan) را در نظر بگیرم.", reverse: false },
  { dim: 2, text: 'تمرکز بر اینکه "چگونه این سیستم ممکن است خراب شود"، باعث فلج تحلیلی من شده و از پیشبرد کار جلوگیری می‌کند.', reverse: true },

  // Dim 3
  { dim: 3, text: "جمع‌آوری داده‌های غیرضروری توسط برنامه‌ها، حتی برای بهبود سرویس، یک تهدید بالقوه و غیرقابل توجیه است.", reverse: false },
  { dim: 3, text: "هرگونه مکانیزمی که کنترل کامل داده‌ها را از کاربر سلب کند، ذاتاً خطرناک بوده و نقض حریم شخصی است.", reverse: false },
  { dim: 3, text: "اگر داده‌های کاربران روی سرورهای خودی (First-Party) ذخیره شوند، نیازی به رمزنگاری سمت کاربر (Client-Side Crypto) نمی‌بینم.", reverse: true },
  { dim: 3, text: "معتقدم حتی با ناشناس‌سازی داده‌ها، همواره ریسک کشف مجدد هویت کاربران (Re-identification) وجود دارد.", reverse: false },
  { dim: 3, text: "به وعده‌های حفظ حریم خصوصی پلتفرم‌های بزرگ اعتماد دارم، زیرا نقض آن‌ها برایشان هزینه‌های سنگین اعتباری به همراه دارد.", reverse: true },
];

const scaleLabels = ["کاملاً مخالفم", "مخالفم", "نظری ندارم", "موافق", "کاملاً موافقم"];

export default function SMTTest() {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleAnswer = (qIndex: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === questions.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      setSubmitted(true);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateResults = () => {
    const dimScores = [0, 0, 0, 0];
    let totalRaw = 0;
    Object.entries(answers).forEach(([qIndexStr, val]) => {
      const q = questions[parseInt(qIndexStr)];
      const rawValue = q.reverse ? 6 - val : val;
      dimScores[q.dim] += rawValue;
      totalRaw += rawValue;
    });
    
    let bandTitle = "";
    let bandDesc = "";
    if (totalRaw >= 76) {
      bandTitle = "معمار اعتماد صفر (Zero-Trust Architect)";
      bandDesc = "ذهنیت شما مملو از پارانویای منطقی است. شما به طور مستمر فرض می‌کنید که محیط ذاتاً متخاصم است و معماری‌هایی را طراحی می‌کنید که حتی در بدترین شرایط از فروپاشی جلوگیری کنند. شما معمار واقعی سیستم‌های نفوذناپذیر هستید.";
    } else if (totalRaw >= 51) {
      bandTitle = "تحلیل‌گر محتاط (Cautious Analyst)";
      bandDesc = "شما درک خوبی از خطرات امنیتی و پیچیدگی سیستم‌ها دارید، اما گاهی به روش‌های استاندارد و وعده‌های امنیتی تکیه می‌کنید. با پرورش بیشتر تفکر بدبینانه، می‌توانید به سطح طراحی سیستم‌های Zero-Trust برسید.";
    } else {
      bandTitle = "توسعه‌دهنده خوش‌بین (Optimistic Developer)";
      bandDesc = "رویکرد شما به تکنولوژی مبتنی بر اعتماد است. شما عمدتاً بر «ساختن و کار کردن» تمرکز دارید و ارزیابی عمیقی از نحوه سوءاستفاده مهاجمان از سیستم انجام نمی‌دهید. این دیدگاه برای محیط‌های فوق‌امنیتی به اندازه کافی سخت‌گیرانه نیست.";
    }
    return { dimScores, totalRaw, bandTitle, bandDesc };
  };

  const results = submitted ? calculateResults() : null;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-85 transition-opacity duration-500 sm:opacity-90 [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]"
      >
        <EtherealShadow
          color="rgba(244,63,94,0.25)" // Rose tint for security
          animation={
            reduce
              ? { scale: 0, speed: 0 }
              : { scale: isMobile ? 52 : 76, speed: isMobile ? 55 : 62 }
          }
          noise={{ opacity: 0.3, scale: 1.2 }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <Header />

      <main
        dir="rtl"
        className={cn(
          "mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-4 py-16 sm:px-6 md:py-24 lg:px-8 text-right",
          vazirmatn.className
        )}
      >
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-4"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 backdrop-blur-sm uppercase tracking-widest font-mono" dir="ltr">
            <ShieldAlert className="size-3.5" />
            <span>ASSESSMENT · SMT</span>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            آزمون ذهنیت امنیتی
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg text-muted-foreground">
            سطح پارانویای منطقی و درک خود از معماری سیستم‌های متخاصم را ارزیابی کنید.
          </motion.p>
          <motion.div variants={item} className="border-r-4 border-rose-500/50 pr-4 py-1 text-sm text-muted-foreground">
            این ارزیابی بر اساس تحلیل ریسک، مقاومت شناختی به حریم خصوصی و تفکر سیستمیک طراحی شده است.
          </motion.div>
        </motion.section>

        {!submitted ? (
          <motion.form
            variants={container}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="flex flex-col gap-12"
          >
            {dims.map((dim, dIndex) => {
              const dimQuestions = questions
                .map((q, i) => ({ ...q, index: i }))
                .filter((q) => q.dim === dIndex);

              return (
                <motion.div key={dIndex} variants={item} className="flex flex-col gap-6">
                  <div className="border-b border-border/50 pb-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-lg font-bold text-rose-500">
                        {String(dIndex + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl font-bold text-foreground">{dim.name}</h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {dimQuestions.map((q) => (
                      <div
                        key={q.index}
                        className="rounded-2xl border border-border/60 bg-background/50 p-5 backdrop-blur-md"
                      >
                        <p className="mb-6 text-base font-medium text-foreground">{q.text}</p>
                        <div className="flex justify-between gap-2">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <label
                              key={val}
                              className={cn(
                                "group flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-xl p-2 transition-colors",
                                answers[q.index] === val
                                  ? "bg-rose-500/10"
                                  : "hover:bg-muted/50"
                              )}
                            >
                              <input
                                type="radio"
                                name={`q-${q.index}`}
                                value={val}
                                className="sr-only"
                                checked={answers[q.index] === val}
                                onChange={() => handleAnswer(q.index, val)}
                              />
                              <div
                                className={cn(
                                  "size-6 rounded-full border-2 transition-all",
                                  answers[q.index] === val
                                    ? "border-rose-500 bg-rose-500 shadow-[0_0_0_4px_rgba(225,29,72,0.15)]" // text-rose-600 logic
                                    : "border-border/60 bg-background group-hover:border-border"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-[11px] font-medium transition-colors text-center",
                                  answers[q.index] === val
                                    ? "text-rose-600 dark:text-rose-400"
                                    : "text-muted-foreground opacity-0 md:opacity-100 group-hover:opacity-100"
                                )}
                              >
                                {scaleLabels[val - 1]}
                              </span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-2 flex justify-between md:hidden text-[11px] text-muted-foreground/80">
                          <span>{scaleLabels[0]}</span>
                          <span>{scaleLabels[4]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <motion.div variants={item} className="mt-8 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={!isComplete}
                className="rounded-full bg-foreground px-8 py-4 text-base font-bold text-background transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
              >
                تحلیل وضعیت امنیتی ذهن
              </button>
              <p className="font-mono text-sm text-muted-foreground" dir="ltr">
                {answeredCount} / {questions.length} Answered
              </p>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-10"
          >
            <motion.div
              variants={item}
              className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background sm:p-12"
            >
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-baseline gap-4" dir="ltr">
                  <div className="font-mono text-7xl font-bold text-rose-500 sm:text-8xl">
                    {results?.totalRaw}
                  </div>
                  <div className="font-mono text-3xl font-bold text-muted-foreground/50 sm:text-4xl">
                    / 100
                  </div>
                </div>
                
                <div className="text-sm font-medium text-background/70 mt-2">
                  ذهنیت امنیتی و مدل‌سازی تهدید (SMT)
                </div>
                <div className="mt-6 text-2xl font-bold sm:text-3xl text-rose-300">
                  {results?.bandTitle}
                </div>
                <div className="mt-2 max-w-xl text-base text-background/80 leading-relaxed">
                  {results?.bandDesc}
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-6">
              <h3 className="text-xl font-bold mb-2">تحلیل ابعاد شناختی</h3>
              {dims.map((dim, i) => {
                const score = results?.dimScores[i] || 0;
                const min = 5; // 5 questions * min 1
                const max = dim.max;
                const pct = ((score - min) / (max - min)) * 100;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-foreground">{dim.name}</span>
                      <span className="font-mono text-muted-foreground" dir="ltr">
                        {score} / {max}
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-rose-500 to-rose-300 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-col items-start gap-6 border-t border-border/50 pt-8">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-bold transition-colors hover:bg-muted text-foreground"
              >
                <RefreshCcw className="size-4" />
                آزمون مجدد
              </button>
            </motion.div>
          </motion.div>
        )}
      </main>

      <footer className="border-t border-border/50 py-6 mt-auto">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 font-mono text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div>© {BUILD_YEAR} Abulfadl Ahmadi · Sharif University of Technology</div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
            <span aria-hidden>·</span>
            <Link href="/projects" className="transition-colors hover:text-foreground">Projects</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
