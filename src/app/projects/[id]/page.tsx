import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile } from "@/data/profile";
import {
  PLACEHOLDER_POSTER,
  getProject,
  isTodo,
  projectStatusLabel,
  projects,
  teamLabel,
  type ProjectStatus,
} from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.siteName}`,
    description: project.summary,
  };
}

const statusDotClass: Record<ProjectStatus, string> = {
  completed: "bg-accent",
  "in-progress": "bg-accent/50",
  prototype: "bg-muted",
};

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const isTeam = project.teamSize > 1;
  // "TODO:"로 남겨 둔 값은 화면에 표시하지 않습니다.
  const role = isTodo(project.role) ? null : project.role;
  const stack = project.stack.filter((tech) => !isTodo(tech));
  const poster = project.poster ?? PLACEHOLDER_POSTER;

  return (
    <main className="px-6 pt-(--header-h)">
      <div className="mx-auto w-full max-w-5xl py-10 lg:py-16">
        <Link
          href="/#projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Projects로 돌아가기
        </Link>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* 9:16 미디어: 영상이 있으면 영상, 없으면 포스터 */}
          <div className="relative mx-auto aspect-9/16 w-full max-w-90 shrink-0 overflow-hidden rounded-2xl bg-surface lg:mx-0">
            {project.videoSrc ? (
              <video
                src={project.videoSrc}
                poster={poster}
                controls
                muted
                playsInline
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <Image
                src={poster}
                alt={`${project.title} 미리보기`}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                preload
                className="object-cover"
              />
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    isTeam
                      ? "bg-accent text-accent-foreground"
                      : "border border-foreground/30 text-foreground/80"
                  }`}
                >
                  {teamLabel(project.teamSize)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground/90">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${statusDotClass[project.status]}`}
                  />
                  {projectStatusLabel[project.status]}
                </span>
              </div>
            </div>

            <p className="leading-relaxed text-foreground/85">
              {project.summary}
            </p>

            {role && (
              <p className="text-sm text-muted">
                <span className="font-semibold text-foreground">역할</span>{" "}
                {role}
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
        </div>
      </div>
    </main>
  );
}
