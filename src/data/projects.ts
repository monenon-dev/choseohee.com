export type Project = {
  id: string;
  title: string;
  summary: string;
  role: string;
  /** 1이면 개인 프로젝트, 2 이상이면 팀 프로젝트 */
  teamSize: number;
  stack: string[];
  videoSrc: string;
  poster: string;
  links: {
    github?: string;
    demo?: string;
  };
};

export const projects: Project[] = [
  {
    id: "devlog",
    title: "DevLog",
    summary:
      "마크다운 기반 개인 기술 블로그. 정적 생성과 태그 검색으로 빠른 탐색을 지원합니다.",
    role: "기획 · 디자인 · 프론트엔드 · 배포 전체",
    teamSize: 1,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    videoSrc: "/videos/devlog.mp4",
    poster: "/posters/devlog.svg",
    links: {
      github: "https://github.com/example/devlog",
      demo: "https://example.com/devlog",
    },
  },
  {
    id: "mooddiary",
    title: "MoodDiary",
    summary:
      "하루 감정을 기록하고 주간 통계를 차트로 보여주는 감정 일기 모바일 웹앱입니다.",
    role: "프론트엔드 리드 · 차트 시각화 구현",
    teamSize: 4,
    stack: ["React", "TypeScript", "Zustand", "Recharts"],
    videoSrc: "/videos/mooddiary.mp4",
    poster: "/posters/mooddiary.svg",
    links: {
      github: "https://github.com/example/mooddiary",
      demo: "https://example.com/mooddiary",
    },
  },
  {
    id: "campus-market",
    title: "Campus Market",
    summary:
      "같은 학교 학생끼리 중고 물품을 거래하는 플랫폼. 실시간 채팅과 찜 기능을 제공합니다.",
    role: "채팅 UI · 상품 목록 무한 스크롤 담당",
    teamSize: 5,
    stack: ["Next.js", "TypeScript", "TanStack Query", "Socket.IO"],
    videoSrc: "/videos/campus-market.mp4",
    poster: "/posters/campus-market.svg",
    links: {
      github: "https://github.com/example/campus-market",
    },
  },
  {
    id: "studyroom",
    title: "StudyRoom",
    summary:
      "온라인 스터디원과 뽀모도로 타이머를 공유하며 함께 공부하는 실시간 스터디룸입니다.",
    role: "타이머 동기화 로직 · 반응형 레이아웃",
    teamSize: 3,
    stack: ["React", "Vite", "Firebase", "Tailwind CSS"],
    videoSrc: "/videos/studyroom.mp4",
    poster: "/posters/studyroom.svg",
    links: {
      github: "https://github.com/example/studyroom",
      demo: "https://example.com/studyroom",
    },
  },
  {
    id: "weatherfit",
    title: "WeatherFit",
    summary:
      "현재 날씨와 기온에 맞춰 오늘의 옷차림을 추천해 주는 개인 프로젝트입니다.",
    role: "기획 · 프론트엔드 · 날씨 API 연동",
    teamSize: 1,
    stack: ["Next.js", "TypeScript", "OpenWeather API"],
    videoSrc: "/videos/weatherfit.mp4",
    poster: "/posters/weatherfit.svg",
    links: {
      demo: "https://example.com/weatherfit",
    },
  },
];
