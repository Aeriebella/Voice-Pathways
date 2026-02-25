import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.voicepathways.com'),

  title: 'Voice Pathways | Vocal Feminization, MtF Voice & Transgender Voice Coaching',
  description:
    'Voice Pathways offers professional vocal feminization training, MtF voice coaching, and transgender voice support designed to help you achieve a natural, sustainable, authentic voice — with clarity, care, and efficiency.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: 'https://www.voicepathways.com',
    siteName: 'Voice Pathways',
    title: 'Voice Pathways | Vocal Feminization & MtF Voice Coaching',
    description:
      'Professional vocal feminization training and MtF voice coaching — structured, supportive, and results-focused.',
    images: [
      {
        url: '/opengraph-image.png', // we’ll add this file
        width: 1200,
        height: 630,
        alt: 'Voice Pathways',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Voice Pathways | Vocal Feminization & MtF Voice Coaching',
    description:
      'Professional vocal feminization training and MtF voice coaching — structured, supportive, and results-focused.',
    images: ['/twitter-image.png'], // we’ll add this file
  },

  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
