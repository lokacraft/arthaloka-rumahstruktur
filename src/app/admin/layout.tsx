import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Rumah Struktur - Dashboard",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
