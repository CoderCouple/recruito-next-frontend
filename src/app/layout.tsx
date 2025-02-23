import type { Metadata, Viewport } from "next";

import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://recruito.ai"),
  title: "Recruito AI - AI-Powered Recruiting Platform",
  description:
    "Recruito automates your recruiting process with an all-in-one, AI-first platform powered by advanced algorithms. Get better hiring results with AI.",
  keywords: ["AI recruiting", "automated hiring", "recruitment platform"],
  authors: [{ name: "Recruito" }],
  creator: "Recruito",
  publisher: "Recruito",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Recruito AI - AI-Powered Recruiting Platform",
    description:
      "Recruito automates your recruiting process with an all-in-one, AI-first platform powered by advanced algorithms. Get better hiring results with AI.",
    url: "https://recruito.ai",
    siteName: "Recruito",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recruito Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruito AI - AI-Powered Recruiting Platform",
    description:
      "Recruito automates your recruiting process with an all-in-one, AI-first platform powered by advanced algorithms. Get better hiring results with AI.",
    images: ["/twitter-image.png"],
    creator: "@recruito",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
