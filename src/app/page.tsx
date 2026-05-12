"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
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
import { signIn } from "@/lib/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { token } = await signIn({ email, password });
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Invalid credentials. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@anonymizecare.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#007CD7]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#007CD7] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
