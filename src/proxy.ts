import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

// Cache Components에서는 generateStaticParams에 없는 id가 첫 요청 때 200으로 스트리밍된 뒤
// notFound()가 실행되어 상태 코드를 바꿀 수 없습니다(soft 404).
// 렌더링 전에 id를 확인해서 없는 프로젝트는 실제 404 상태로 응답합니다.
const projectIds = new Set(projects.map((project) => project.id));

export function proxy(request: NextRequest) {
  const id = decodeURIComponent(
    request.nextUrl.pathname.slice("/projects/".length),
  );
  if (projectIds.has(id)) return NextResponse.next();

  // 존재하지 않는 경로로 rewrite하면 기본 not-found 페이지가 404 상태로 렌더링됩니다.
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: "/projects/:id",
};
