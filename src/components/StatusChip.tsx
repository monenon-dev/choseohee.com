import { projectStatusLabel, type Project } from "@/data/projects";

// accent가 없는 프로젝트는 상태별 회색 점으로 구분합니다.
const statusDotClass: Record<Project["status"], string> = {
  completed: "bg-text",
  "in-progress": "bg-text/70",
  prototype: "bg-muted",
};

/** 중립색 상태 칩. 프로젝트 accent는 왼쪽 점에만 씁니다. */
export default function StatusChip({
  project,
}: {
  project: Pick<Project, "status" | "accent">;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-soft">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${project.accent ? "" : statusDotClass[project.status]}`}
        style={project.accent ? { backgroundColor: project.accent } : undefined}
      />
      {projectStatusLabel[project.status]}
    </span>
  );
}
