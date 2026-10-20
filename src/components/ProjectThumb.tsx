import Link from "next/link";
import ProjectPoster from "@/components/ProjectPoster";
import TagList from "@/components/TagList";
import { projectStatusLabel, teamLabel, type Project } from "@/data/projects";

/** 왼쪽 포스터 + 오른쪽 설명으로 된 가로형 프로젝트 카드 */
export default function ProjectThumb({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-colors hover:border-text/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text sm:gap-5 sm:p-5"
    >
      <ProjectPoster
        project={project}
        sizes="(min-width: 640px) 144px, 112px"
        className="w-28 shrink-0 sm:w-36"
      />
      <div className="min-w-0 flex-1 py-1">
        <h3 className="line-clamp-2 text-lg leading-snug font-bold">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {teamLabel(project.teamSize)} ·{" "}
          {project.listLabel ?? projectStatusLabel[project.status]}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-soft">
          {project.summary}
        </p>
        <TagList tags={project.tags ?? []} className="mt-4" />
      </div>
    </Link>
  );
}
