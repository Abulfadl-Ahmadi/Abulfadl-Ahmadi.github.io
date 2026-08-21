"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Header } from "@/components/header";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import { BrainCircuit, RefreshCcw } from "lucide-react";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const dims = [
  { name: "مقاومت در برابر محرک‌ها", short: "مقاومت", max: 25 },
  { name: "تحمل اصطکاک و ملالت", short: "تحمل ملالت", max: 25 },
  { name: "عمق غرقگی", short: "غرقگی (Flow)", max: 25 },
  { name: "مدیریت تغییر زمینه", short: "تغییر زمینه", max: 25 },
  { name: "تفکر راهبردی-سیستمی", short: "تفکر سیستمی", max: 25 },
];

const questions = [
  // Dim 0: مقاومت در برابر محرک‌ها
  { dim: 0, text: "هنگام برخورد با یک مسئله سخت در کدنویسی یا پژوهش، بلافاصله و به صورت ناخودآگاه شبکه‌های اجتماعی یا اخبار را باز می‌کنم.", reverse: true },
  { dim: 0, text: "من می‌توانم مرزهای حریم خصوصی ذهنی خود را حفظ کرده و اجازه ندهم اعلان‌ها (Notifications) تمرکزم را قطع کنند.", reverse: false },
  { dim: 0, text: "احساس می‌کنم به الگوریتم‌های دیجیتال معتاد شده‌ام و استقلال شناختی‌ام در حال کاهش است.", reverse: true },
  { dim: 0, text: "من به طور ارادی و عامدانه از «روزه‌داری دیجیتال» برای محافظت از داده‌های توجهی خود استفاده می‌کنم.", reverse: false },
  { dim: 0, text: "در مواجهه با ابهام، به جای تفکر مستقل، سریعاً سعی می‌کنم مسئولیت فکر کردن را به هوش مصنوعی یا جستجوی سریع واگذار کنم.", reverse: true },
  
  // Dim 1: تحمل اصطکاک و ملالت
  { dim: 1, text: "وقتی یک وظیفه فاقد پاداش فوری و به شدت ملال‌آور است (مثل خواندن کدهای قدیمی)، سریعاً احساس کلافگی کرده و تمرکزم می‌شکند.", reverse: true },
  { dim: 1, text: "من ملالت را به عنوان یک فاز گذار ضروری برای رسیدن به خلاقیت می‌پذیرم و از آن فرار نمی‌کنم.", reverse: false },
  { dim: 1, text: "احساس می‌کنم توانایی تحمل ابهام در کارهای پژوهشی طولانی‌مدت را از دست داده‌ام و به دنبال نتایج سریع هستم.", reverse: true },
  { dim: 1, text: "من قادرم ارزش پنهان در تلاش‌های فیزیکی و ذهنی فرسایشی را درک کرده و با آن‌ها سازگار شوم.", reverse: false },
  { dim: 1, text: "در لحظه برخورد با یک باگ پیچیده، کاهش دوپامین باعث می‌شود کار را رها کرده و به دنبال یک محرک سریع بگردم.", reverse: true },

  // Dim 2: عمق غرقگی (Flow)
  { dim: 2, text: "وقتی عمیقاً درگیر یک کار می‌شوم، احساس زمان را به طور کامل از دست داده و با وظیفه خود یکی می‌شوم.", reverse: false },
  { dim: 2, text: "من مهارت بالایی در تنظیم سختی کارها دارم تا همیشه در «کانال غرقگی» (بین اضطراب و ملالت) باقی بمانم.", reverse: false },
  { dim: 2, text: "در زمان اوج تمرکز، احساس می‌کنم مدل‌های ذهنی پیچیده را با وضوح بالا و به صورت روانیِ شناختی درک می‌کنم.", reverse: false },
  { dim: 2, text: "ورود به حالت تمرکز عمیق برای من بسیار سخت است و دائماً در سطح باقی می‌مانم.", reverse: true },
  { dim: 2, text: "من می‌توانم برای مدت‌های طولانی (بیش از ۹۰ دقیقه) بدون احساس خستگی ذهنی در حالت غرقگی بمانم.", reverse: false },

  // Dim 3: مدیریت تغییر زمینه
  { dim: 3, text: "تغییر مکرر بین جلسات، ایمیل‌ها و کدنویسی، باعث ایجاد پسماند توجه (Attention Residue) و فلج شناختی در من می‌شود.", reverse: true },
  { dim: 3, text: "من مهارت بالایی در انتزاع دارم و می‌توانم هنگام بروز وقفه، اطلاعات کلیدی سیستم را به سرعت نشانه‌گذاری کنم.", reverse: false },
  { dim: 3, text: "پس از یک وقفه ناخواسته، من با استفاده از مهارت تجزیه (Decomposition) به سرعت به لایه فکری قبلی بازمی‌گردم.", reverse: false },
  { dim: 3, text: "وقتی از یک جلسه کاری به سراغ کارهای عمیق می‌روم، بخش زیادی از ذهن من هنوز درگیر بحث‌های جلسه است.", reverse: true },
  { dim: 3, text: "من می‌توانم کارهای پیچیده را به گونه‌ای کپسوله‌سازی کنم که در صورت تغییر زمینه، کمترین میزان بار شناختی را تجربه کنم.", reverse: false },

  // Dim 4: تفکر راهبردی-سیستمی
  { dim: 4, text: "من در زمان کار عمیق، فراتر از علائم ظاهری رفته و با تفکر سیستمی، به دنبال شناسایی علل ریشه‌ای (Root Causes) می‌گردم.", reverse: false },
  { dim: 4, text: "به جای حل ریشه‌ای مشکلات با استفاده از تفکر مبتنی بر اصول اولیه، بیشتر تمایل دارم از کدهای وصله‌ای (Patch) استفاده کنم.", reverse: true },
  { dim: 4, text: "من هنگام طراحی معماری، پیامدهای مرتبه دوم و بدهی فنی (Technical Debt) چند سال آینده را تحلیل می‌کنم.", reverse: false },
  { dim: 4, text: "در اوج تمرکز، من از «ذهنیت امنیتی» استفاده کرده و مدام می‌پرسم 'این سیستم چگونه ممکن است دچار شکست شود؟'", reverse: false },
  { dim: 4, text: "به ندرت وقت خود را صرف شبیه‌سازی ذهنی ریسک‌ها و اثرات جانبی تغییرات جدید می‌کنم.", reverse: true },
];

const scaleLabels = ["کاملاً مخالفم", "مخالفم", "نظری ندارم", "موافق", "کاملاً موافقم"];

export default function DWQTest() {
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
    let totalRaw = 0;
    Object.entries(answers).forEach(([qIndexStr, val]) => {
      const q = questions[parseInt(qIndexStr)];
      const rawValue = q.reverse ? 6 - val : val;
      dimScores[q.dim] += rawValue;
      totalRaw += rawValue;
    });
    
    let bandTitle = "";
    let bandDesc = "";
    if (totalRaw >= 93) {
      bandTitle = "استاد کار عمیق (Deep Work Master)";
      bandDesc = "شما توانایی خارق‌العاده‌ای در کنترل توجه، مسدودسازی حواس‌پرتی‌ها و ورود به حالت غرقگی (Flow) دارید. ذهن شما در مواجهه با سیستم‌های پیچیده و ملالت‌بار، به جای فرار، به سرعت ساختارهای انتزاعی ایجاد می‌کند. این سطح از تمرکز در اقتصاد مدرن یک مزیت رقابتی بسیار کمیاب است.";
    } else if (totalRaw >= 59) {
      bandTitle = "تمرکز نوسانی (Oscillating Focus)";
      bandDesc = "شما درک خوبی از اهمیت کار عمیق دارید اما هنوز به طور کامل بر پدیده «پسماند توجه» غلبه نکرده‌اید. با وجود اینکه گاهی وارد حالت غرقگی می‌شوید، اما وقفه‌ها و محرک‌های خارجی همچنان می‌توانند انسجام شناختی شما را مختل کنند. کاهش وابستگی به پلتفرم‌های دیجیتال می‌تواند به شما کمک کند.";
    } else {
      bandTitle = "پراکندگی شناختی (Cognitive Fragmentation)";
      bandDesc = "مدل‌های ذهنی شما دائماً توسط حواس‌پرتی‌ها و تغییرات مکرر زمینه (Context-switching) دچار فروپاشی می‌شوند. شما در تحمل ملالت ضعف دارید و به سرعت تسلیم تخلیه شناختی (فرار به شبکه‌های اجتماعی) می‌شوید. برای دستیابی به نوآوری، نیازمند معماری مجدد اکوسیستم ذهنی خود هستید.";
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
          color="rgba(6,182,212,0.25)" // Cyan tint for deep focus
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
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 backdrop-blur-sm uppercase tracking-widest font-mono" dir="ltr">
            <BrainCircuit className="size-3.5" />
            <span>ASSESSMENT · DWQ</span>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            ضریب کار عمیق
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg text-muted-foreground">
            توانایی خود را در حفظ تمرکز خطی، ورود به حالت غرقگی و مدیریت پسماند توجه در اقتصاد مدرن ارزیابی کنید.
          </motion.p>
          <motion.div variants={item} className="border-r-4 border-cyan-500/50 pr-4 py-1 text-sm text-muted-foreground">
            این ارزیابی بر اساس سایکوفیزیولوژیِ توجه، تحمل ملالت و تفکر سیستمی در مهندسی نرم‌افزار طراحی شده است.
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
                      <span className="font-mono text-lg font-bold text-cyan-500">
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
                                  ? "bg-cyan-500/10"
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
                                    ? "border-cyan-500 bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,0.15)]"
                                    : "border-border/60 bg-background group-hover:border-border"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-[11px] font-medium transition-colors text-center",
                                  answers[q.index] === val
                                    ? "text-cyan-600 dark:text-cyan-400"
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
                تحلیل ظرفیت کار عمیق
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
                  <div className="font-mono text-7xl font-bold text-cyan-500 sm:text-8xl">
                    {results?.totalRaw}
                  </div>
                  <div className="font-mono text-3xl font-bold text-muted-foreground/50 sm:text-4xl">
                    / 125
                  </div>
                </div>
                
                <div className="text-sm font-medium text-background/70 mt-2">
                  ضریب کار عمیق (DWQ)
                </div>
                <div className="mt-6 text-2xl font-bold sm:text-3xl text-cyan-300">
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
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
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
