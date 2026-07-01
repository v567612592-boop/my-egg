import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "나의 마음알 만들기 🥚✨",
  description:
    "캐릭캐릭 체인지 세계관처럼, 내 마음속 '되고 싶은 나'에서 태어나는 나만의 수호알을 만들어보세요.",
  keywords: ["수호알", "캐릭캐릭체인지", "수호캐릭터", "마음알", "자미두수"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-noto-sans-kr), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
