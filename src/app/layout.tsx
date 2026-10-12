import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { profile } from "@/data/profile";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://choseohee.com"),
  title: `${profile.siteName} — ${profile.position} ${profile.name}`,
  description: "프론트엔드 개발자 조서희의 포트폴리오",
  // TODO: 실제 프로젝트 데이터로 교체한 뒤 이 robots 설정을 삭제해 검색 노출을 허용하세요.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className={`${geistMono.variable} h-full scroll-pt-(--header-h) antialiased motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
