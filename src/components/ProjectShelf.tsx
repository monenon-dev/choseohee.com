import ProjectThumb from "@/components/ProjectThumb";
import { projects } from "@/data/projects";

export default function ProjectShelf() {
  return (
    <section id="projects" className="pt-10 pb-24 lg:pt-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-3xl font-bold">Projects</h2>

        {/* md 이상: 2열. 순서는 data/projects.ts의 배열 순서를 따릅니다. */}
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectThumb project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
