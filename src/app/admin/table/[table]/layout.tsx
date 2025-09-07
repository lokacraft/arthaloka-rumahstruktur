"use client";

import "../../../globals.css";
import { Toaster } from "@/app/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/lib/auth"; // ambil dari auth.ts

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user === null) {
      router.replace("/auth/sign-in");
    }
  }, [user, router]);

  if (user === false) {
    // Masih cek auth state
    return (
      <html lang="en">
        <body className="flex items-center justify-center h-screen bg-[#EAEAEA]">
          <div className="h-8 w-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </body>
      </html>
    );
  }

  if (user === null) {
    // sementara jangan render apapun saat redirect
    return null;
  }

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          duration: 2000,
          style: {
            background: "#008080",
            color: "#FAFAFA",
            fontWeight: "600",
            borderRadius: "0.5rem",
            padding: "1rem",
            width: "fit-content",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
      {children}
    </>
  );
}
