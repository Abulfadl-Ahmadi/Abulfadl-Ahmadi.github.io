import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  GraduationCap,
  Layers3,
  Target,
  Users,
} from "lucide-react";
import { Header } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseRegistrationButton } from "@/components/course-registration-button";

// پس از آماده‌شدن صفحه انجمن علمی، لینک ثبت‌نام در این متغیر قرار می‌گیرد.
const registrationUrl = "https://alenush.com/fa/courses/summer-latex-2026";

const sessions = [
  {
    number: "۱",
    title: "مبانی LaTeX و نگارش علمی و ریاضی",
    description: "شروع از یک پروژه خالی و آشنایی با منطق LaTeX، ساختار سند، نگارش ریاضی و فارسی‌نویسی.",
    sections: [
      { title: "آشنایی با LaTeX", items: ["تفاوت LaTeX با نرم‌افزارهای واژه‌پرداز", "کاربردهای دانشگاهی و فرایند Source، Compile و PDF", "ساخت اولین سند و شناخت خطاهای متداول Compile"] },
      { title: "ساختار سند", items: ["documentclass، Preamble و Document", "Command، Environment، آرگومان و Option", "Commentها، Packageها و شیوه استفاده از آن‌ها"] },
      { title: "ساختاربندی علمی", items: ["عنوان، نویسنده و تاریخ", "Section، Subsection و Paragraph", "فهرست‌های شماره‌دار و بدون شماره و کاراکترهای خاص"] },
      { title: "نگارش روابط ریاضی", items: ["Inline Math و Display Math؛ توان، اندیس، کسر و رادیکال", "حروف یونانی، توابع، بردارها، مشتق، انتگرال، مجموع و حد", "ماتریس‌ها، روابط چندخطی و شماره‌گذاری روابط", "کار با amsmath، amssymb، amsfonts و آشنایی مقدماتی با amsthm"] },
      { title: "فارسی‌نویسی", items: ["آشنایی با XeLaTeX و xepersian", "تنظیم فونت فارسی و ترکیب متن فارسی و انگلیسی", "استفاده از روابط ریاضی در اسناد فارسی"] },
    ],
  },
  {
    number: "۲",
    title: "جداول، داده‌ها، نمودارها و تصاویر",
    description: "نمایش استاندارد و خوانای اطلاعات و داده‌های علمی در سند.",
    sections: [
      { title: "اعداد، کمیت‌ها و یکاها", items: ["کار با siunitx برای نمایش استاندارد اعداد، کمیت‌ها و یکاها", "عدم‌قطعیت و قالب‌بندی داده‌های عددی", "استفاده از اعداد و یکاها در متن، روابط و جداول"] },
      { title: "ساخت جداول", items: ["محیط‌های tabular و table، تعریف سطر و ستون و Alignment", "Caption، Label و شماره‌گذاری", "جداول علمی خوانا با booktabs و ستون‌های عددی siunitx"] },
      { title: "رسم داده‌های علمی", items: ["workflow اصلی pgfplots و تعریف محورهای نمودار", "عنوان، برچسب محورها و وارد کردن داده‌ها", "رسم نقاط، نمودارهای خطی و داده‌های گسسته و تنظیم ظاهر"] },
      { title: "تصاویر و شکل‌ها", items: ["درج و تنظیم ابعاد تصاویر با graphicx", "محیط figure، Caption، Label و شماره‌گذاری خودکار", "افزودن خروجی نمودارهای نرم‌افزارهای دیگر به سند"] },
    ],
  },
  {
    number: "۳",
    title: "ارجاع‌دهی، مدیریت منابع و سند نهایی",
    description: "اتصال اجزای سند، مدیریت منابع علمی و آماده‌سازی خروجی نهایی.",
    sections: [
      { title: "ارجاع داخلی", items: ["label، ref و eqref", "ارجاع خودکار به روابط، شکل‌ها، جداول و Sectionها", "نام‌گذاری درست Labelها و مزیت ارجاع خودکار"] },
      { title: "منابع علمی و فایل .bib", items: ["Citation، Bibliography و ساخت و مدیریت فایل .bib", "ساختار BibTeX Entry، Citation Key و انواع article، book، inproceedings و misc", "فیلدهای author، title، journal، year، volume، number، pages، publisher، doi و url", "biblatex، biber و Citation/Bibliography Style", "دریافت اطلاعات BibTeX منابع و آشنایی با ابزارهای مدیریت منابع"] },
      { title: "صفحه‌آرایی", items: ["اندازه صفحه و حاشیه‌ها با geometry", "Header، Footer، شماره صفحه و اطلاعات سربرگ و پابرگ با fancyhdr"] },
      { title: "جمع‌بندی", items: ["تکمیل ساختار یک سند علمی کامل", "سازمان‌دهی فایل‌ها و عیب‌یابی خطاهای Compile", "استفاده از مستندات Packageها و مسیر ادامه یادگیری"] },
    ],
  },
];

const packages = [
  ["amsmath", "مدیریت روابط ریاضی"], ["amssymb", "نمادهای ریاضی"], ["amsfonts", "فونت‌ها و مجموعه‌های ریاضی"],
  ["amsthm", "محیط‌های theorem"], ["xepersian", "فارسی‌نویسی"], ["siunitx", "اعداد، کمیت‌ها و یکاها"],
  ["booktabs", "جداول علمی"], ["graphicx", "مدیریت تصاویر"], ["pgfplots", "رسم و نمایش داده‌ها"],
  ["biblatex / biber", "ارجاع و مدیریت منابع"], ["geometry", "ابعاد و حاشیه‌ها"], ["fancyhdr", "سربرگ و پابرگ"],
];

const outcomes = ["متن فارسی و انگلیسی", "بخش‌ها و زیربخش‌ها", "روابط و نمادهای ریاضی", "جدول و نمودار داده‌ها", "تصاویر و شماره‌گذاری خودکار", "ارجاع داخلی", "Citation و فهرست منابع .bib", "صفحه‌آرایی استاندارد"];

export default function LatexCoursePage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main>
        <section className="border-b border-border bg-linear-to-b from-violet-500/10 via-background to-background">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <Link href="/courses" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowRight className="size-4" /> بازگشت به دوره‌ها
            </Link>
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-600 dark:text-violet-400">
                <GraduationCap className="size-4" /> دوره مقدماتی و پروژه‌محور
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">آموزش کاربردی <span dir="ltr" className="text-violet-600 dark:text-violet-400">LaTeX</span> برای نگارش علمی و دانشگاهی</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">در این دوره، بدون نیاز به آشنایی قبلی با LaTeX، مهم‌ترین ابزارهای موردنیاز برای تهیه یک سند علمی استاندارد را در قالب یک پروژه واقعی یاد می‌گیرید؛ نه صرفاً مجموعه‌ای از دستورها.</p>
              <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
                {[[Clock3, "مدت دوره", "۳ جلسه ۷۰ دقیقه‌ای"], [Layers3, "سطح", "مقدماتی"], [Users, "پیش‌نیاز", "ندارد"]].map(([Icon, label, value]) => {
                  const ItemIcon = Icon as typeof Clock3;
                  return <div key={label as string} className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-4"><ItemIcon className="size-5 text-violet-500" /><div><div className="text-xs text-muted-foreground">{label as string}</div><div className="mt-1 text-sm font-bold">{value as string}</div></div></div>;
                })}
              </div>
              <CourseRegistrationButton href={registrationUrl} className="mt-6" />
            </div>
          </div>
        </section>

        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-14 sm:px-6 lg:px-8">
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><Target className="mb-4 size-7 text-violet-500" /><h2 className="text-xl font-extrabold">هدف دوره</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">پس از سه جلسه می‌توانید به‌صورت مستقل یک سند علمی یا فنی استاندارد بسازید و ساختار، محتوای چندزبانه، داده‌ها، ارجاعات و ظاهر آن را مدیریت کنید.</p></div>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><Users className="mb-4 size-7 text-violet-500" /><h2 className="text-xl font-extrabold">این دوره برای چه کسانی است؟</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">دانشجویان تمام رشته‌ها، به‌ویژه علوم پایه و مهندسی که با گزارش علمی و فنی، روابط ریاضی، داده‌ها، مقاله، پروژه یا پایان‌نامه سروکار دارند.</p></div>
          </section>

          <section><div className="mb-8"><span className="text-sm font-bold text-violet-500">برنامه آموزشی</span><h2 className="mt-2 text-2xl font-black sm:text-3xl">سرفصل جلسات</h2></div><div className="space-y-8">{sessions.map((session) => <article key={session.number} className="overflow-hidden rounded-2xl border border-border bg-card"><div className="flex flex-col gap-4 border-b border-border bg-muted/40 p-6 sm:flex-row sm:items-center"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-xl font-black text-white">{session.number}</span><div><h3 className="text-xl font-extrabold">جلسه {session.number} — {session.title}</h3><p className="mt-1 text-sm text-muted-foreground">{session.description}</p></div></div><div className="grid gap-8 p-6 md:grid-cols-2">{session.sections.map((section) => <div key={section.title}><h4 className="mb-3 flex items-center gap-2 font-bold"><BookOpen className="size-4 text-violet-500" />{section.title}</h4><ul className="space-y-2">{section.items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-violet-500" /><span>{item}</span></li>)}</ul></div>)}</div></article>)}</div></section>

          <section><div className="mb-7"><span className="text-sm font-bold text-violet-500">جعبه‌ابزار دوره</span><h2 className="mt-2 text-2xl font-black">Packageها و ابزارهای اصلی</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{packages.map(([name, use]) => <div key={name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"><Code2 className="size-5 shrink-0 text-violet-500" /><div><code dir="ltr" className="font-bold text-foreground">{name}</code><p className="mt-0.5 text-xs text-muted-foreground">{use}</p></div></div>)}</div></section>

          <section className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6 sm:p-10"><div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]"><div><span className="text-sm font-bold text-violet-500">خروجی مورد انتظار</span><h2 className="mt-2 text-2xl font-black">در پایان چه می‌سازید؟</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">از یک پروژه خالی شروع می‌کنید و به یک سند علمی یا فنی کامل، منظم و قابل توسعه می‌رسید.</p></div><div className="grid gap-3 sm:grid-cols-2">{outcomes.map((outcome, index) => <div key={outcome} className="flex items-center gap-3 rounded-xl bg-background p-3 text-sm font-medium shadow-sm"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-500">{index + 1}</span>{outcome}</div>)}</div></div></section>

          <section className="text-center"><h2 className="text-2xl font-black">یادگیری عملی، قابل استفاده و مستقل</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">مثال‌ها محدود به یک رشته خاص نیستند و برای دانشجویان رشته‌های مختلف علوم و مهندسی طراحی شده‌اند. هدف نهایی، توانایی استفاده مستقل از LaTeX برای نیازهای واقعی دانشگاهی است.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><CourseRegistrationButton href={registrationUrl} /><Link href="/courses" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}><ArrowRight className="size-4" /> مشاهده همه دوره‌ها</Link></div></section>
        </div>
      </main>
    </div>
  );
}
