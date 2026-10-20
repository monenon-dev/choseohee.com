import Image from "next/image";
import { PLACEHOLDER_POSTER, type Project } from "@/data/projects";

type ProjectPosterProps = {
  project: Project;
  /** next/image sizes 값 (표시 크기에 맞춰 넘겨 주세요) */
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** 5:4 가로 프로젝트 썸네일. 세로 포스터에서 히어로 부분(posterFocus)만 잘라 보여 주며, poster가 없으면 기본 포스터를 씁니다. */
export default function ProjectPoster({
  project,
  sizes,
  preload = false,
  className = "",
}: ProjectPosterProps) {
  return (
    <div
      className={`relative aspect-5/4 overflow-hidden bg-surface ${className}`}
    >
      <Image
        src={project.poster ?? PLACEHOLDER_POSTER}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ objectPosition: project.posterFocus ?? "50% 0%" }}
      />
    </div>
  );
}
