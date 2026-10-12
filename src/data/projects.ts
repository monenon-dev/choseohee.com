export type ProjectStatus = "completed" | "prototype" | "in-progress";

export const projectStatusLabel: Record<ProjectStatus, string> = {
  completed: "구현 완료",
  prototype: "프로토타입",
  "in-progress": "개발 중",
};

/** 포스터가 없는 프로젝트에 표시할 기본 이미지 */
export const PLACEHOLDER_POSTER = "/posters/placeholder.svg";

export type Project = {
  id: string;
  title: string;
  summary: string;
  /** "TODO:"로 시작하면 화면에 표시되지 않습니다. */
  role: string;
  /** 1이면 개인 프로젝트, 2 이상이면 팀 프로젝트 */
  teamSize: number;
  status: ProjectStatus;
  /** "TODO:"로 시작하는 항목은 화면에 표시되지 않습니다. */
  stack: string[];
  /** 아직 영상이 없으면 생략합니다. */
  videoSrc?: string;
  /** 생략하면 PLACEHOLDER_POSTER가 표시됩니다. */
  poster?: string;
  links: {
    github?: string;
    demo?: string;
  };
};

/** 데이터에 "TODO:"로 남겨 둔 값인지 확인합니다. */
export const isTodo = (value: string) => value.trimStart().startsWith("TODO:");

/** "개인" 또는 "팀 N명" */
export const teamLabel = (teamSize: number) =>
  teamSize > 1 ? `팀 ${teamSize}명` : "개인";

export const getProject = (id: string) =>
  projects.find((project) => project.id === id);

export const projects: Project[] = [
  {
    id: "callguard",
    title: "CallGuard",
    summary: "서울 120 다산콜센터 상담원을 위한 실시간 AI 보조 RAG 시스템",
    role: "프론트엔드 리드",
    teamSize: 4,
    status: "completed",
    stack: ["Flutter", "TODO: 나머지 스택"],
    links: {
      github: "https://github.com/monenon-dev/call.solidbob.cloud",
    },
  },
  {
    id: "moneo",
    title: "Moneo",
    summary: "AI 에이전트 오케스트레이션 플랫폼",
    role: "TODO: 역할",
    teamSize: 1,
    status: "completed",
    stack: ["Flutter", "TODO: 나머지 스택"],
    links: {
      github: "https://github.com/monenon-dev/monenon.cloud",
    },
  },
  {
    id: "pumsae",
    title: "PUMSAE",
    summary: "지역 태권도장/체육관 맞춤형 홍보 및 수강생 관리 플랫폼",
    role: "TODO: 역할",
    teamSize: 1,
    status: "in-progress",
    stack: ["Flutter", "TODO: 나머지 스택"],
    links: {},
  },
  {
    id: "kidslog",
    title: "KidsLog",
    summary: "아동 대상 현장을 위한 사진·영상 자동 정리 및 생성 플랫폼",
    role: "TODO: 역할",
    teamSize: 1,
    // 로컬 테스트 수준의 프로토타입
    status: "prototype",
    stack: ["TODO: 스택"],
    links: {},
  },
];
