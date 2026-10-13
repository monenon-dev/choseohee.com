import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StatusChip from "@/components/StatusChip";
import { profile } from "@/data/profile";
import {
  PLACEHOLDER_POSTER,
  getProject,
  isTodo,
  projects,
  teamLabel,
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

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  // "TODO:"로 남겨 둔 값은 화면에 표시하지 않습니다.
  const role = isTodo(project.role) ? null : project.role;
  const stack = project.stack.filter((tech) => !isTodo(tech));
  const poster = project.poster ?? PLACEHOLDER_POSTER;

  return (
    <main className="pt-(--header-h)">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:py-16">
        <Link
          href="/#projects"
          className="text-sm text-muted transition-colors hover:text-text"
        >
          ← Projects로 돌아가기
        </Link>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* 9:16 미디어: 영상이 있으면 영상, 없으면 포스터 */}
          <div className="relative mx-auto aspect-9/16 w-full max-w-90 shrink-0 overflow-hidden rounded-2xl bg-surface ring-1 ring-border lg:mx-0">
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
                {/* 상태 칩과 같은 크기·색으로 맞춥니다. */}
                <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-soft">
                  {teamLabel(project.teamSize)}
                </span>
                <StatusChip project={project} />
              </div>
            </div>

            <p className="leading-relaxed text-soft">
              {project.summary}
            </p>

            {role && (
              <p className="text-sm text-muted">
                <span className="font-semibold text-text">역할</span>{" "}
                {role}
              </p>
            )}

            {stack.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-text/10 px-2 py-0.5 text-xs text-text/90"
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
                    className="text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
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
