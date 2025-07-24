import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Milan CI",
  description: "Portfolio of Milan CI – Web Developer showcasing modern projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scroll-smooth">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="fixed w-2 h-2 bg-red-600/30 rounded-full animate-twinkle floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
        <div className="fixed -top-30 -left-30   md:top-30 md:left-20 w-72 h-72 bg-orange-500/80 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed inset-0 -z-10 animated-gradient" style={{ opacity: 1 }} />
        {children}
      </body>
    </html>
  );
}
