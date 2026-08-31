"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Scissors, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      
      toast.success("Logged in successfully! Redirecting...");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 dark:from-zinc-900/40 dark:via-zinc-950 dark:to-zinc-950 relative overflow-hidden">
      
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />

      <div className="w-full max-w-[480px] z-10 relative flex flex-col items-center">
        
        <div className="mb-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-xl">
            <Scissors className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Haloaura Braids Admin</h1>
        </div>

        <div className="w-full">
          <form onSubmit={handleLogin}>
            <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden">
              <CardHeader className="pb-8 pt-8 px-8">
                <CardTitle className="text-3xl text-zinc-900 dark:text-zinc-100 font-semibold tracking-tight">Welcome back</CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-base mt-2">Enter your credentials to access the dashboard</CardDescription>
                {errorMsg && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 dark:text-red-400 text-sm">{errorMsg}</div>}
              </CardHeader>
              <CardContent className="space-y-6 px-8">
                <div className="space-y-3">
                  <label className="text-base font-medium leading-none text-zinc-700 dark:text-zinc-300">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-zinc-400 dark:text-zinc-500 transition-colors group-focus-within:text-primary" />
                    <Input 
                      type="email" 
                      placeholder="admin@example.com" 
                      className="pl-12 bg-white dark:bg-zinc-950/80 border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-primary h-14 text-base rounded-xl transition-all" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium leading-none text-zinc-700 dark:text-zinc-300">Password</label>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-zinc-400 dark:text-zinc-500 transition-colors group-focus-within:text-primary" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="pl-12 pr-12 bg-white dark:bg-zinc-950/80 border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-primary h-14 text-base rounded-xl transition-all" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                      {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-transparent border-t-0 pt-4 pb-10 px-8">
                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white transition-all h-14 rounded-xl font-medium text-lg" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        
        <p className="mt-12 text-base text-zinc-500 dark:text-zinc-600 font-medium">
          &copy; {new Date().getFullYear()} Haloaura Braids. All rights reserved.
        </p>
      </div>
    </div>
  );
}
