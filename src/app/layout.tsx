import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@rachichi/design";
import { Navbar } from "@/components/layout/Navbar";
import { TRPCProvider } from "@/lib/trpc/provider";
import "@rachichi/design/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agora — Local government, open for input",
  description:
    "Verified topics from elected officials. Weigh in anonymously on decisions affecting your neighborhood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <TRPCProvider>
          <Navbar />
          {children}
          <SiteFooter stack="next.js, trpc, drizzle, postgres" />
        </TRPCProvider>
      </body>
    </html>
  );
}
