"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Header } from "@/components/header";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import { Network, RefreshCcw } from "lucide-react";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

// Frozen at build time via next.config `env`
const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const dims = [
  { name: "دید کل‌نگر در برابر جزءنگر", short: "کل‌نگر" },
  { name: "پیش‌بینی پیامدهای ثانویه", short: "پیامدها" },
  { name: "درک الگوهای پنهان", short: "الگوها" },
  { name: "توانایی انتزاع", short: "انتزاع" },
];

const questions = [
  // Dim 0
  { dim: 0, text: "من ترجیح می‌دهم پیش از بررسی عمیق و دقیق اجزای یک مسئله، ساختار کلی، زمینه و تعاملات شبکه‌ای میان آن‌ها را درک کنم.", reverse: false },
  { dim: 0, text: "در مواجهه با یک مشکل فنی یا سازمانی پیچیده، معتقدم بهترین و تنهاترین راه، تجزیه کامل آن به بخش‌های کاملاً مستقل و حل مجزای هر بخش است.", reverse: true },
  { dim: 0, text: "عمیقاً باور دارم که ایجاد یک تغییر بسیار کوچک در یک زیرسیستم، به دلیل وابستگی‌های متقابل، می‌تواند پیامدهای ساختاری و گسترده‌ای در کل مجموعه ایجاد کند.", reverse: false },
  { dim: 0, text: "مشکلات مزمن در پروژه‌ها و سازمان‌ها، عمدتاً ریشه در اشتباهات و ویژگی‌های فردی افراد دارد، نه ساختارها و فرآیندهای به هم پیوسته.", reverse: true },
  { dim: 0, text: "درک کامل و دقیق هر رویداد یا پدیده‌ای، بدون در نظر گرفتن بستر، محیط پیرامون و سوابق تاریخی آن، عملاً غیرممکن و گمراه‌کننده است.", reverse: false },
  
  // Dim 1
  { dim: 1, text: "هنگام اخذ تصمیمات کلیدی، همواره تلاش می‌کنم تا واکنش‌های زنجیره‌ای، اثرات جانبی و پیامدهای غیرمستقیم آن را در سال‌های آینده مدل‌سازی و شبیه‌سازی کنم.", reverse: false },
  { dim: 1, text: "در مواجهه با یک بحران فنی، تمرکز و اولویت مطلق من صرفاً بر روی رفع فوری مشکل و دستیابی به سریع‌ترین خروجی ممکن است، بدون نگرانی از آینده.", reverse: true },
  { dim: 1, text: "پیش از پیاده‌سازی هر راه‌حل جدیدی، زمان قابل توجهی را صرف پیش‌بینی بازخوردهای احتمالی سیستم و شناسایی اثرات جانبی ناخواسته آن می‌کنم.", reverse: false },
  { dim: 1, text: "اگر اولین و در دسترس‌ترین راه‌حل برای یک مشکل کارایی داشته باشد، دیگر دلیلی برای صرف انرژی ذهنی جهت یافتن پیامدهای پنهان آن نمی‌بینم.", reverse: true },
  { dim: 1, text: "همواره به این اصل آگاهم که راه‌حل‌های سریع و وصله‌پینه‌ای (Quick fixes)، اگرچه در کوتاه‌مدت جذابند، اما در بلندمدت منجر به فروپاشی معماری سیستم می‌شوند.", reverse: false },

  // Dim 2
  { dim: 2, text: "در مواجهه با اتفاقات نامطلوب و تکرارشونده، به جای واکنش مقطعی، همواره به دنبال شناسایی ساختارها و الگوهای پنهانی هستم که باعث بازتولید آن‌ها می‌شوند.", reverse: false },
  { dim: 2, text: "بر این باورم که بیشتر چالش‌ها و اتفاقات روزمره‌ای که رخ می‌دهند، رویدادهایی تصادفی و کاملاً مستقل از هم هستند و هیچ الگوی خاصی در آن‌ها وجود ندارد.", reverse: true },
  { dim: 2, text: "تشخیص روندها، الگوهای معنادار و سیگنال‌های واقعی در میان مجموعه‌ای عظیم از داده‌های به ظاهر پراکنده و آشفته برای من فرآیندی نسبتاً آسان است.", reverse: false },
  { dim: 2, text: "در تحلیل مسائل، ترجیح می‌دهم منحصراً روی داده‌های ملموس و فعلی تمرکز کنم تا اینکه وقت خود را صرف یافتن روندهای مبهم تاریخی یا پیش‌بینی الگوها کنم.", reverse: true },
  { dim: 2, text: "من معتقدم رویدادهای منفردی که به صورت روزمره مشاهده می‌کنیم، صرفاً نشانه‌های سطحی هستند و همواره الگوهای عمیق‌تری در زیر سطح وجود دارند که آن‌ها را هدایت می‌کنند.", reverse: false },

  // Dim 3
  { dim: 3, text: "هنگام مطالعه مفاهیم جدید یا معماری سیستم‌ها، به راحتی می‌توانم جزئیات غیرضروری را نادیده بگیرم تا سریعاً به هسته اصلی و ساختار بنیادین آن دست یابم.", reverse: false },
  { dim: 3, text: "درک مفاهیم کاملاً ذهنی، انتزاعی و تئوریک برایم به شدت خسته‌کننده است و برای یادگیری، همواره نیازمند درگیر شدن با مثال‌های فیزیکی و ملموس هستم.", reverse: true },
  { dim: 3, text: "در فرآیند یادگیری یک معماری جدید (مثلاً یک فریم‌ورک برنامه‌نویسی یا تئوری فیزیکی)، ابتدا ترجیح می‌دهم اصول بنیادین و انتزاعی آن را درک کنم و سپس به سراغ کدهای اجرایی بروم.", reverse: false },
  { dim: 3, text: "کار در سطح جزئیات فنی و عملیاتی را بسیار ترجیح می‌دهم و علاقه چندانی به پرداختن به مفاهیم کلان، طراحی معماری و مدل‌سازی‌های انتزاعی سیستم ندارم.", reverse: true },
  { dim: 3, text: "استفاده از نمادها، فرمول‌های ریاضی و نمودارهای مفهومی برای مدل‌سازی یک واقعیت پیچیده، یکی از کارآمدترین و راحت‌ترین ابزارها در نظام تفکر من است.", reverse: false },
];

const scaleLabels = ["کاملاً مخالفم", "مخالفم", "نظری ندارم", "موافق", "کاملاً موافقم"];

export default function STITest() {
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
    
    // Normalization: (Total - 20) / 80 * 100
    const normalizedTotal = Math.round(((totalRaw - 20) / 80) * 100);

    let bandTitle = "";
    let bandDesc = "";
    if (normalizedTotal >= 67) {
      bandTitle = "متفکر سیستمی پیشرفته (Advanced)";
      bandDesc = "شما از یک ساختار ذهنی شبکه‌ای، سیال و چندبعدی برخوردارید. توانایی بسیار بالایی در چشم‌پوشی از جزئیات حواس‌پرت‌کن و تمرکز بر الگوهای طراحی کلان (Design Patterns) دارید. این پروفایل شناختی، ایده‌آل‌ترین گزینه برای رهبری فنی پروژه‌های پیچیده است.";
    } else if (normalizedTotal >= 34) {
      bandTitle = "متفکر در حال گذار (Transitional)";
      bandDesc = "شما تا حدودی به پیچیدگی و پویایی سیستم‌ها آگاه هستید، اما هنوز معماری شناختی‌تان به طور کامل یکپارچه نشده است. در شرایط عادی تحلیل‌گر خوبی هستید، اما در بحران‌ها ممکن است به تفکر خطی پناه ببرید. نیاز به تمرین در شبیه‌سازی سناریوهای زمانی دارید.";
    } else {
      bandTitle = "متفکر خطی و واکنشی (Linear/Reactive)";
      bandDesc = "معماری شناختی شما بیشتر بر پایه علت و معلول‌های محلی و خطی استوار است. در مواجهه با سیستم‌های غیرخطی دچار سردرگمی می‌شوید و تمایل دارید مسائل را به شکل مقطعی و سریع (Quick Fix) حل کنید.";
    }
    return { dimScores, normalizedTotal, bandTitle, bandDesc };
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
          color="rgba(99,102,241,0.25)"
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
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 backdrop-blur-sm uppercase tracking-widest font-mono" dir="ltr">
            <Network className="size-3.5" />
            <span>ASSESSMENT · STI</span>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            شاخص تفکر سیستمی
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg text-muted-foreground">
            ظرفیت پردازش شناختی خود را در مواجهه با سیستم‌های پیچیده ارزیابی کنید. آیا به صورت خطی فکر می‌کنید یا شبکه‌ای؟
          </motion.p>
          <motion.div variants={item} className="border-r-4 border-indigo-500/50 pr-4 py-1 text-sm text-muted-foreground">
            این ابزار بر پایه مفاهیم تئوری پیچیدگی و روان‌سنجی طراحی شده است و به شما در درک الگوهای فکری خودتان در برنامه‌نویسی و علوم بنیادین کمک می‌کند.
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
                      <span className="font-mono text-lg font-bold text-indigo-500">
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
                                  ? "bg-indigo-500/10"
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
                                    ? "border-indigo-500 bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
                                    : "border-border/60 bg-background group-hover:border-border"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-[11px] font-medium transition-colors text-center",
                                  answers[q.index] === val
                                    ? "text-indigo-600 dark:text-indigo-400"
                                    : "text-muted-foreground opacity-0 md:opacity-100 group-hover:opacity-100"
                                )}
                              >
                                {scaleLabels[val - 1]}
                              </span>
                            </label>
                          ))}
                        </div>
                        {/* Mobile fallback labels */}
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
                تحلیل معماری شناختی
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
                <div className="font-mono text-7xl font-bold text-indigo-500 sm:text-8xl" dir="ltr">
                  {results?.normalizedTotal}%
                </div>
                <div className="text-sm font-medium text-background/70">
                  شاخص نهایی تفکر سیستمی (STI)
                </div>
                <div className="mt-6 text-2xl font-bold sm:text-3xl text-indigo-300">
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
                // Max score per dim is 25, min is 5.
                // Normalized % for the bar = (score - 5) / 20 * 100
                const pct = ((score - 5) / 20) * 100;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-foreground">{dim.name}</span>
                      <span className="font-mono text-muted-foreground" dir="ltr">
                        {score} / 25
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full"
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
