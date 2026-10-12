import Image from "next/image";
import {
  PLACEHOLDER_POSTER,
  isTodo,
  projectStatusLabel,
  type Project,
  type ProjectStatus,
} from "@/data/projects";

type ShortCardProps = {
  project: Project;
  index: number;
};

export default function ShortCard({ project, index }: ShortCardProps) {
  return (
    <article
      data-short-index={index}
      aria-label={project.title}
      className="flex h-(--feed-h) snap-start snap-always items-center justify-center gap-10 py-6 pr-8 pl-4 lg:px-16"
    >
      {/* 9:16 영상 영역. 지금은 poster 이미지만 표시합니다. */}
      <div className="relative aspect-9/16 w-[min(100%,calc((var(--feed-h)_-_3rem)*9/16))] shrink-0 overflow-hidden rounded-2xl bg-surface shadow-2xl">
        <Image
          src={project.poster ?? PLACEHOLDER_POSTER}
          alt={`${project.title} 미리보기`}
          fill
          sizes="(min-width: 1024px) 480px, 100vw"
          preload={index === 0}
          className="object-cover"
        />

        {/* 모바일: 카드 하단 오버레이 */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 via-background/60 to-transparent p-4 pt-16 lg:hidden">
          <ProjectInfo project={project} compact />
        </div>
      </div>

      {/* 데스크톱(lg 이상): 오른쪽 설명 패널 */}
      <aside className="hidden w-80 shrink-0 lg:block">
        <ProjectInfo project={project} />
      </aside>
    </article>
  );
}

const statusDotClass: Record<ProjectStatus, string> = {
  completed: "bg-accent",
  "in-progress": "bg-accent/50",
  prototype: "bg-muted",
};

function ProjectInfo({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const isTeam = project.teamSize > 1;
  // "TODO:"로 남겨 둔 값은 화면에 표시하지 않습니다.
  const role = isTodo(project.role) ? null : project.role;
  const stack = project.stack.filter((tech) => !isTodo(tech));

  return (
    <div className={compact ? "space-y-2" : "space-y-5"}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className={compact ? "text-lg font-bold" : "text-3xl font-bold"}>
          {project.title}
        </h2>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            isTeam
              ? "bg-accent text-accent-foreground"
              : "border border-foreground/30 text-foreground/80"
          }`}
        >
          {isTeam ? `팀 ${project.teamSize}명` : "개인"}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground/90">
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${statusDotClass[project.status]}`}
          />
          {projectStatusLabel[project.status]}
        </span>
      </div>

      <p
        className={
          compact
            ? "line-clamp-2 text-sm text-foreground/85"
            : "leading-relaxed text-foreground/80"
        }
      >
        {project.summary}
      </p>

      {role && (
        <p className={compact ? "text-xs text-muted" : "text-sm text-muted"}>
          <span className="font-semibold text-foreground">역할</span> {role}
        </p>
      )}

      {stack.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-foreground/10 px-2 py-0.5 text-xs text-foreground/90"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(project.links.github || project.links.demo) && (
        <div className="flex gap-3 text-sm font-medium">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              GitHub ↗
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              Demo ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
