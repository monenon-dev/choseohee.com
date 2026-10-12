import Link from "next/link";
import ProjectPoster from "@/components/ProjectPoster";
import { projectStatusLabel, teamLabel, type Project } from "@/data/projects";

export default function ProjectThumb({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <ProjectPoster
        project={project}
        sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 60vw"
      />
      <h3 className="mt-3 line-clamp-2 leading-snug font-bold">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">
        {teamLabel(project.teamSize)} · {projectStatusLabel[project.status]}
      </p>
    </Link>
  );
}
