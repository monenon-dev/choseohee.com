import Link from "next/link";
import ProjectPoster from "@/components/ProjectPoster";
import TagList from "@/components/TagList";
import { projectStatusLabel, teamLabel, type Project } from "@/data/projects";

/** 왼쪽 작은 가로 썸네일 + 오른쪽 설명으로 된 프로젝트 카드 */
export default function ProjectThumb({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-surface p-3 shadow-sm transition-[border-color,box-shadow,translate] hover:border-accent/50 hover:shadow-[0_0_40px_-12px_var(--accent)] motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text sm:gap-5 sm:p-4"
    >
      <ProjectPoster
        project={project}
        sizes="(min-width: 640px) 176px, 112px"
        className="w-28 shrink-0 rounded-lg ring-1 ring-border sm:w-44"
      />
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-1 leading-snug font-bold">
          {project.title}
        </h3>
        <p className="mt-0.5 text-xs text-muted sm:text-sm">
          {teamLabel(project.teamSize)} ·{" "}
          {project.listLabel ?? projectStatusLabel[project.status]}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-snug text-soft">
          {project.summary}
        </p>
        <TagList tags={project.tags ?? []} className="mt-3" />
      </div>
    </Link>
  );
}
