import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Code2, GraduationCap, Laptop, Route, ShoppingCart, Target, Users } from "lucide-react";
import { Header } from "@/components/header";
import { CourseRegistrationButton } from "@/components/course-registration-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// پس از آماده‌شدن صفحه انجمن علمی، لینک ثبت‌نام در این متغیر قرار می‌گیرد.
const registrationUrl = "https://alenush.com/fa/courses/summer-api-2026";

const sessions = [
  {
    number: "۱",
    title: "API، HTTP و کار عملی با Postman",
    goal: "شناخت ساختار API و ارسال Requestهای مختلف با استفاده از مستندات و Collection یک فروشگاه آنلاین.",
    sections: [
      { title: "مبانی API", items: ["Client، Server، API Consumer و API Provider", "Resource، Endpoint، URL و Base URL", "جایگاه API در معماری نرم‌افزار"] },
      { title: "HTTP و Request", items: ["HTTP و HTTPS و چرخه Request/Response", "متدهای GET، POST، PUT، PATCH و DELETE", "Headers، Query و Path Parameters، Body و Content-Type"] },
      { title: "Response و JSON", items: ["Status Code، Response Headers، Body و Response Time", "Object، Array، انواع داده و ساختارهای تو در تو در JSON", "تحلیل کدهای 2xx، 4xx و 5xx و پیدا کردن خطا"] },
      { title: "کار عملی با Postman", items: ["ساخت Request و ارسال Params، Headers و JSON Body", "Collections، Import، Variables و Environments", "بررسی Endpointهای Products، Categories، Cart و Orders"] },
      { title: "Authentication", items: ["تفاوت Authentication و Authorization", "API Key، Token و Bearer Token", "Login، دریافت Token و ارسال Authorization Header"] },
    ],
  },
  {
    number: "۲",
    title: "کار با API در Python",
    goal: "تبدیل Requestهای آزمایش‌شده در Postman به یک برنامه Python واقعی و قابل اتکا.",
    sections: [
      { title: "Requests و دریافت داده", items: ["نصب و استفاده از کتابخانه requests", "GET Request، Status Code و تبدیل Response به JSON", "Query Parameters، Path Parameters و ساخت URL"] },
      { title: "تغییر داده", items: ["POST، PATCH و DELETE", "ارسال JSON و Request Body", "پردازش Dictionary، List، Nested Data و Array of Objects"] },
      { title: "امنیت و احراز هویت", items: ["Login، دریافت و نگهداری Token", "API Key، Bearer Token و Authorization Header", "Environment Variables، فایل .env، Secretها و .gitignore"] },
      { title: "یک Client مقاوم", items: ["مدیریت Status ناموفق، Connection Error، Timeout و Invalid Response", "Exception Handling و رفتار مناسب هنگام خطا", "Pagination با Page، Limit، Offset و Cursor و مدیریت Rate Limit 429"] },
      { title: "سناریوی عملی", items: ["دریافت و جست‌وجوی محصولات", "ورود و ارسال Request احرازشده", "افزودن محصول به سبد خرید و ایجاد سفارش"] },
    ],
  },
  {
    number: "۳",
    title: "ساخت API با FastAPI",
    goal: "تجربه نقش API Provider با ساخت بخشی از Backend فروشگاه و اتصال دوباره آن به Postman و Python.",
    sections: [
      { title: "شروع FastAPI", items: ["Web Framework و معرفی FastAPI", "ایجاد پروژه، نصب وابستگی‌ها و Development Server", "ساخت اولین Endpoint و شناخت Routeها"] },
      { title: "Products API", items: ["ساخت GET، POST، PATCH و DELETE برای محصولات", "Path و Query Parameters", "دریافت Request Body و بازگرداندن JSON"] },
      { title: "Validation و Response", items: ["Modelها، Type Hints و فیلدهای Required و Optional در Pydantic", "اعتبارسنجی ورودی و مشاهده Validation Error", "Status Codeهای 200، 201، 204 و 404 و Error Handling"] },
      { title: "OpenAPI و Swagger", items: ["API Schema و مستندات خودکار FastAPI", "مشاهده Parameters، Request Body و Response Schema", "آزمایش Endpointها از داخل Swagger UI"] },
      { title: "پروژه پایانی", items: ["اجرای Products API ساخته‌شده", "اتصال Postman به برنامه FastAPI", "اتصال اختیاری Python Client و مشاهده چرخه کامل Client/Server"] },
    ],
  },
];

const tools = ["HTTP / HTTPS", "REST API", "JSON", "Postman", "Python", "Requests", "Environment Variables", ".env", "FastAPI", "Pydantic", "OpenAPI", "Swagger UI"];
const outcomes = ["خواندن مستندات یک API جدید", "انتخاب Endpoint و HTTP Method مناسب", "ساخت Request با Parameters، Headers و Body", "آزمایش API با Postman", "فراخوانی API در Python", "پردازش JSON و مدیریت خطا", "پیاده‌سازی Authentication", "ساخت یک API ساده با FastAPI"];

const endpointExample = `GET     /products
GET     /products/{id}
POST    /products
PATCH   /products/{id}
DELETE  /products/{id}

POST    /auth/login
GET     /users/me
POST    /cart/items
POST    /orders`;

export default function PracticalApiCoursePage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main>
        <section className="border-b border-border bg-linear-to-b from-cyan-500/10 via-background to-background">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <Link href="/courses" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowRight className="size-4" /> بازگشت به دوره‌ها</Link>
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-400"><GraduationCap className="size-4" /> عملی و پروژه‌محور</div>
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">دوره آموزشی <span dir="ltr" className="text-cyan-600 dark:text-cyan-400">API</span></h1>
              <h2 className="mt-3 text-xl font-bold sm:text-2xl">از Postman و Python تا FastAPI</h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">یادگیری عملی API با سناریوی یک فروشگاه آنلاین؛ ابتدا API را در Postman می‌آزماییم، سپس با Python فراخوانی می‌کنیم و در پایان بخشی از آن را با FastAPI می‌سازیم.</p>
              <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">{[[Clock3, "مدت", "۳ جلسه عملی"], [Users, "پیش‌نیاز", "Python مقدماتی"], [Laptop, "همراه داشته باشید", "لپ‌تاپ شخصی"]].map(([Icon, label, value]) => { const ItemIcon = Icon as typeof Clock3; return <div key={label as string} className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-4"><ItemIcon className="size-5 text-cyan-500" /><div><div className="text-xs text-muted-foreground">{label as string}</div><div className="mt-1 text-sm font-bold">{value as string}</div></div></div>; })}</div>
              <CourseRegistrationButton href={registrationUrl} className="mt-6 bg-cyan-600 text-white hover:bg-cyan-700" />
            </div>
          </div>
        </section>

        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-14 sm:px-6 lg:px-8">
          <section className="grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><Target className="mb-4 size-7 text-cyan-500" /><h2 className="text-xl font-extrabold">هدف دوره</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">هدف حفظ تعریف‌ها نیست؛ یاد می‌گیرید مستندات را بخوانید، Request درست بسازید، Response و خطا را تحلیل کنید، احراز هویت انجام دهید و هر دو سمت Client و Server را بفهمید.</p></div><div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><Users className="mb-4 size-7 text-cyan-500" /><h2 className="text-xl font-extrabold">مناسب چه کسانی است؟</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">برای برنامه‌نویسان مقدماتی، علاقه‌مندان Web و Backend و کسانی که می‌خواهند API سرویس‌های پرداخت، پیامک، نقشه، شبکه‌های اجتماعی، سرویس‌های ابری یا هوش مصنوعی را در پروژه‌هایشان به کار بگیرند.</p></div></section>

          <section className="grid items-center gap-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 lg:grid-cols-2 lg:p-10"><div><div className="mb-4 flex items-center gap-2 text-sm font-bold text-cyan-600"><ShoppingCart className="size-5" /> سناریوی مشترک سه جلسه</div><h2 className="text-2xl font-black">API یک فروشگاه آنلاین</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">با Resourceهای Products، Categories، Users، Authentication، Cart و Orders کار می‌کنیم تا هر مفهوم را روی یک سیستم منسجم ببینیم.</p></div><pre dir="ltr" className="overflow-x-auto rounded-2xl bg-zinc-950 p-5 text-left font-mono text-xs leading-6 text-cyan-300"><code>{endpointExample}</code></pre></section>

          <section><div className="mb-8"><span className="text-sm font-bold text-cyan-600">Use → Understand → Implement → Build</span><h2 className="mt-2 text-2xl font-black sm:text-3xl">مسیر و سرفصل سه جلسه</h2></div><div className="space-y-8">{sessions.map((session) => <article key={session.number} className="overflow-hidden rounded-2xl border border-border bg-card"><div className="flex flex-col gap-4 border-b border-border bg-muted/40 p-6 sm:flex-row sm:items-center"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-xl font-black text-white">{session.number}</span><div><h3 className="text-xl font-extrabold">جلسه {session.number} — {session.title}</h3><p className="mt-1 text-sm text-muted-foreground">{session.goal}</p></div></div><div className="grid gap-8 p-6 md:grid-cols-2">{session.sections.map((section) => <div key={section.title}><h4 className="mb-3 flex items-center gap-2 font-bold"><BookOpen className="size-4 text-cyan-500" />{section.title}</h4><ul className="space-y-2">{section.items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-cyan-500" />{item}</li>)}</ul></div>)}</div></article>)}</div></section>

          <section><div className="mb-7"><span className="text-sm font-bold text-cyan-600">ابزارها و فناوری‌ها</span><h2 className="mt-2 text-2xl font-black">جعبه‌ابزار دوره</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{tools.map((tool) => <div key={tool} dir="ltr" className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left"><Code2 className="size-5 text-cyan-500" /><code className="font-bold">{tool}</code></div>)}</div></section>

          <section className="grid gap-8 lg:grid-cols-2"><div className="rounded-2xl border border-border p-6 sm:p-8"><Route className="mb-4 size-7 text-cyan-500" /><h2 className="text-xl font-extrabold">پیش‌نیاز و آماده‌سازی</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">آشنایی مقدماتی با متغیرها، انواع داده، شرط، حلقه، تابع، List، Dictionary و Import در Python توصیه می‌شود. تجربه قبلی API یا Backend لازم نیست. پیش از دوره Python، Postman و یک Code Editor یا IDE را نصب کنید.</p></div><div className="rounded-2xl border border-border p-6 sm:p-8"><GraduationCap className="mb-4 size-7 text-cyan-500" /><h2 className="text-xl font-extrabold">دستاورد نهایی</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{outcomes.map((outcome) => <div key={outcome} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-500" />{outcome}</div>)}</div></div></section>

          <section className="rounded-3xl bg-cyan-600 p-8 text-center text-white sm:p-12"><h2 className="text-2xl font-black">آماده‌اید چرخه کامل API را تجربه کنید؟</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-cyan-50">از خواندن مستندات و ارسال Request تا پردازش Response و ساخت Endpoint در سمت Server.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><CourseRegistrationButton href={registrationUrl} className="bg-white text-cyan-700 hover:bg-cyan-50" /><Link href="/courses" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white")}><ArrowRight className="size-4" /> همه دوره‌ها</Link></div></section>
        </div>
      </main>
    </div>
  );
}
