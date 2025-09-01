import localFont from "next/font/local";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";

export const clashGrotesk = localFont({
  src: "../app/fonts/clash-grotesk/ClashGrotesk-Variable.woff2",
  variable: "--font-clash",
  display:"swap"
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});