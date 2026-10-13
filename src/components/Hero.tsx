import NowBuilding from "@/components/NowBuilding";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Hero() {
  // 요약 숫자는 프로젝트 데이터에서 계산합니다.
  const teamCount = projects.filter((project) => project.teamSize > 1).length;
  const soloCount = projects.length - teamCount;

  return (
    <section id="home" className="pt-(--header-h)">
      {/* 헤더 높이만큼은 section 패딩이 차지하므로, 안쪽 높이를 그만큼 빼서 첫 화면을 정확히 채웁니다. */}
      <div className="mx-auto flex min-h-[calc(100svh-var(--header-h))] w-full max-w-6xl flex-col px-6">
        <div className="flex flex-1 items-center py-4 lg:py-12">
          <div className="w-full lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <p className="text-sm font-medium text-accent">
                {profile.position}
              </p>
              <h1 className="mt-3 text-[clamp(4.5rem,11vw,9rem)] leading-none font-bold tracking-tight">
                {profile.name}
              </h1>
              <div className="mt-4 max-w-2xl space-y-1 lg:mt-6 text-lg leading-relaxed text-muted">
                {profile.heroIntro.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-8">
                <a
                  href="#projects"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Projects 보기
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-text/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-text/50"
                >
                  GitHub ↗
                </a>
              </div>
              <p className="mt-4 text-sm text-muted lg:mt-6">
                Projects {projects.length} · 팀 {teamCount} · 개인 {soloCount}
              </p>
            </div>

            <div className="mt-8 lg:mt-0">
              <NowBuilding />
            </div>
          </div>
        </div>

        <a
          href="#projects"
          aria-label="다음 섹션으로 이동"
          className="mx-auto mb-6 flex flex-col items-center gap-1 text-xs text-muted transition-colors hover:text-text"
        >
          <span>Scroll</span>
          <span aria-hidden="true" className="motion-safe:animate-nudge">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
