import Link from "next/link";
import ProjectPoster from "@/components/ProjectPoster";
import TagList from "@/components/TagList";
import { projectStatusLabel, teamLabel, type Project } from "@/data/projects";

/** 위쪽 가로 썸네일 + 아래 설명으로 된 프로젝트 카드 */
export default function ProjectThumb({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-colors hover:border-text/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text"
    >
      <ProjectPoster
        project={project}
        sizes="(min-width: 1152px) 552px, (min-width: 768px) 50vw, 100vw"
        className="border-b border-border"
      />
      <div className="flex-1 p-5 sm:p-6">
        <h3 className="line-clamp-2 text-lg leading-snug font-bold">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {teamLabel(project.teamSize)} ·{" "}
          {project.listLabel ?? projectStatusLabel[project.status]}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-soft">
          {project.summary}
        </p>
        <TagList tags={project.tags ?? []} className="mt-4" />
      </div>
    </Link>
  );
}
