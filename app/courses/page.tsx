"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { GraduationCap, BookOpen, Download, Users, CheckCircle, Code, Award } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const courses = [
  {
    id: "physics-10",
    title: "High School 10th Grade Physics",
    category: "Physics Academy",
    duration: "Full Academic Year",
    studentsCount: "120+ Students",
    icon: BookOpen,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    description: "Fundamental principles of mechanics, energy conservation, work, power, and introduction to thermodynamics.",
    syllabus: [
      "Kinematics in 1D & 2D Motion",
      "Newtonian Dynamics & Forces",
      "Work, Energy, & Conservation Laws",
      "Mechanical Properties of Matter & Fluids",
      "Thermodynamics & Heat Capacity",
    ],
  },
  {
    id: "physics-12",
    title: "High School 12th Grade Physics",
    category: "Advanced Physics",
    duration: "Full Academic Year",
    studentsCount: "95+ Students",
    icon: Award,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Advanced preparation for university entrance exams covering wave optics, electromagnetism, and atomic physics.",
    syllabus: [
      "Oscillations & Harmonic Motion",
      "Mechanical Waves & Sound",
      "Electric Fields & Potential",
      "Direct Current & Magnetic Fields",
      "Modern Physics & Atomic Structure",
    ],
  },
  {
    id: "programming-101",
    title: "Basic Programming & Algorithmic Thinking",
    category: "Computer Science",
    duration: "12 Weeks Intensive",
    studentsCount: "80+ Students",
    icon: Code,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "Introduction to problem-solving, structured programming, control flow, data structures, and algorithmic complexity.",
    syllabus: [
      "Variables, Data Types, & Operations",
      "Conditional Logic & Loop Iteration",
      "Functional Decomposition & Modular Code",
      "Arrays, Maps, & Data Structures",
      "Sorting & Searching Algorithms",
    ],
  },
];

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <GraduationCap className="size-3.5" />
            <span>Academy Archive</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Educational Courses & Teaching Archive</h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Archive of conducted educational courses, syllabi, lecture slides, and curriculum frameworks designed to build problem-solving capabilities in high school physics and computer science.
          </p>
        </div>

        {/* Courses Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between shadow-sm hover:border-indigo-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${course.bgColor} ${course.borderColor} border`}>
                      <Icon className={`size-6 ${course.color}`} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted/60">
                      {course.category}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold tracking-tight mt-4 group-hover:text-indigo-500 transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mt-4 py-2 border-y border-border/50">
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" />
                      {course.studentsCount}
                    </span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>

                  {/* Syllabus breakdown */}
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase font-mono text-foreground">Syllabus Highlights</span>
                    <ul className="flex flex-col gap-1.5">
                      {course.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="size-3.5 text-indigo-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                  <Button variant="outline" size="sm" className="w-full text-xs font-mono flex items-center gap-2">
                    <Download className="size-3.5" />
                    Download Syllabus & Slides (PDF)
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Teaching Philosophy Callout */}
        <section className="rounded-2xl border border-border bg-card/60 p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-xl font-bold tracking-tight">Teaching & Pedagogy Approach</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Focusing on intuitive understanding before mathematical rigor. By visualizing physical phenomena with dynamic simulations and decomposing code problems step-by-step, students develop authentic problem-solving skills rather than memorization.
            </p>
          </div>
          <Link href="/about" className={cn(buttonVariants({ variant: "default" }), "h-10 px-5 active:scale-97 transition-transform shrink-0")}>
            Instructor Resume & Qualifications
          </Link>
        </section>

      </main>

      <footer className="border-t border-border bg-card/20 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} Abulfadl Ahmadi. Educational Archive.</div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>•</span>
            <a href="/notes" className="hover:text-foreground">Physics Notes</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
