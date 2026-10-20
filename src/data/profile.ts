export type Profile = {
  /** 헤더 로고와 브라우저 탭 제목에 쓰는 사이트 이름 */
  siteName: string;
  name: string;
  position: string;
  heroIntro: [string, string];
  about: string[];
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
  about: [
    "안녕하세요, 프론트엔드 개발자 조서희입니다.",
    "웹과 앱 화면을 만들고, 필요하면 API와 배포까지 직접 연결해서 실제로 돌아가는 AI 서비스를 완성해 왔습니다.",
    "기능을 붙이는 것보다, 사용자가 AI의 결과를 믿고 쓸 수 있도록 흐름과 상태를 설계하는 일에 더 공을 들입니다.",
  ],
  links: {
    github: "https://github.com/monenon-dev",
    email: "whtjgml2002@gmail.com",
  },
};
