// 'use client' 지시어는 없지만, activeIndex 상태를 받기 위해 클라이언트 컴포넌트인
// ShortsFeed에서만 import되므로 실제로는 클라이언트 번들에 포함됩니다.

type ShortsIndicatorProps = {
  count: number;
  activeIndex: number;
};

export default function ShortsIndicator({
  count,
  activeIndex,
}: ShortsIndicatorProps) {
  return (
    <ol
      aria-label="프로젝트 위치"
      className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 flex-col items-center gap-2 lg:right-4"
    >
      {Array.from({ length: count }, (_, i) => {
        const active = i === activeIndex;
        return (
          <li
            key={i}
            aria-current={active ? "true" : undefined}
            className={`w-1 rounded-full transition-all duration-300 ${
              active ? "h-10 bg-accent" : "h-5 bg-foreground/30"
            }`}
          >
            <span className="sr-only">
              {i + 1} / {count}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
