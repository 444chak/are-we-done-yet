import type { Metadata } from "next";
import { Chewy, Nunito } from "next/font/google";
import "./globals.css";

export const runtime = "edge";

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
});

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Are We Done Yet?",
  description: "Track your course progress with style",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${chewy.variable} ${nunito.variable} font-nunito`}>
        {children}
      </body>
    </html>
  );
}
