"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 text-slate-900">
      <Card className="w-full max-w-md bg-white border-slate-200 text-slate-900">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-2">
            <Image
              src="/logo.png"
              alt="AnonymizeCare Logo"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            AnonymizeCare
          </CardTitle>
          <CardDescription className="text-slate-500">
            Admin Console Access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@anonymizecare.com"
                required
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#007CD7]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#007CD7]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#007CD7] hover:bg-[#0065B3]  text-white font-semibold tracking-wide transition-colors mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
