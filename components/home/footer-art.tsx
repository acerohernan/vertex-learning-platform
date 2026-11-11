import { Star } from "lucide-react";

const leftBars = [38, 58, 90, 48, 62, 40];
const rightBars = [32, 50, 70, 42, 60, 92, 64];

export function FooterArt() {
  return (
    <footer className="mt-8 sm:mt-9">
      <div className="flex items-center gap-3 px-5 sm:gap-4 sm:px-8 lg:px-10">
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <p className="flex items-center gap-2.5 text-center text-[14px] leading-6 text-neutral-700 sm:gap-3 sm:text-[17px]">
          <Star
            aria-hidden="true"
            strokeWidth={1.6}
            className="h-5 w-5 shrink-0 text-accent-500"
          />
          <span>New courses and lessons added every week.</span>
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <div
        aria-hidden="true"
        className="mt-4 flex h-[140px] items-end justify-between overflow-hidden px-3 sm:px-4 sm:h-[180px] lg:-mx-5 lg:h-[205px] lg:px-0"
      >
        <div className="flex h-full w-[43%] items-end gap-2 sm:gap-3">
          {leftBars.map((height, index) => (
            <span
              key={`left-${index}`}
              style={{ height: `${height}%` }}
              className="footer-bar flex-1"
            />
          ))}
        </div>
        <div className="flex h-full w-[47%] items-end gap-2 sm:gap-3">
          {rightBars.map((height, index) => (
            <span
              key={`right-${index}`}
              style={{ height: `${height}%` }}
              className="footer-bar flex-1"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
