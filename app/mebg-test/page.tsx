"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Header } from "@/components/header";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import { Flame, RefreshCcw } from "lucide-react";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const dims = [
  { name: "انرژی فعال‌سازی", short: "فعال‌سازی", max: 30 },
  { name: "اصطکاک روانی", short: "اصطکاک", max: 30 },
  { name: "اینرسی شناختی", short: "اینرسی", max: 30 },
  { name: "آشوب سیستمی", short: "آشوب", max: 30 },
];

const questions = [
  // Dim 0: انرژی فعال‌سازی
  { dim: 0, text: "زمانی که با یک پروژه جدید روبرو می‌شوم، تجزیه آن به مراحل کوچکتر برایم غیرممکن به نظر می‌رسد و فلج می‌شوم.", reverse: false },
  { dim: 0, text: "شروع کردن یک کار ساده، نیازمند غلبه بر کوهی از افکار بازدارنده و مفروضات پیچیده‌ای است که به یکباره هجوم می‌آورند.", reverse: false },
  { dim: 0, text: "حتی زمانی که منطقاً می‌دانم یک کار چقدر ساده است، احساس می‌کنم انرژی اولیه برای دست بردن به آن را به هیچ وجه ندارم.", reverse: false },
  { dim: 0, text: "پیش از شروع هر کار، به جای پرداختن به هسته اصلی، درگیر حواشی و روش‌های قدیمی انجام آن می‌شوم که انرژی‌ام را می‌گیرد.", reverse: false },
  { dim: 0, text: "من می‌توانم بدون نیاز به تلاش ذهنی زیاد، کارهای پیچیده را سریعاً به اجزای کوچک و قابل اجرا تبدیل کرده و شروع کنم.", reverse: true },
  { dim: 0, text: "به جای بهانه‌تراشی برای شروع نکردن، به راحتی بر نیروی بازدارنده اولیه غلبه می‌کنم و وارد جریان کار (Flow) می‌شوم.", reverse: true },
  
  // Dim 1: اصطکاک روانی
  { dim: 1, text: "در حین انجام یک کار، جزئیات غیرمهم و نامرتبط به شدت ذهن مرا درگیر می‌کنند و مانع پیشبرد هدف اصلی می‌شوند.", reverse: false },
  { dim: 1, text: "برای حفظ یک خط فکری مشخص، احساس می‌کنم باید انرژی ذهنی عظیمی را صرف مبارزه با افکار پراکنده کنم.", reverse: false },
  { dim: 1, text: "ارتباط کلامی و فکری من در حین کار، به سرعت از موضوع اصلی منحرف شده و انسجام منطقی خود را از دست می‌دهد.", reverse: false },
  { dim: 1, text: "در محیط کار، تمرکزم بین بی‌توجهی مطلق و غرق شدن بیش از حد در یک جزئیات کوچک در نوسان است.", reverse: false },
  { dim: 1, text: "من قادرم به راحتی اطلاعات اضافی را فیلتر کرده و بدون احساس خستگی، روی مسئله اصلی متمرکز بمانم.", reverse: true },
  { dim: 1, text: "ذهن من مانند یک ماشین بدون اصطکاک کار می‌کند و حفظ تمرکز برای مدت طولانی برایم بسیار کم‌هزینه است.", reverse: true },

  // Dim 2: اینرسی شناختی
  { dim: 2, text: "هنگامی که کارم به دلیل یک عامل خارجی متوقف می‌شود، بازیابی تمرکز و بازگشت به سرعت قبلی برایم غیرممکن است.", reverse: false },
  { dim: 2, text: "وقتی درگیر یک فکر منفی یا اضطراب در مورد کار می‌شوم، در یک حلقه بسته گیر می‌افتم و نمی‌توانم این زنجیره را متوقف کنم.", reverse: false },
  { dim: 2, text: "انتقال بین دو وظیفه کاملاً متفاوت، نیازمند زمان طولانی برای تغییر وضعیت ذهنی است و مرا به شدت خسته می‌کند.", reverse: false },
  { dim: 2, text: "من تمایل دارم اشتباهات گذشته را تکرار کنم زیرا پرسیدن سوال درباره ریشه تصمیماتم برایم بسیار دشوار است.", reverse: false },
  { dim: 2, text: "من می‌توانم به سرعت وضعیت ذهنی خود را بین فازهای کشف (Exploration) و بهره‌برداری (Exploitation) تغییر دهم.", reverse: true },
  { dim: 2, text: "زمانی که در یک چرخه فکری مخرب می‌افتم، با طرح سوالات انتقادی از خودم، سریعاً از آن چرخه خارج می‌شوم.", reverse: true },

  // Dim 3: آشوب سیستم
  { dim: 3, text: "احساس می‌کنم کنترل کارهایم از دستم خارج شده و نتایج تصمیماتم کاملاً غیرقابل پیش‌بینی و متناقض است.", reverse: false },
  { dim: 3, text: "در مواجهه با یک مشکل بحرانی، تنها می‌توانم به راه حل فوری فکر کنم و توانایی پیش‌بینی عواقب ثانویه آن را ندارم.", reverse: false },
  { dim: 3, text: "نمی‌توانم تشخیص دهم که چگونه بخش‌های ظاهراً نامرتبط کارم بر یکدیگر تاثیر گذاشته و باعث ایجاد بحران می‌شوند.", reverse: false },
  { dim: 3, text: "به ندرت به این فکر می‌کنم که جریان کاری یا سلامت روان من در کجا ممکن است دچار شکست یا فروپاشی غیرمنتظره شود.", reverse: false },
  { dim: 3, text: "من معمولاً می‌توانم پیامدهای مرتبه دوم و سوم تصمیماتم را در سیستم کاری پیش‌بینی کرده و از آشوب جلوگیری کنم.", reverse: true },
  { dim: 3, text: "من پیوسته ذهن و عادات کاری خود را ممیزی می‌کنم تا آسیب‌پذیری‌های روان‌شناختی‌ام را پیش از وقوع بحران برطرف کنم.", reverse: true },
];

const scaleLabels = ["کاملاً مخالفم", "مخالفم", "نظری ندارم", "موافق", "کاملاً موافقم"];

export default function MEBGTest() {
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
    if (totalRaw >= 89) {
      bandTitle = "فروپاشی ترمودینامیک / آشوب سیستمی (Thermodynamic Collapse)";
      bandDesc = "سیستم شناختی شما با آنتروپی شدید روبرو است. انرژی زیادی صرف غلبه بر اصطکاک و اینرسی می‌شود بدون آنکه خروجی مفیدی حاصل گردد. شما در وضعیت فرسودگی عمیق قرار دارید و نیازمند توقف، ممیزی مفروضات و خنک‌سازی سیستم ذهنی هستید.";
    } else if (totalRaw >= 56) {
      bandTitle = "رانش شناختی و اصطکاک (Cognitive Drift & High Friction)";
      bandDesc = "ذهن شما در حال تجربه اتلاف انرژی است. شروع کارها و حفظ تمرکز نیازمند صرف تلاش مضاعف است و سیستم به سمت بی‌نظمی میل می‌کند. شما هنوز کنترل را از دست نداده‌اید، اما برای جلوگیری از آشوب سیستمی باید فرآیندهای خود را ساده‌تر (Decomposition) کنید.";
    } else {
      bandTitle = "بحرانیت بهینه (Optimal Criticality)";
      bandDesc = "سیستم عصبی شما در وضعیت ایده‌آلی از نظر ترمودینامیک شناخت قرار دارد. انرژی فعال‌سازی کارها پایین است، اصطکاک روانی در حداقل ممکن قرار دارد و شما به خوبی بین تحلیل جزئیات و پیامدهای سیستمی (تفکر کل‌نگر) در نوسان هستید. ذهن شما سالم، منعطف و بدون اتلاف انرژی است.";
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
          color="rgba(139,92,246,0.25)" // Violet tint for energy/plasma
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
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400 backdrop-blur-sm uppercase tracking-widest font-mono" dir="ltr">
            <Flame className="size-3.5" />
            <span>ASSESSMENT · MEBG</span>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            سنجش آنتروپی ذهنی
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg text-muted-foreground">
            سطح فرسودگی شغلی و خستگی شناختی خود را بر پایه قوانین ترمودینامیک و فیزیک سیستم‌ها ارزیابی کنید.
          </motion.p>
          <motion.div variants={item} className="border-r-4 border-violet-500/50 pr-4 py-1 text-sm text-muted-foreground">
            نمره بالاتر در این آزمون نشان‌دهنده آنتروپی (بی‌نظمی) بیشتر در سیستم ذهنی است.
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
                      <span className="font-mono text-lg font-bold text-violet-500">
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
                                  ? "bg-violet-500/10"
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
                                    ? "border-violet-500 bg-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.15)]"
                                    : "border-border/60 bg-background group-hover:border-border"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-[11px] font-medium transition-colors text-center",
                                  answers[q.index] === val
                                    ? "text-violet-600 dark:text-violet-400"
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
                تحلیل ترمودینامیک ذهنی
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
                  <div className="font-mono text-7xl font-bold text-violet-500 sm:text-8xl">
                    {results?.totalRaw}
                  </div>
                  <div className="font-mono text-3xl font-bold text-muted-foreground/50 sm:text-4xl">
                    / 120
                  </div>
                </div>
                
                <div className="text-sm font-medium text-background/70 mt-2">
                  سنجش آنتروپی ذهنی (MEBG)
                </div>
                <div className="mt-6 text-2xl font-bold sm:text-3xl text-violet-300">
                  {results?.bandTitle}
                </div>
                <div className="mt-2 max-w-xl text-base text-background/80 leading-relaxed">
                  {results?.bandDesc}
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-6">
              <h3 className="text-xl font-bold mb-2">تحلیل شاخص‌های اتلاف انرژی</h3>
              {dims.map((dim, i) => {
                const score = results?.dimScores[i] || 0;
                const min = 6; // 6 questions * min 1
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
                        className="h-full bg-gradient-to-r from-violet-500 to-violet-300 rounded-full"
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
