import Link from "next/link";
import ProjectPoster from "@/components/ProjectPoster";
import { projects } from "@/data/projects";

// 왼쪽 / 가운데 / 오른쪽 카드 배치. 가운데 카드가 맨 앞이고 양옆은 살짝 작고 기울어져 있습니다.
// 이동·회전·확대는 Tailwind v4에서 각각 translate / rotate / scale 속성이라 서로 덮어쓰지 않습니다.
const slots = [
  "left-[calc(50%-var(--stack-offset))] -rotate-6 scale-90 z-10 [--enter-delay:120ms]",
  "left-1/2 rotate-0 z-20 [--enter-delay:0ms]",
  "left-[calc(50%+var(--stack-offset))] rotate-6 scale-90 z-10 [--enter-delay:240ms]",
];

export default function HeroCardStack() {
  const cards = projects.slice(0, 3);

  return (
    <ul
      aria-label="대표 프로젝트"
      className="relative mx-auto h-[calc(var(--card-w)*16/9+3rem)] w-full max-w-[34rem] [--card-w:40vw] [--stack-offset:22vw] sm:[--card-w:13rem] sm:[--stack-offset:8rem] lg:[--card-w:13rem] lg:[--stack-offset:7.5rem] xl:[--card-w:13.5rem] xl:[--stack-offset:8.5rem]"
    >
      {cards.map((project, index) => (
        <li
          key={project.id}
          className={`absolute top-1/2 w-(--card-w) -translate-x-1/2 -translate-y-1/2 hover:z-30 focus-within:z-30 motion-safe:transition-[translate,rotate,scale] motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-[calc(50%+0.5rem)] motion-safe:hover:rotate-0 motion-safe:hover:scale-100 motion-safe:focus-within:-translate-y-[calc(50%+0.5rem)] motion-safe:focus-within:rotate-0 motion-safe:focus-within:scale-100 ${slots[index]}`}
        >
          <Link
            href={`/projects/${project.id}`}
            aria-label={project.title}
            className="block rounded-2xl shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:animate-card-in motion-safe:[animation-delay:var(--enter-delay)]"
          >
            <ProjectPoster
              project={project}
              sizes="(min-width: 1280px) 216px, (min-width: 640px) 208px, 40vw"
              preload={index === 1}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
