import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Hero() {
  // 요약 숫자는 프로젝트 데이터에서 계산합니다.
  const teamCount = projects.filter((project) => project.teamSize > 1).length;
  const soloCount = projects.length - teamCount;

  return (
    <section id="home" className="pt-(--header-h)">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-4 lg:pt-24 lg:pb-8">
        <p className="text-sm font-medium text-accent">{profile.position}</p>
        <h1 className="mt-3 text-[clamp(3.5rem,9vw,7.5rem)] leading-none font-bold tracking-tight">
          {profile.name}
        </h1>
        <div className="mt-6 max-w-2xl space-y-1 text-lg leading-relaxed text-muted">
          {profile.heroIntro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
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
        <p className="mt-6 text-sm text-muted">
          Projects {projects.length} · 팀 {teamCount} · 개인 {soloCount}
        </p>
      </div>
    </section>
  );
}
