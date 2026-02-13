import { Bebas_Neue, Barlow, Barlow_Condensed, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Gilbert Air Strike | Flag Football",
  description:
    "Gilbert Air Strike and Lady Air Strike — development-first flag football programs for boys and girls, 8U through high school. Gilbert, Arizona.",
  openGraph: {
    title: "Gilbert Air Strike | Flag Football",
    description:
      "Development-first flag football for boys and girls, 8U through high school.",
    images: ["/images/hero-team.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-[family-name:var(--font-barlow)]">{children}</body>
    </html>
  );
}
