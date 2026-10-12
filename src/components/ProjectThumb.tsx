import Image from "next/image";
import Link from "next/link";
import {
  PLACEHOLDER_POSTER,
  projectStatusLabel,
  teamLabel,
  type Project,
} from "@/data/projects";

export default function ProjectThumb({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-9/16 overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
        <Image
          src={project.poster ?? PLACEHOLDER_POSTER}
          alt=""
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 60vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 leading-snug font-bold">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">
        {teamLabel(project.teamSize)} · {projectStatusLabel[project.status]}
      </p>
    </Link>
  );
}
