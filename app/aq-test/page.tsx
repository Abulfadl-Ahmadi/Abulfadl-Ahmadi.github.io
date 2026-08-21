"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Header } from "@/components/header";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import { Activity, RefreshCcw } from "lucide-react";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

// Frozen at build time via next.config `env`
const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const dims = [
  { name: "انعطاف شناختی", short: "شناختی" },
  { name: "تحمل عدم‌قطعیت", short: "عدم‌قطعیت" },
  { name: "بازیابی پس از شکست", short: "بازیابی" },
  { name: "چابکی رفتاری", short: "رفتاری" },
  { name: "تنظیم هیجانی", short: "هیجانی" },
];

const questions = [
  // Dimension 1 (0)
  { dim: 0, text: "وقتی یه راه‌حل جواب نمی‌ده، به‌جای اصرار روی همون، سریع می‌رم سراغ راه‌حل جایگزین.", reverse: false },
  { dim: 0, text: "وقتی با اطلاعاتی روبرو می‌شوم که باورهای قبلی‌ام را نقض می‌کند، ذهنم قفل می‌کند و کلافه می‌شوم.", reverse: true },
  { dim: 0, text: "وقتی یکی با دلیل قوی نظرم رو رد می‌کنه، راحت نظرم رو عوض می‌کنم.", reverse: false },
  { dim: 0, text: "برنامه‌ریزی‌هام معمولاً چند مسیر جایگزین دارن، نه فقط یک نقشه‌ی ثابت.", reverse: false },
  // Dimension 2 (1)
  { dim: 1, text: "شروع یه کار بدون داشتن همه‌ی اطلاعات، من رو فلج نمی‌کنه.", reverse: false },
  { dim: 1, text: "وقتی آینده نامشخصه (مثلاً نتیجه یه تصمیم مهم)، می‌تونم تمرکزم رو روی کارهای امروز نگه دارم.", reverse: false },
  { dim: 1, text: "ابهام رو بیشتر یه فضای اکتشاف می‌بینم تا یه تهدید.", reverse: false },
  { dim: 1, text: "قرار گرفتن در شرایطی که هیچ قانون یا دستورالعمل مشخصی ندارد، مرا به شدت مضطرب می‌کند.", reverse: true },
  // Dimension 3 (2)
  { dim: 2, text: "بعد از یه شکست، معمولاً ظرف چند روز دوباره وارد عمل می‌شم، نه چند هفته.", reverse: false },
  { dim: 2, text: "اشتباهات گذشته رو بیشتر داده می‌بینم تا مدرک ناتوانی خودم.", reverse: false },
  { dim: 2, text: "وقتی در کاری شکست می‌خورم، تا مدت‌ها احساس بی‌ارزشی می‌کنم و نمی‌توانم دوباره شروع کنم.", reverse: true },
  { dim: 2, text: "انتقاد سخت رو می‌شنوم و پردازش می‌کنم بدون این‌که روزها ذهنم رو درگیر کنه.", reverse: false },
  // Dimension 4 (3)
  { dim: 3, text: "وقتی یه روتین قدیمیم دیگه جواب نمی‌ده، عملاً عوضش می‌کنم، نه فقط قصدش رو دارم.", reverse: false },
  { dim: 3, text: "در محیط جدید (شهر، دانشگاه، تیم کاری)، ظرف مدت کوتاهی ریتم خودم رو پیدا می‌کنم.", reverse: false },
  { dim: 3, text: "ترجیح می‌دهم به روش‌های قدیمی و آشنایم بچسبم، حتی اگر روش‌های جدیدتر و کارآمدتری وجود داشته باشد.", reverse: true },
  { dim: 3, text: "می‌تونم برنامه‌ی روزم رو در لحظه بازآرایی کنم اگه شرایط عوض بشه، بدون این‌که کل روز بهم بریزه.", reverse: false },
  // Dimension 5 (4)
  { dim: 4, text: "وقتی برنامه‌ام ناگهان به‌هم می‌ریزه، عصبانیت یا اضطرابم زود فروکش می‌کنه.", reverse: false },
  { dim: 4, text: "تحت فشار زمانی، تصمیم‌گیریم بدتر از حالت عادی نمی‌شه.", reverse: false },
  { dim: 4, text: "می‌تونم بین موقعیت‌های خیلی متفاوت (مثلاً یه جلسه رسمی و بعد یه دورهمی دوستانه) سریع حال‌وهوام رو عوض کنم.", reverse: false },
  { dim: 4, text: "یک خبر بد یا تغییر ناگهانی در برنامه‌ها، می‌تواند کل روزم را خراب کند و اعصابم را به هم بریزد.", reverse: true },
];

const scaleLabels = ["اصلاً نه", "کم", "گاهی", "زیاد", "کاملاً"];

export default function AQTest() {
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
    const dimScores = [0, 0, 0, 0, 0];
    Object.entries(answers).forEach(([qIndexStr, val]) => {
      const q = questions[parseInt(qIndexStr)];
      const rawValue = q.reverse ? 6 - val : val;
      const points = (rawValue - 1) * 1.25;
      dimScores[q.dim] += points;
    });
    const total = Math.round(dimScores.reduce((a, b) => a + b, 0));

    let bandTitle = "";
    let bandDesc = "";
    if (total >= 85) {
      bandTitle = "به‌شدت انطباق‌پذیر";
      bandDesc = "تغییر و ابهام رو بیشتر فرصت می‌بینی تا تهدید. مراقب باش این انعطاف به بی‌ثباتی یا فرار از تعهد تبدیل نشه.";
    } else if (total >= 65) {
      bandTitle = "انطباق‌پذیر";
      bandDesc = "در اغلب شرایط خودتو با تغییر تطبیق می‌دی. نقاط ضعفت رو از نمودار زیر پیدا کن — احتمالاً یکی دو بُعد از بقیه عقب‌ترن.";
    } else if (total >= 45) {
      bandTitle = "متوسط، در حال شکل‌گیری";
      bandDesc = "بعضی بُعدها قوی‌ن، بعضی هنوز شکننده‌ن. این نقطه‌ی خوبیه برای تمرکز روی یکی دو بُعد ضعیف‌تر به‌جای همه‌چیز باهم.";
    } else {
      bandTitle = "مقاوم در برابر تغییر";
      bandDesc = "تغییر و عدم‌قطعیت فعلاً برات پرهزینه‌ست. این لزوماً یه نقص شخصیتی نیست — می‌تونه از خستگی، فشار فعلی زندگی، یا فقط الگوی عادت باشه. شروع از کوچیک‌ترین بُعد ضعیف منطقی‌تره تا همه‌چیز یه‌جا.";
    }
    return { dimScores, total, bandTitle, bandDesc };
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
          color="rgba(245,158,11,0.2)"
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
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 backdrop-blur-sm uppercase tracking-widest font-mono" dir="ltr">
            <Activity className="size-3.5" />
            <span>SELF-ASSESSMENT · AQ</span>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            ضریب انعطاف‌پذیری
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg text-muted-foreground">
            ۲۰ گویه، ۵ بُعد. نی در باد می‌خمد و نمی‌شکند — این آزمون می‌سنجد که ذهن تو در برابر تغییر، عدم‌قطعیت و شکست چقدر همین‌طور عمل می‌کنه.
          </motion.p>
          <motion.div variants={item} className="border-r-4 border-amber-500/50 pr-4 py-1 text-sm text-muted-foreground">
            این یه ابزار خودسنجیه، نه تست روان‌سنجی معتبر یا تشخیص بالینی. نتیجه یک آینه‌ست برای فکر کردن، نه یک برچسب.
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
                      <span className="font-mono text-lg font-bold text-amber-500">
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
                                  ? "bg-amber-500/10"
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
                                    ? "border-amber-500 bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.15)]"
                                    : "border-border/60 bg-background group-hover:border-border"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-xs font-medium transition-colors text-center",
                                  answers[q.index] === val
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-muted-foreground"
                                )}
                              >
                                {val}
                              </span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground/60">
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
                محاسبه‌ی نتیجه
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
                <div className="font-mono text-7xl font-bold text-amber-500 sm:text-8xl" dir="ltr">
                  {results?.total}
                </div>
                <div className="text-sm font-medium text-background/70">
                  از ۱۰۰ — مجموع نمره AQ
                </div>
                <div className="mt-6 text-2xl font-bold sm:text-3xl">
                  {results?.bandTitle}
                </div>
                <div className="mt-2 max-w-xl text-base text-background/80 leading-relaxed">
                  {results?.bandDesc}
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-6">
              {dims.map((dim, i) => {
                const score = results?.dimScores[i] || 0;
                const displayScore = Math.round(score);
                const pct = (score / 20) * 100;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-foreground">{dim.name}</span>
                      <span className="font-mono text-muted-foreground" dir="ltr">
                        {displayScore} / 20
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-col items-start gap-6 border-t border-border/50 pt-8">
              <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
                این یه ابزار خودسنجی غیررسمیه که برای مرور شخصی طراحی شده، نه یک آزمون روان‌سنجی استانداردشده یا معتبرسازی‌شده علمی. نتایج تحت تأثیر حال‌وهوای امروزت هم هست — اگه چند هفته دیگه دوباره بزنی ممکنه فرق کنه.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-bold transition-colors hover:bg-muted"
              >
                <RefreshCcw className="size-4" />
                دوباره از اول
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
