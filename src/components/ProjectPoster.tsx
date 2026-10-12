import Image from "next/image";
import { PLACEHOLDER_POSTER, type Project } from "@/data/projects";

type ProjectPosterProps = {
  project: Project;
  /** next/image sizes 값 (표시 크기에 맞춰 넘겨 주세요) */
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** 9:16 프로젝트 썸네일. poster가 없으면 기본 포스터를 씁니다. */
export default function ProjectPoster({
  project,
  sizes,
  preload = false,
  className = "",
}: ProjectPosterProps) {
  return (
    <div
      className={`relative aspect-9/16 overflow-hidden rounded-2xl bg-surface ring-1 ring-border ${className}`}
    >
      <Image
        src={project.poster ?? PLACEHOLDER_POSTER}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
      />
    </div>
  );
}
