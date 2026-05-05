"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-[#0d1317] p-4 text-zinc-100">
      <Card className="w-full max-w-md bg-[#131b20] border-[#1f2930] text-zinc-50">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-emerald-500/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-[#98e9a8]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            AnonymizeCare
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Admin Console Access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@anonymizecare.com"
                required
                className="bg-[#0b1014] border-[#25323a] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#98e9a8]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-[#0b1014] border-[#25323a] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#98e9a8]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#98e9a8] hover:bg-[#81d492] hover:text-[#0a2717] text-[#0d1317] font-semibold tracking-wide transition-colors mt-4"
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
