import type { CSSProperties } from "react";
import Link from "next/link";
import { projects, projectStatusLabel } from "@/data/projects";

export default function NowBuilding() {
  // 개발 중인 첫 프로젝트만 보여 주고, 없으면 카드를 그리지 않습니다.
  const project = projects.find((item) => item.status === "in-progress");
  if (!project) return null;

  // 프로젝트 accent는 칩 테두리와 상단 2px 라인에만 씁니다.
  // 칩 글자는 어두운 배경에서 4.5:1 이상이 되도록 같은 색상·채도에서 명도만 65%까지 올립니다.
  const accentStyle = {
    "--project-accent": project.accent ?? "var(--accent)",
    "--project-accent-text": project.accent
      ? `hsl(from ${project.accent} h s max(l, 65))`
      : "var(--accent)",
  } as CSSProperties;

  return (
    <article
      style={accentStyle}
      className="rounded-2xl border border-t-2 border-border border-t-(--project-accent) bg-surface p-5 shadow-sm transition-colors hover:border-x-text/30 hover:border-b-text/30 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-muted">지금 만드는 것</p>
        <span className="rounded-full border border-(--project-accent) px-3 py-1 text-xs font-medium text-(--project-accent-text)">
          {projectStatusLabel[project.status]}
        </span>
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {project.title}
      </h2>
      <p className="mt-3 line-clamp-3 leading-relaxed text-soft">
        {project.summary}
      </p>
      {/* note가 빈 문자열이어도 아무것도 남기지 않도록 삼항 연산자를 씁니다. */}
      {project.note ? (
        <p className="mt-3 text-sm text-text sm:mt-4">{project.note}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-text px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-text/10"
          >
            Demo ↗
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          className="rounded-full border border-text/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-text/50"
        >
          자세히 보기
        </Link>
      </div>
    </article>
  );
}
