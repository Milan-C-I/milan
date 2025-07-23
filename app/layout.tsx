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
      <body>
        {children}
      </body>
    </html>
  );
}
