"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from "react"; // 1. Impor useState

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // 2. Tambahkan state untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk pesan error

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // <-- Atur loading menjadi true saat proses dimulai
    setError(null); // Reset error

    const form = event.currentTarget;
    const username = form.username.value;
    const password = form.password.value;
    const rememberMe = form.rememberMe.checked;

    try {
      await signIn(username, password, rememberMe);
      router.replace("/admin/dashboard/");
    } catch (e) {
      console.error(e);
      setError("Login failed. Please check your email and password."); // Tampilkan pesan error
    } finally {
      setIsLoading(false); // <-- Atur loading kembali ke false setelah selesai (baik berhasil maupun gagal)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Tambahkan 'relative' agar overlay bisa diposisikan di dalamnya */}
      <Card className="w-full max-w-sm relative"> 
        
        {/* --- 3. Tampilkan Loader Secara Kondisional --- */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
            {/* <LoaderFive text="Signing in..." /> */}
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <Input name='username' id="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <Input name="password" id="password" type="password" required disabled={isLoading} />
          </div>
          <div className="block mt-4">
            <label className="flex items-center">
              <input type="checkbox" id="rememberMe" name="rememberMe" className='rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500' disabled={isLoading} />
              <span className="ms-2 text-sm text-gray-600">Remember Me</span>
            </label>
          </div>
          {/* Tampilkan pesan error jika ada */}
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="flex items-center justify-around">
          <Button className="w-[45%] bg-transparent text-gray-700 font-semibold hover:bg-transparent" type="button" disabled={isLoading}>back</Button>
          <Button type="submit" className="w-[45%]" disabled={isLoading}>
            {/* Teks tombol berubah saat loading */}
            {isLoading ? '...' : 'Sign in'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}