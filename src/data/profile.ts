export type StackGroup = {
  name: string;
  /** 비어 있으면 화면에 그룹이 표시되지 않습니다. */
  items: string[];
};

export type Profile = {
  name: string;
  position: string;
  heroIntro: [string, string];
  about: string[];
  stackGroups: StackGroup[];
  links: {
    github: string;
    /** 비어 있으면 Contact에 이메일 링크가 표시되지 않습니다. */
    email: string;
  };
};

export const profile: Profile = {
  name: "조서희",
  position: "프론트엔드 개발자",
  // TODO: 직접 작성 (Hero 소개 2줄)
  heroIntro: [
    "사용자가 헤매지 않는 화면을 만드는 데 관심이 많습니다.",
    "아이디어를 직접 동작하는 서비스로 구현하는 과정을 좋아합니다.",
  ],
  // TODO: 직접 작성 (About 소개 3~4문장)
  about: [
    "안녕하세요, 프론트엔드 개발자 조서희입니다.",
    "React와 Next.js로 웹 화면을, Flutter로 앱 화면을 만들고 있습니다.",
    "처음 보는 사람도 쉽게 이해할 수 있는 구조와 흐름을 고민합니다.",
    "아래 Projects에서 제가 만든 작업들을 확인하실 수 있습니다.",
  ],
  stackGroups: [
    {
      name: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter (Dart)"],
    },
    // TODO: 직접 작성 (Tools 등 나머지 그룹. items를 채우면 화면에 표시됩니다)
    { name: "Tools", items: [] },
  ],
  links: {
    github: "https://github.com/monenon-dev",
    // TODO: 직접 작성 (이메일 주소)
    email: "",
  },
};
