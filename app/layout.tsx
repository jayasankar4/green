import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Grass Infratech | Engineering Resource Deployment & Technical Staffing",
    template: "%s | Grass Infratech",
  },
  description:
    "Grass Infratech provides engineering resource deployment, technical staffing, and engineering support services to EPC contractors, engineering consultants, and asset owners worldwide.",
  keywords: [
    "engineering staffing",
    "engineering resource deployment",
    "technical manpower",
    "EPC staffing",
    "engineering consultants",
    "engineering resource sharing",
    "oil and gas staffing",
    "engineering professionals",
  ],
  authors: [{ name: "Grass Infratech" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Grass Infratech",
    title: "Grass Infratech | Engineering Resource Deployment & Technical Staffing",
    description:
      "Delivering Highly Skilled Engineering Professionals for the Global Energy & Infrastructure Industry",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

