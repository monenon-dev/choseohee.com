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
  /** 상세 페이지에 표시할 전체 기술 스택. "TODO:"로 시작하는 항목은 화면에 표시되지 않습니다. */
  stack: string[];
  /** 프로젝트 목록 카드에 표시할 태그. 생략하면 표시되지 않습니다. */
  tags?: string[];
  /** 목록 카드 메타 줄에서 상태 대신 표시할 문구. 생략하면 상태가 표시됩니다. */
  listLabel?: string;
  /** 상세 페이지 역할 줄 아래에 표시할 배포 정보. 생략하면 표시되지 않습니다. */
  deploy?: string;
  /** 아직 영상이 없으면 생략합니다. */
  videoSrc?: string;
  /** 생략하면 PLACEHOLDER_POSTER가 표시됩니다. */
  poster?: string;
  /** 가로 썸네일에서 보여 줄 포스터 위치(CSS object-position). 생략하면 맨 위(히어로)를 보여 줍니다. */
  posterFocus?: string;
  links: {
    github?: string;
    demo?: string;
  };
  /** 프로젝트 대표색(서비스의 주 버튼/브랜드 색). 생략하면 사이트 --accent를 씁니다. */
  accent?: string;
  /** Hero의 "지금 만드는 것" 카드에 표시할 짧은 진행 상황. 생략하면 표시되지 않습니다. */
  note?: string;
  /** Hero의 "지금 만드는 것" 카드 하단에 표시할 태그. 생략하면 표시되지 않습니다. */
  noteTags?: string[];
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
    id: "trip-diner",
    title: "Trip-Diner",
    summary: "취향을 고르면 AI가 국내 여행 코스를 짜 주는 '여행 메뉴판' 서비스",
    // 팀원별로 페이지를 나눠 프론트엔드와 백엔드를 함께 맡은 프로젝트
    role: "회원가입 · 로그인 · 비밀번호 재설정, 게시판 담당 (React 화면 + Express API) · 배포 이전 (MySQL → Supabase, Vercel · Render)",
    teamSize: 4,
    listLabel: "인증 · 게시판 담당",
    status: "completed",
    stack: [
      "JavaScript",
      "React",
      "React Router",
      "Axios",
      "Framer Motion",
      "Naver Maps API",
      "Express",
      "Prisma",
      "JWT",
      "Nodemailer",
      "PostgreSQL (Supabase)",
      "Supabase Storage",
      "OpenAI API",
      "한국관광공사 Tour API",
      "NAVER 검색 API",
    ],
    // 목록 카드에는 담당 페이지(인증 · 게시판)에서 쓴 기술 위주로 표시합니다.
    tags: ["JavaScript", "React", "Express", "Prisma", "JWT", "Supabase"],
    deploy: "Vercel · Render · Supabase · Cloudflare DNS",
    poster: "/posters/trip-diner.webp",
    // 히어로 문구와 버튼이 포스터 중간쯤에 있어서 그 부분을 보여 줍니다.
    posterFocus: "50% 55%",
    links: {
      github: "https://github.com/monenon-dev/Trip-diner-main",
      demo: "https://trip.choseohee.com",
    },
    // trip-diner Hero.css의 .hero-cta 그라데이션 끝색
    accent: "#CD9146",
  },
  {
    id: "callguard",
    title: "CallGuard",
    summary: "다산콜센터 상담원을 위한 실시간 AI 보조 시스템",
    role: "프론트엔드 전담 (서버 · AI · 인프라는 팀원 담당)",
    teamSize: 4,
    listLabel: "프론트엔드 전담",
    status: "completed",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Zustand",
      "Tailwind CSS",
      "Flutter",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Elasticsearch",
      "Hugging Face Transformers",
      "Google Cloud Speech-to-Text",
      "Kubernetes",
    ],
    // 목록 카드에는 stack 중 프론트엔드 기술 5개만 표시합니다.
    tags: ["React", "TypeScript", "Zustand", "Vite", "Flutter"],
    poster: "/posters/callguard.webp",
    links: {
      github: "https://github.com/monenon-dev/call.solidbob.cloud",
      demo: "https://solidbob.cloud",
    },
  },
  {
    id: "pumsae",
    title: "PUMSAE",
    summary: "지역 태권도장·체육관 맞춤형 홍보 및 수강생 관리 플랫폼",
    role: "1인 개발 · 웹(Next.js) · 앱(Flutter) · 백엔드(FastAPI)",
    teamSize: 1,
    status: "in-progress",
    stack: [
      "Flutter",
      "Riverpod",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Firebase Cloud Messaging",
    ],
    tags: ["Next.js", "Flutter", "Python", "FastAPI", "Neon", "Cloudflare R2"],
    deploy:
      "Vercel · Railway · Neon · Cloudflare R2 / Android 앱은 Google Play 테스트 중",
    poster: "/posters/pumsae.webp",
    links: {
      github: "https://github.com/monenon-dev/pumsae",
      demo: "https://pumsae.choseohee.com",
    },
    // pumsae 레포 tailwind.config.ts의 pumsae.accent (주 버튼 bg-pumsae-accent)
    accent: "#B4222E",
    note: "Google Play 테스트 중",
    noteTags: ["웹", "Flutter 앱", "Neon", "Cloudflare R2", "Vercel", "Railway"],
  },
  {
    id: "kidslog",
    title: "KidsLog",
    summary: "아동 대상 현장을 위한 사진·영상 자동 정리 및 생성 플랫폼",
    role: "1인 개발 · 기획 · 웹(Next.js) · 백엔드(FastAPI) · AI 연동(Claude API)",
    teamSize: 1,
    // 로컬 테스트 수준의 프로토타입
    status: "prototype",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ffmpeg.wasm",
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "SQLite",
      "Pillow",
      "Claude API",
    ],
    tags: ["Next.js", "TypeScript", "Python", "FastAPI", "Claude API", "ffmpeg.wasm"],
    poster: "/posters/kidslog.webp",
    links: {
      github: "https://github.com/monenon-dev/kidslog",
      demo: "https://kidslog.choseohee.com",
    },
  },
  {
    id: "moneo",
    title: "Moneo",
    summary: "AI 에이전트 오케스트레이션 플랫폼",
    role: "1인 개발 · 웹(Next.js) · 앱(Flutter) · 백엔드(FastAPI) · 인프라(Docker Compose)",
    teamSize: 1,
    status: "completed",
    stack: [
      "Flutter",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL (pgvector)",
      "Neo4j",
      "Redis",
      "Docker",
    ],
    tags: ["Next.js", "Flutter", "Python", "FastAPI", "LangGraph", "PostgreSQL"],
    deploy: "Vercel · GCP · Neon",
    poster: "/posters/moneo.webp",
    links: {
      github: "https://github.com/monenon-dev/monenon.cloud",
      demo: "https://moneo.choseohee.com",
    },
  },
];
