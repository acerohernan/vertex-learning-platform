import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { HeroSearch } from "@/components/search/hero-search";
import { CourseCard } from "@/components/cards/course-card";
import {
  DockerMark,
  NextjsMark,
  TypeScriptMark,
} from "@/components/cards/course-marks";
import { FooterArt } from "@/components/home/footer-art";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Search your learning in plain English",
  description:
    "Vertex understands what you want to learn and finds the exact lessons across all your courses.",
};

const courses = [
  {
    slug: "nextjs-for-production",
    title: "Next.js for Production",
    description:
      "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
    mark: <NextjsMark />,
  },
  {
    slug: "docker-essentials",
    title: "Docker Essentials",
    description:
      "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
    mark: <DockerMark />,
  },
  {
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    description:
      "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
    mark: <TypeScriptMark />,
  },
];

export default function Home() {
  return (
    <div className="paper-hatch min-h-screen bg-canvas sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col border-line bg-canvas sm:border-x">
        <SiteHeader />

        <main className="flex-1">
          <section className="border-b border-line px-5 py-12 text-center sm:px-8 sm:py-16 lg:pt-[70px] lg:pb-[50px]">
            <div className="mx-auto flex max-w-[760px] flex-col items-center">
              <span className="inline-flex items-center rounded-lg border border-accent-200 bg-accent-50 px-6 py-2.5 text-[10.5px] font-semibold uppercase leading-none tracking-[0.16em] text-accent-600 sm:text-[11px]">
                Intelligent Learning
              </span>

              <h1 className="mt-7 text-balance font-display text-[40px] font-semibold leading-[1.06] tracking-[-0.02em] text-neutral-900 sm:text-[52px] lg:text-[60px] lg:leading-[1.1]">
                <span className="lg:block">Search your learning</span>{" "}
                <span className="lg:block">in plain English.</span>
              </h1>

              <p className="mt-8 max-w-[500px] text-balance text-[16px] leading-7 text-neutral-500 sm:text-[18px] lg:text-[20px] lg:leading-8">
                Vertex understands what you want to learn and finds the exact
                lessons across all your courses.
              </p>

              <Button
                href="/courses"
                variant="accent"
                size="xl"
                className="mt-9 sm:mt-10"
                icon={
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="h-[18px] w-[18px]"
                  />
                }
              >
                Explore Courses
              </Button>

              <div className="mt-9 w-full max-w-[752px] sm:mt-10 lg:mt-11">
                <HeroSearch />
              </div>
            </div>
          </section>

          <section
            aria-labelledby="all-courses"
            className="px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:pt-[60px] lg:pb-4"
          >
            <div className="flex items-baseline justify-between gap-6">
              <h2
                id="all-courses"
                className="font-display text-[24px] font-semibold leading-tight text-neutral-900 sm:text-[26px]"
              >
                All Courses
              </h2>
              <Link
                href="/courses"
                className="inline-flex shrink-0 items-center gap-2 rounded-sm text-[14px] font-medium text-accent-600 transition-colors hover:text-accent-700 focus-visible:ring-2 focus-visible:ring-accent-200 sm:text-[15px]"
              >
                View all courses
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="h-[17px] w-[17px]"
                />
              </Link>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <li key={course.slug} className="min-w-0">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  >
                    <CourseCard
                      variant="featured"
                      title={course.title}
                      description={course.description}
                      level={course.level}
                      duration={course.duration}
                      modules={course.modules}
                      mark={course.mark}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <FooterArt />
      </div>
    </div>
  );
}
