import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "KisanRoute — Intelligent Farmer Query Classification & Specialist Routing",
  description:
    "Reading a farmer's question and knowing who should answer it — before a human has to. Applied AI and NLP routing for Indian agriculture.",
  keywords: [
    "KisanRoute",
    "Agricultural NLP",
    "Farmer Query Routing",
    "Kisan Call Centre",
    "ICAR Extension",
    "Plant Protection",
    "Agrometeorology",
    "Soil Nutrient Management",
    "PM-KISAN",
    "APMC Mandi Prices"
  ],
  authors: [{ name: "KisanRoute Applied AI Lab" }],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-ivory dark:bg-agri-950 text-agri-950 dark:text-ivory selection:bg-agri-600 selection:text-white">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
