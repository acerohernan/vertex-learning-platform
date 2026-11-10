import type { ReactNode } from "react";
import {
  Accessibility,
  Bell,
  Bookmark,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  Clock3,
  ExternalLink,
  Eye,
  FileText,
  LayoutGrid,
  Play,
  Search,
  Target,
  User,
} from "lucide-react";
import { VertexLogo } from "@/components/brand/logo";
import { CourseCard } from "@/components/cards/course-card";
import {
  LessonTopicCard,
  LessonVideoCard,
} from "@/components/cards/lesson-card";
import { ResourceCard } from "@/components/cards/resource-card";
import {
  Caption,
  SectionCard,
  SectionHeading,
  SpecList,
} from "@/components/design-system/section";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Pagination } from "@/components/navigation/pagination";
import { SiteNav } from "@/components/navigation/site-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchField, SelectField } from "@/components/ui/field";
import { PlayBadge } from "@/components/ui/play-badge";
import { ProgressBar } from "@/components/ui/progress";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { cn } from "@/lib/cn";

const primaryColors = [
  { name: "Primary 500", hex: "#F97316" },
  { name: "Primary 400", hex: "#FB923C" },
  { name: "Primary 300", hex: "#FDBA74" },
  { name: "Primary 200", hex: "#FED7AA" },
  { name: "Primary 100", hex: "#FFEEE5" },
];

const neutralColors = [
  { name: "Neutral 900", hex: "#0F172A" },
  { name: "Neutral 700", hex: "#334155" },
  { name: "Neutral 500", hex: "#64748B" },
  { name: "Neutral 300", hex: "#CBD5E1" },
  { name: "Neutral 200", hex: "#E2E8F0" },
  { name: "Neutral 100", hex: "#F1F5F9" },
  { name: "Neutral 50", hex: "#FAFAFC" },
  { name: "White", hex: "#FFFFFF" },
];

const typeScale = [
  ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles"],
  ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles"],
  ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles"],
  ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section"],
  ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles"],
  ["Body Large", "Inter", "16 / 24", "Regular", "Body copy"],
  ["Body", "Inter", "14 / 20", "Regular", "Supporting text"],
  ["Small", "Inter", "12 / 16", "Regular", "Captions, meta"],
];

const spacingSteps = [
  { px: 4, rem: "0.25rem" },
  { px: 8, rem: "0.5rem" },
  { px: 12, rem: "0.75rem" },
  { px: 16, rem: "1rem" },
  { px: 24, rem: "1.5rem" },
  { px: 32, rem: "2rem" },
  { px: 40, rem: "2.5rem" },
  { px: 48, rem: "3rem" },
  { px: 64, rem: "4rem" },
];

const radii = [
  { value: "4px", token: "(xs)", radius: 4 },
  { value: "8px", token: "(sm)", radius: 8 },
  { value: "12px", token: "(md)", radius: 12 },
  { value: "16px", token: "(lg)", radius: 16 },
  { value: "24px", token: "(xl)", radius: 24 },
  { value: "Full", token: "(circle)", radius: 9999 },
];

const shadows = [
  {
    name: "Sm",
    value: "0 1px 2px 0\nrgba(15, 23, 42, 0.05)",
    className: "shadow-sm",
  },
  {
    name: "Md",
    value: "0 4px 12px -2px\nrgba(15, 23, 42, 0.08)",
    className: "shadow-md",
  },
  {
    name: "Lg",
    value: "0 12px 24px -4px\nrgba(15, 23, 42, 0.10)",
    className: "shadow-lg",
  },
  {
    name: "Xl",
    value: "0 20px 40px -8px\nrgba(15, 23, 42, 0.12)",
    className: "shadow-xl",
  },
];

const outlineIcons = [
  { name: "Notifications", icon: <Bell /> },
  { name: "Search", icon: <Search /> },
  { name: "Play", icon: <Play /> },
  { name: "Document", icon: <FileText /> },
  { name: "Bookmark", icon: <Bookmark /> },
  { name: "Analytics", icon: <ChartNoAxesColumnIncreasing /> },
  { name: "Time", icon: <Clock3 /> },
  { name: "Profile", icon: <User /> },
  { name: "Next", icon: <ChevronRight /> },
];

const filledIcons = [
  { name: "Notifications", icon: <Bell fill="currentColor" strokeWidth={1} /> },
  { name: "Search", icon: <Search strokeWidth={3} /> },
  { name: "Play", icon: <Play fill="currentColor" strokeWidth={1} /> },
  { name: "Document", icon: <FileText fill="currentColor" strokeWidth={1} /> },
  { name: "Bookmark", icon: <Bookmark fill="currentColor" strokeWidth={1} /> },
  {
    name: "Analytics",
    icon: <ChartNoAxesColumnIncreasing strokeWidth={2.8} />,
  },
  { name: "Time", icon: <Clock3 strokeWidth={2.8} /> },
  { name: "Profile", icon: <User fill="currentColor" strokeWidth={1} /> },
  { name: "Next", icon: <ChevronRight strokeWidth={3} /> },
];

function TraitList({ traits }: { traits: string[] }) {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
      {traits.map((trait, index) => (
        <span key={trait} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-primary-400"
            />
          ) : null}
          {trait}
        </span>
      ))}
    </p>
  );
}

function IconGrid({
  icons,
  label,
}: {
  icons: Array<{ name: string; icon: ReactNode }>;
  label: string;
}) {
  return (
    <div
      role="list"
      aria-label={label}
      className="mt-3 grid grid-cols-9 gap-1.5 text-neutral-900"
    >
      {icons.map(({ name, icon }) => (
        <span
          key={name}
          role="listitem"
          title={name}
          className="flex h-6 items-center justify-center [&_svg]:h-[18px] [&_svg]:w-[18px]"
        >
          {icon}
        </span>
      ))}
    </div>
  );
}

function ColorSwatch({
  name,
  hex,
  className,
}: {
  name: string;
  hex: string;
  className?: string;
}) {
  return (
    <div className="min-w-0">
      <div
        className={cn(
          "h-12 w-full rounded-sm ring-1 ring-inset ring-black/5",
          className,
        )}
        style={{ backgroundColor: hex }}
      />
      <p className="mt-2 text-[10.5px] font-semibold leading-4 text-neutral-700">
        {name}
      </p>
      <p className="text-[10px] font-medium leading-4 text-neutral-500">
        {hex}
      </p>
    </div>
  );
}

export const metadata = {
  title: "Design System · Vertex",
  description:
    "The Vertex design system: colors, typography, spacing, radii, shadows, icons, controls, feedback, cards, navigation and principles.",
};

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-4 px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      {/* 01 — Hero and colors */}
      <SectionCard className="overflow-hidden">
        <div className="grid lg:grid-cols-[34%_minmax(0,1fr)] xl:grid-cols-[32%_minmax(0,1fr)]">
          <div className="flex flex-col p-7 sm:p-9 lg:border-r lg:border-line xl:p-10">
            <VertexLogo
              markClassName="h-9"
              wordmarkClassName="text-2xl"
              className="gap-3"
            />

            <div className="mt-10 xl:mt-14">
              <h1 className="font-display text-[42px] leading-[1.1] tracking-[-0.02em] text-neutral-900 xl:text-display-1">
                Design System
              </h1>
              <p className="mt-5 max-w-[300px] text-body-large leading-7 text-neutral-500">
                A unified design language for Vertex learning platform. Clean,
                modern and focused on clarity, consistency and intuitive
                learning experiences.
              </p>
            </div>

            <p className="mt-auto pt-12 text-[11px] font-medium uppercase leading-4 tracking-[0.16em] text-neutral-500">
              Version 1.0
              <span aria-hidden="true" className="px-1.5 text-neutral-300">
                ·
              </span>
              May 2025
            </p>
          </div>

          <div className="p-6 sm:p-8 xl:p-9">
            <SectionHeading number="01" title="Colors" className="mb-6" />

            <Caption>Primary</Caption>
            <div className="mt-3 grid grid-cols-4 gap-x-3 gap-y-5 md:grid-cols-5 lg:grid-cols-8">
              {primaryColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>

            <Caption className="mt-6">Neutral</Caption>
            <div className="mt-3 grid grid-cols-4 gap-x-3 gap-y-5 md:grid-cols-5 lg:grid-cols-8">
              {neutralColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 02–03 — Typography and type scale */}
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.4fr]">
        <SectionCard className="p-6 xl:p-8">
          <SectionHeading number="02" title="Typography" />

          <div className="mt-8 flex flex-col gap-8 xl:mt-10">
            <div className="flex items-center gap-6 xl:gap-9">
              <span
                aria-hidden="true"
                className="w-[92px] shrink-0 font-display text-[64px] leading-none tracking-[-0.04em] xl:text-[72px]"
              >
                Ag
              </span>
              <div className="min-w-0">
                <p className="font-display text-[22px] leading-7 text-neutral-900">
                  Playfair Display
                </p>
                <TraitList traits={["Elegant", "Readable", "Timeless"]} />
              </div>
            </div>

            <div className="flex items-center gap-6 xl:gap-9">
              <span
                aria-hidden="true"
                className="w-[92px] shrink-0 font-sans text-[64px] font-normal leading-none tracking-[-0.04em] xl:text-[72px]"
              >
                Ag
              </span>
              <div className="min-w-0">
                <p className="text-[22px] font-medium leading-7 text-neutral-900">
                  Inter
                </p>
                <TraitList traits={["Clean", "Modern", "Highly legible"]} />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="p-6 xl:p-8">
          <SectionHeading number="03" title="Type Scale" />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[500px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[22%]" />
                <col className="w-[21%]" />
                <col className="w-[19%]" />
                <col className="w-[16%]" />
                <col className="w-[22%]" />
              </colgroup>
              <thead>
                <tr className="text-[11px] font-medium leading-4 text-neutral-500">
                  <th scope="col" className="pb-3 font-medium">
                    Style
                  </th>
                  <th scope="col" className="pb-3 font-medium">
                    Font
                  </th>
                  <th scope="col" className="pb-3 font-medium">
                    Size / Line Height
                  </th>
                  <th scope="col" className="pb-3 font-medium">
                    Weight
                  </th>
                  <th scope="col" className="pb-3 font-medium">
                    Use
                  </th>
                </tr>
              </thead>
              <tbody>
                {typeScale.map(([style, font, size, weight, use]) => (
                  <tr key={style} className="align-baseline">
                    <th
                      scope="row"
                      className="whitespace-nowrap py-[3px] text-[12.5px] font-semibold leading-[1.7] text-neutral-900"
                    >
                      {style}
                    </th>
                    <td className="whitespace-nowrap py-[3px] text-xs leading-[1.7] text-neutral-500">
                      {font}
                    </td>
                    <td className="whitespace-nowrap py-[3px] text-xs leading-[1.7] text-neutral-500">
                      {size}
                    </td>
                    <td className="whitespace-nowrap py-[3px] text-xs leading-[1.7] text-neutral-500">
                      {weight}
                    </td>
                    <td className="whitespace-nowrap py-[3px] text-xs leading-[1.7] text-neutral-500">
                      {use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* 04–05 — Spacing, radius and shadows */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard className="p-6 xl:p-8">
          <SectionHeading number="04" title="Spacing System" />
          <p className="mt-5 text-xs font-semibold leading-4 text-neutral-700">
            Base unit: 4px
          </p>

          <div className="mt-7 overflow-x-auto pb-1">
            <div className="grid min-w-[470px] grid-cols-9 items-end gap-1">
              {spacingSteps.map((step) => (
                <div
                  key={step.px}
                  className="flex flex-col items-center justify-end gap-3"
                >
                  <div
                    className="rounded-[2px] bg-primary-200"
                    style={{ width: step.px, height: step.px }}
                  />
                  <div className="text-center">
                    <p className="text-[11px] font-semibold leading-4 text-neutral-900">
                      {step.px}
                    </p>
                    <p className="text-[9px] leading-3 text-neutral-500">
                      ({step.rem})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard className="p-6 xl:p-8">
          <SectionHeading number="05" title="Radius & Shadows" />

          <Caption className="mt-5">Radius</Caption>
          <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {radii.map((radius) => (
              <div key={radius.value} className="flex flex-col items-center">
                <div
                  className="h-10 w-10 border border-neutral-200 bg-surface"
                  style={{ borderRadius: radius.radius }}
                />
                <p className="mt-2 text-[11px] font-semibold leading-4 text-neutral-900">
                  {radius.value}
                </p>
                <p className="text-[9px] leading-3 text-neutral-500">
                  {radius.token}
                </p>
              </div>
            ))}
          </div>

          <Caption className="mt-6">Shadows</Caption>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {shadows.map((shadow) => (
              <div
                key={shadow.name}
                className={cn(
                  "rounded-md border border-white/60 bg-white p-3",
                  shadow.className,
                )}
              >
                <p className="text-xs font-semibold leading-4 text-neutral-900">
                  {shadow.name}
                </p>
                <p className="mt-2 whitespace-pre-line font-mono text-[8.5px] leading-[1.55] text-neutral-500">
                  {shadow.value}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* 06–08 — Icons, buttons and inputs */}
      <div className="grid min-w-0 gap-4 lg:grid-cols-2 xl:grid-cols-[0.95fr_2.35fr_1fr]">
        <SectionCard className="flex min-w-0 flex-col p-5 xl:p-6">
          <SectionHeading number="06" title="Icons" />

          <div className="mt-5">
            <Caption>Outline Style</Caption>
            <IconGrid icons={outlineIcons} label="Outline icon set" />
          </div>

          <div className="mt-5">
            <Caption>Filled Style</Caption>
            <IconGrid icons={filledIcons} label="Filled icon set" />
          </div>

          <div className="mt-auto pt-7">
            <Caption>Icon Specs</Caption>
            <SpecList
              className="mt-3"
              items={[
                "24×24px grid",
                "2px stroke width (outline)",
                "Rounded line caps",
                "Consistent optical balance",
              ]}
            />
          </div>
        </SectionCard>

        <SectionCard className="min-w-0 p-5 lg:order-3 lg:col-span-2 xl:order-2 xl:col-span-1 xl:p-6">
          <SectionHeading number="07" title="Buttons" />

          <div className="mt-5 overflow-x-auto pb-1">
            <div className="grid min-w-[610px] grid-cols-[56px_repeat(4,minmax(0,1fr))] items-center gap-x-2 gap-y-3">
              <span aria-hidden="true" />
              {["Primary", "Secondary", "Tertiary", "Text"].map((label) => (
                <span
                  key={label}
                  className="px-1 text-[11px] font-medium leading-4 text-neutral-500"
                >
                  {label}
                </span>
              ))}

              <span className="text-[11px] font-medium leading-4 text-neutral-500">
                Default
              </span>
              <Button variant="primary">Get Started</Button>
              <Button variant="secondary">Explore Courses</Button>
              <Button
                variant="tertiary"
                icon={<ExternalLink className="h-3.5 w-3.5" />}
              >
                View Lesson
              </Button>
              <Button
                variant="text"
                icon={<PlayBadge className="h-4 w-4" />}
              >
                Watch Video
              </Button>

              <span className="text-[11px] font-medium leading-4 text-neutral-500">
                Hover
              </span>
              <Button variant="primary" state="hover">
                Get Started
              </Button>
              <Button variant="secondary" state="hover">
                Explore Courses
              </Button>
              <Button
                variant="tertiary"
                state="hover"
                icon={<ExternalLink className="h-3.5 w-3.5" />}
              >
                View Lesson
              </Button>
              <Button
                variant="text"
                state="hover"
                icon={<PlayBadge className="h-4 w-4" />}
              >
                Watch Video
              </Button>

              <span className="text-[11px] font-medium leading-4 text-neutral-500">
                Disabled
              </span>
              <Button variant="primary" state="disabled">
                Get Started
              </Button>
              <Button variant="secondary" state="disabled">
                Explore Courses
              </Button>
              <Button
                variant="tertiary"
                state="disabled"
                icon={<ExternalLink className="h-3.5 w-3.5" />}
              >
                View Lesson
              </Button>
              <Button
                variant="text"
                state="disabled"
                icon={<PlayBadge className="h-4 w-4" />}
              >
                Watch Video
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Caption>Button Specs</Caption>
            <SpecList
              className="mt-3"
              items={[
                "Height: 44px (default)",
                "Padding: 0 16px (lg), 0 12px (md)",
                "Radius: 12px",
                "Font: Inter Medium (14–16px)",
              ]}
            />
          </div>
        </SectionCard>

        <SectionCard className="min-w-0 p-5 lg:order-2 xl:order-3 xl:p-6">
          <SectionHeading number="08" title="Inputs" />

          <div className="mt-5">
            <Caption>Search / Text Input</Caption>
            <SearchField className="mt-3" />
          </div>

          <div className="mt-5">
            <Caption>Select</Caption>
            <SelectField
              className="mt-2"
              options={["Most Relevant", "Newest", "Shortest"]}
            />
          </div>

          <div className="mt-6">
            <Caption>Field Specs</Caption>
            <SpecList
              className="mt-3"
              items={[
                "Height: 44px",
                "Radius: 12px",
                "Border: 1px solid #E2E8F0",
                "Padding: 0 16px",
                "Focus: Border color #FB923C",
              ]}
            />
          </div>
        </SectionCard>
      </div>

      {/* 09–11 — Badges, status and progress */}
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-[1fr_1.4fr_1fr]">
        <SectionCard className="p-6">
          <SectionHeading number="09" title="Badges / Tags" />
          <div className="mt-6 flex flex-wrap gap-x-9 gap-y-5">
            <div>
              <Caption>Video</Caption>
              <Badge tone="video" className="mt-3">
                Video
              </Badge>
            </div>
            <div>
              <Caption>Lesson</Caption>
              <Badge tone="lesson" className="mt-3">
                Lesson
              </Badge>
            </div>
            <div>
              <Caption>Popular</Caption>
              <Badge tone="popular" className="mt-3">
                Popular
              </Badge>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="p-6">
          <SectionHeading number="10" title="Status / Indicators" />
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <StatusIndicator status="in-progress" />
            <StatusIndicator status="completed" />
            <StatusIndicator status="now-playing" />
            <StatusIndicator status="locked" />
          </div>
        </SectionCard>

        <SectionCard className="p-6">
          <SectionHeading number="11" title="Progress Bar" />
          <div className="mt-8">
            <ProgressBar value={35} />
          </div>
        </SectionCard>
      </div>

      {/* 12 — Cards */}
      <SectionCard className="p-6 xl:p-8">
        <SectionHeading number="12" title="Cards" />

        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col">
            <p className="mb-3 text-[11px] font-medium leading-4 text-neutral-500">
              Course Card
            </p>
            <CourseCard
              className="flex-1"
              title="Next.js for Production"
              description="Build scalable, high-performance web applications with Next.js."
              level="Intermediate"
              duration="18h 24m"
              modules="12 modules"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-3 text-[11px] font-medium leading-4 text-neutral-500">
              Lesson Card (Video)
            </p>
            <LessonVideoCard
              className="flex-1"
              title="Data Fetching in Server Components"
              description="Learn how to fetch data on the server using async/await and Next.js best practices."
              lessonLabel="Lesson 5.1"
              duration="12:45"
              timestamp="12:45"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-3 text-[11px] font-medium leading-4 text-neutral-500">
              Lesson Card (Lesson)
            </p>
            <LessonTopicCard
              className="flex-1"
              title="Data Fetching & Caching"
              description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
              moduleLabel="Module 5"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-3 text-[11px] font-medium leading-4 text-neutral-500">
              Resource Card
            </p>
            <ResourceCard
              className="flex-1"
              title="Caching and Revalidation Guide"
              description="Deep dive into Next.js caching strategies."
              format="PDF"
              size="1.2 MB"
            />
          </div>
        </div>
      </SectionCard>

      {/* 13–14 — Navigation and principles */}
      <SectionCard className="overflow-hidden">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.25fr_1.5fr_0.9fr] lg:items-start xl:p-8">
          <div>
            <SectionHeading number="13" title="Navigation" />
            <SiteNav className="mt-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium leading-4 text-neutral-500">
              Breadcrumbs
            </p>
            <Breadcrumbs
              className="mt-5"
              items={[
                { label: "All Courses", href: "#all-courses" },
                {
                  label: "Next.js for Production",
                  href: "#nextjs-for-production",
                },
                {
                  label: "Data Fetching & Caching",
                  href: "#data-fetching-and-caching",
                },
              ]}
            />
          </div>

          <div>
            <p className="text-[11px] font-medium leading-4 text-neutral-500">
              Pagination
            </p>
            <Pagination className="mt-5" currentPage={1} totalPages={8} />
          </div>
        </div>

        <div className="border-t border-line p-6 xl:p-8">
          <div className="grid gap-7 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start">
            <SectionHeading number="14" title="Principles" />

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Clarity First",
                  description:
                    "Every element should communicate clearly.",
                  icon: Eye,
                },
                {
                  title: "Consistency",
                  description:
                    "Use components and patterns consistently across the platform.",
                  icon: LayoutGrid,
                },
                {
                  title: "Focus & Calm",
                  description:
                    "Remove noise and help learners focus on what matters.",
                  icon: Target,
                },
                {
                  title: "Accessible",
                  description:
                    "Design with accessibility and inclusivity in mind.",
                  icon: Accessibility,
                },
              ].map((principle) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.title}
                    className="flex items-start gap-3"
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-0.5 h-7 w-7 shrink-0 text-neutral-500"
                    />
                    <div>
                      <p className="text-xs font-semibold leading-4 text-neutral-900">
                        {principle.title}
                      </p>
                      <p className="mt-1 text-[11px] leading-[1.5] text-neutral-500">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
