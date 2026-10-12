import type { CSSProperties } from "react";
import ProjectThumb from "@/components/ProjectThumb";
import { projects } from "@/data/projects";

export default function ProjectShelf() {
  // lg 이상: 카드 수만큼 열(최대 5열), 카드 하나는 최대 15rem
  const shelfStyle = {
    "--shelf-cols": Math.min(projects.length, 5),
  } as CSSProperties;

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-3xl font-bold">Projects</h2>

        {/* lg 미만: 선반 안에서만 가로 스크롤. -mx-6/px-6로 화면 끝까지 넓히되 페이지 폭은 넘지 않습니다. */}
        <ul
          style={shelfStyle}
          className="-mx-6 mt-8 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-[repeat(var(--shelf-cols),minmax(0,15rem))] lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {projects.map((project) => (
            <li
              key={project.id}
              className="w-[60vw] shrink-0 snap-start sm:w-[40vw] lg:w-auto"
            >
              <ProjectThumb project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
