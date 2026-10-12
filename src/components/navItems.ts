// 헤더는 모든 페이지에 표시되므로, 상세 페이지에서도 홈 섹션으로 이동하도록 "/#..." 형식을 씁니다.
export const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;
