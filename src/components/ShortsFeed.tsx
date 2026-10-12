"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ShortsIndicator from "@/components/ShortsIndicator";

type ShortsFeedProps = {
  /** 서버에서 렌더링된 ShortCard 목록. 각 카드는 data-short-index 속성을 가져야 합니다. */
  children: ReactNode;
  count: number;
};

export default function ShortsFeed({ children, count }: ShortsFeedProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.shortIndex,
            );
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        }
      },
      { root: scroller, threshold: 0.6 },
    );

    scroller
      .querySelectorAll<HTMLElement>("[data-short-index]")
      .forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-dvh bg-black text-white">
      <div
        ref={scrollerRef}
        className="h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain [scrollbar-width:none]"
      >
        {children}
      </div>
      <ShortsIndicator count={count} activeIndex={activeIndex} />
    </div>
  );
}
