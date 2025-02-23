import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Recruito AI",
  description: "Recruito: The only recuiting ai agent you will ever need.",
  openGraph: {
    images: ["https://ai-saas-template-aceternity.vercel.app/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col">{children}</main>;
}
