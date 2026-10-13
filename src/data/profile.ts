export type StackGroup = {
  name: string;
  /** 그룹 아래에 표시할 설명 한 줄. 생략하면 표시되지 않습니다. */
  description?: string;
  /** 비어 있으면 화면에 그룹이 표시되지 않습니다. */
  items: string[];
};

export type Profile = {
  /** 헤더 로고와 브라우저 탭 제목에 쓰는 사이트 이름 */
  siteName: string;
  name: string;
  position: string;
  heroIntro: [string, string];
  about: string[];
  stackGroups: StackGroup[];
  links: {
    github: string;
    /** 비어 있거나 "TODO_EMAIL"이면 Contact에 이메일 링크가 표시되지 않습니다. */
    email: string;
  };
};

export const profile: Profile = {
  siteName: "choseohee",
  name: "조서희",
  position: "프론트엔드 개발자",
  // Hero 소개 [메인, 서브]
  heroIntro: [
    "화면부터 배포까지, 혼자 끝까지 만들어 본 프론트엔드 개발자입니다.",
    "사용자가 헤매지 않는 화면을 만드는 데 관심이 많습니다.",
  ],
  about: ["안녕하세요, 프론트엔드 개발자 조서희입니다."],
  stackGroups: [
    {
      name: "Web",
      items: ["React", "Next.js", "TypeScript", "Vite", "Zustand", "Tailwind CSS"],
    },
    {
      name: "App",
      description: "PUMSAE Android 앱을 Google Play에서 테스트 중입니다.",
      items: ["Flutter (Dart)"],
    },
    {
      name: "배포와 연결",
      description: "API, DB, 파일 스토리지를 연결해 서비스를 직접 운영해 봤습니다.",
      items: ["Vercel", "Railway", "GCP", "Neon", "Cloudflare R2"],
    },
  ],
  links: {
    github: "https://github.com/monenon-dev",
    email: "whtjgml2002@gmail.com",
  },
};
