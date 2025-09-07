"use client";

import { Button } from "@/app/components/ui/button";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// import Image from "next/image"; // untuk logo
import "../../../globals.css";

export const metadata : Metadata = {
  title: "Login Admin - RumahStruktur",
  description: "Masuk ke dashboard admin RumahStruktur untuk mengelola konten.",
  keywords: ["RumahStruktur", "admin login", "dashboard"],
  openGraph: {
    title: "Login Admin - RumahStruktur",
    description: "Masuk ke dashboard admin RumahStruktur untuk mengelola konten.",
    url: "https://rumahstruktur.com/auth/sign-in",
    siteName: "RumahStruktur",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RumahStruktur Dashboard",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = event.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    const rememberMe = (form.rememberMe as HTMLInputElement).checked;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      router.replace("/admin/table/testimoni");
    } catch (e) {
      console.error(e);
      setError("Login failed. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm relative bg-white shadow-md rounded-lg p-6">
        {/* Loader overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <CardHeader className="flex flex-col items-center gap-2 relative">
          <div className="flex flex-row justify-center items-center gap-2 w-full">
            {/* Logo + Nama perusahaan */}
            {/* <Image
              src="/logo-rumahstruktur.png" // ganti dengan path logo kamu di /public
              alt="RumahStruktur Logo"
              width={40}
              height={40}
              priority
            /> */}
            <h2 className="text-lg font-bold tracking-wide text-gray-800 rounded-2xl border border-black p-2">
              LOGO
            </h2>
            <h2 className="text-lg font-semibold tracking-wide text-gray-800">
              Rumah Struktur
            </h2>
          </div>

          <CardTitle className="text-2xl text-center mt-4">
            Login Dashboard Admin
          </CardTitle>
          <CardDescription className="text-center">
            Masukkan Email dan Password Anda
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2 relative">
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              required
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2 right-2 flex items-center text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="block mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                disabled={isLoading}
              />
              <span className="ms-2 text-sm text-gray-600">Remember Me</span>
            </label>
          </div>
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-around">
          <Button
            className="w-[45%] bg-transparent text-gray-700 font-semibold hover:bg-transparent"
            type="button"
            disabled={isLoading}
          >
            Back
          </Button>
          <Button type="submit" className="w-[45%]" disabled={isLoading}>
            {isLoading ? "..." : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
