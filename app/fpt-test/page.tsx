"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Header } from "@/components/header";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import { Atom, RefreshCcw } from "lucide-react";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

// Frozen at build time via next.config `env`
const BUILD_YEAR = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026";

const dims = [
  { name: "ساختارشکنی فرضیات", short: "ساختارشکنی", max: 35 },
  { name: "استدلال استقرایی", short: "استقرا", max: 35 },
  { name: "مقاومت در برابر باورها", short: "مقاومت", max: 35 },
  { name: "خلاقیت ساختاری", short: "خلاقیت", max: 45 },
];

const questions = [
  // Dim 0
  { dim: 0, text: "وقتی با یک بحران فنی یا مدیریتی روبرو می‌شوم، اولین قدم من مکتوب کردن و سپس زیر سؤال بردن پیش‌فرض‌هایی است که کاملاً بدیهی به نظر می‌رسند.", reverse: false },
  { dim: 0, text: "معمولاً محدودیت‌هایی را که توسط افراد باسابقه در یک پروژه مطرح می‌شوند، به عنوان مرزهای واقعی و غیرقابل‌تغییر می‌پذیرم.", reverse: true },
  { dim: 0, text: "من از روش پرسشگری متوالی (چرا؟) به صورت مداوم استفاده می‌کنم تا از علائم ظاهری یک مشکل عبور کرده و به علت اصلی و فیزیکی/منطقی آن برسم.", reverse: false },
  { dim: 0, text: 'کلماتی مانند "همیشه"، "هرگز" یا "تنها راه" در صورت‌مسئله‌ها را به راحتی می‌پذیرم و آن‌ها را به چالش نمی‌کشم.', reverse: true },
  { dim: 0, text: 'در مواجهه با قوانین یک سیستم، دائماً از خود می‌پرسم: "اگر این قانون که ظاهراً ضروری است را به طور کامل حذف کنیم، چه اتفاقی می‌افتد؟"', reverse: false },
  { dim: 0, text: 'تفکیک قائل شدن میان "محدودیت‌های سخت (قوانین فیزیک/اقتصاد)" و "محدودیت‌های نرم (بودجه، رویه‌های قبلی)" برای من دشوار است.', reverse: true },
  { dim: 0, text: "معتقدم اکثر رویه‌های استاندارد، در طول زمان بهینه‌ترین حالت خود را پیدا کرده‌اند و بازنگری بنیادین آن‌ها اتلاف وقت است.", reverse: true },
  
  // Dim 1
  { dim: 1, text: "هنگام طراحی یک راه‌حل جدید، مسئله را تا سطحی که شامل حقایق محض، عینی و غیرقابل‌انکار است تجزیه می‌کنم و از آن نقطه شروع به ساختن می‌کنم.", reverse: false },
  { dim: 1, text: "برای رسیدن به یک راه‌حل سریع، ترجیح می‌دهم از قیاس با نمونه‌های موفق شرکت‌ها یا پروژه‌های مشابه استفاده کنم تا اینکه همه چیز را از صفر اثبات کنم.", reverse: true },
  { dim: 1, text: "من مهارت بالایی در تفکیک داده‌های خام و عینی، از تفسیرها، سوگیری‌ها و احساسات سازمانی دارم.", reverse: false },
  { dim: 1, text: "به جای خلق یک چارچوب تحلیلی سفارشی برای مسائلی با ابعاد جدید، سعی می‌کنم مدل‌های حفظ‌شده و قالب‌های آماده را روی آن‌ها اعمال کنم.", reverse: true },
  { dim: 1, text: "پیش از پذیرش هر نوع نتیجه‌گیری، به صورت سیستماتیک ردیابی می‌کنم که آیا تمام ورودی‌های اطلاعاتی آن به درستی و به صورت مستقل اثبات شده‌اند یا خیر.", reverse: false },
  { dim: 1, text: "انتزاع مفاهیم (حذف جزئیات غیرضروری برای درک هسته مرکزی مسئله) مهارتی است که به طور پیوسته از آن بهره می‌برم.", reverse: false },
  { dim: 1, text: "واکاوی بیش از حد جزئیات پایه و داده‌های بنیادی، من را گیج کرده و از دیدن تصویر بزرگ‌تر باز می‌دارد.", reverse: true },

  // Dim 2
  { dim: 2, text: 'اگر شواهد بنیادی به دست آمده با "عقل سلیم" یا اجماع عمومی در تضاد باشد، بدون تردید شواهد بنیادی را مبنای تصمیم‌گیری قرار می‌دهم.', reverse: false },
  { dim: 2, text: "مخالفت با رویکردی که اکثر متخصصان و اتوریته‌های یک حوزه روی آن اتفاق نظر دارند را غیرمنطقی و پرریسک می‌دانم.", reverse: true },
  { dim: 2, text: 'من تمایل و انرژی زیادی برای متلاشی کردن فرآیندهایی دارم که صرفاً با استدلال "این کار همیشه به این شکل انجام می‌شده است" توجیه می‌شوند.', reverse: false },
  { dim: 2, text: "هنگام ارائه ایده‌های کاملاً بدیع، به شدت نگرانم که به دلیل عدم تطابق با استانداردهای فعلی صنعت، توسط همکارانم طرد شوم.", reverse: true },
  { dim: 2, text: "در صورت فقدان استدلال منطقی و بنیادی، به راحتی می‌توانم توصیه‌های خروجی سیستم‌های هوش مصنوعی یا متخصصان ارشد را به چالش بکشم.", reverse: false },
  { dim: 2, text: "در مواجهه با ابهام، پیروی از الگوهای رایج و رفتارهای تقلیدی بازار را بهترین استراتژی برای بقا و کاهش ریسک می‌دانم.", reverse: true },
  { dim: 2, text: "من از خودمختاری شناختی بالایی برخوردارم و نیازی به تأیید اجتماعی برای باور به حقایقی که مستقلاً اثبات کرده‌ام، ندارم.", reverse: false },

  // Dim 3
  { dim: 3, text: "توانایی بالایی در کنار هم قرار دادن اجزای کاملاً متفاوت و طراحی یک راهکار کاملاً جدید از نقطه صفر (From Scratch) دارم.", reverse: false },
  { dim: 3, text: "وقتی با سیستمی مواجه می‌شوم که بهره‌وری پایینی دارد، ترجیح می‌دهم فقط قطعات معیوب را تعمیر کنم تا اینکه کل معماری آن را از پایه بازطراحی کنم.", reverse: true },
  { dim: 3, text: 'در ایده‌پردازی، به جای پرسیدن "چگونه فرم موجود را ۱۰٪ بهبود دهیم؟"، می‌پرسم "چگونه این کارکرد را با فرمی کاملاً متفاوت و با ۱۰۰٪ بازدهی به دست آوریم؟"', reverse: false },
  { dim: 3, text: "معمولاً هنگام طراحی یک فرآیند یا محصول جدید، ناخودآگاه ویژگی‌های فرمیِ محصولات مشابه موجود در بازار، مسیر تفکر مرا تعیین می‌کنند.", reverse: true },
  { dim: 3, text: "من می‌توانم با نادیده گرفتن تمام تاریخچه یک موضوع، سیستمی بسازم که تنها بر اساس بازدهی و اصول فیزیکی/ریاضی/اقتصادی آن بهینه شده باشد.", reverse: false },
  { dim: 3, text: "فکر کردن به راه‌حل‌هایی که هیچ نمونه فیزیکی مشابهی در گذشته نداشته‌اند، ذهن مرا فلج کرده و برایم بسیار مبهم است.", reverse: true },
  { dim: 3, text: "وقتی راه‌حل جدیدی طراحی می‌کنم، به سرعت آن را از طریق شبیه‌سازی ذهنی برای کشف پیامدهای ثانویه و اثرات مرتبه دوم آزمایش می‌کنم.", reverse: false },
  { dim: 3, text: "راه‌حل‌هایی که طراحی می‌کنم معمولاً نسخه‌های ارتقایافته (Incremental) از وضع موجود هستند، نه جهش‌های رادیکال و دگرگون‌کننده.", reverse: true },
  { dim: 3, text: "من معتقدم هر ساختار پیچیده‌ای را می‌توان چنان بهینه‌سازی کرد که با حداقل ورودی (منابع)، خروجی سیستم به صورت نمایی افزایش یابد.", reverse: false },
];

const scaleLabels = ["کاملاً مخالفم", "مخالفم", "نظری ندارم", "موافق", "کاملاً موافقم"];

export default function FPTTest() {
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
    if (totalRaw >= 111) {
      bandTitle = "معمار اصول اولیه (First Principles Architect)";
      bandDesc = "ذهن شما مانند یک راکتور عمل می‌کند که پیش‌فرض‌های کاذب را در هم شکسته و با استخراج حقایق، ساختارهای جدید را با حداقل اتلاف مهندسی می‌کند. شما خالق نوآوری‌های ساختارشکنانه هستید و مقاومت بالایی در برابر فشارهای رایج دارید.";
    } else if (totalRaw >= 71) {
      bandTitle = "بهینه‌ساز سیستم (System Optimizer)";
      bandDesc = "شما در مرز میان تفکر قیاسی و تفکر بنیادین قرار دارید. از تفکر تحلیلی قوی برخوردارید و می‌توانید فرآیندهای موجود را بهینه کنید. تا حدی فرضیات را زیر سؤال می‌برید اما برای آغاز از «نقطه صفر» به تمرین بیشتر نیاز دارید.";
    } else {
      bandTitle = "مقلد استقرایی و قیاسی (Analogical Imitator)";
      bandDesc = "ذهن شما تمایل شدیدی به حفظ انرژی و استفاده از میان‌برها دارد. جهان را عمدتاً از طریق الگوهای موروثی و قیاس درک می‌کنید. در مواجهه با ابهام، به روش‌های استاندارد وابسته هستید که این امر نوآوری بنیادین را محدود می‌کند.";
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
          color="rgba(16,185,129,0.25)"
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
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-sm uppercase tracking-widest font-mono" dir="ltr">
            <Atom className="size-3.5" />
            <span>ASSESSMENT · FPTQ</span>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            ضریب تفکر از اصول اولیه
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg text-muted-foreground">
            ظرفیت خود را در ساختارشکنی فرضیات و مهندسی راه‌حل‌های بنیادین از نقطه صفر بسنجید.
          </motion.p>
          <motion.div variants={item} className="border-r-4 border-emerald-500/50 pr-4 py-1 text-sm text-muted-foreground">
            این آزمون مبتنی بر روان‌سنجی فیزیک‌محور طراحی شده و تفکر قیاسی (تقلیدی) را در برابر تفکر تحلیلی بنیادین اندازه می‌گیرد.
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
                      <span className="font-mono text-lg font-bold text-emerald-500">
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
                                  ? "bg-emerald-500/10"
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
                                    ? "border-emerald-500 bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
                                    : "border-border/60 bg-background group-hover:border-border"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-[11px] font-medium transition-colors text-center",
                                  answers[q.index] === val
                                    ? "text-emerald-600 dark:text-emerald-400"
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
                پردازش معماری شناختی
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
                  <div className="font-mono text-7xl font-bold text-emerald-500 sm:text-8xl">
                    {results?.totalRaw}
                  </div>
                  <div className="font-mono text-3xl font-bold text-muted-foreground/50 sm:text-4xl">
                    / 150
                  </div>
                </div>
                
                <div className="text-sm font-medium text-background/70 mt-2">
                  ضریب تفکر از اصول اولیه (FPTQ)
                </div>
                <div className="mt-6 text-2xl font-bold sm:text-3xl text-emerald-300">
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
                // Min score is dimQuestions.length. 
                // Questions per dim: 7, 7, 7, 9
                const min = i === 3 ? 9 : 7;
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
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
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
