import Image from "next/image";
import { PLACEHOLDER_POSTER, type Project } from "@/data/projects";

type ProjectPosterProps = {
  project: Project;
  /** next/image sizes 값 (표시 크기에 맞춰 넘겨 주세요) */
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** 브라우저 창 모양 프레임 안의 9:16 프로젝트 썸네일. poster가 없으면 기본 포스터를 씁니다. */
export default function ProjectPoster({
  project,
  sizes,
  preload = false,
  className = "",
}: ProjectPosterProps) {
  // 주소창에는 데모 주소의 도메인만 표시합니다. (예: pumsae.choseohee.com)
  const host = project.links.demo && new URL(project.links.demo).host;

  return (
    <div
      className={`overflow-hidden rounded-xl bg-surface shadow-sm ring-1 ring-border transition-shadow group-hover:shadow-md ${className}`}
    >
      {/* 창 상단 바: 신호등 버튼 + 주소창 */}
      <div
        aria-hidden
        className="flex items-center gap-2 border-b border-border bg-bg px-2.5 py-1.5"
      >
        <div className="flex shrink-0 gap-1">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-3.5 min-w-0 flex-1 items-center justify-center rounded-full bg-text/6 px-2">
          {host && (
            <span className="truncate text-[0.5625rem] leading-none text-muted">
              {host}
            </span>
          )}
        </div>
      </div>
      <div className="relative aspect-9/16">
        <Image
          src={project.poster ?? PLACEHOLDER_POSTER}
          alt=""
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
