"use client";

import { Search, Bell, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="h-20 bg-[#0d1317] border-b border-[#1f2930] flex items-center justify-between px-8">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Search consultants, departments..."
          className="w-full bg-[#131b20] border-[#1f2930] text-zinc-200 placeholder:text-zinc-600 pl-10 rounded-xl focus-visible:ring-[#98e9a8]/50"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="text-zinc-400 hover:text-zinc-200 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#98e9a8] rounded-full"></span>
        </button>
        <button className="text-zinc-400 hover:text-zinc-200">
          <Settings className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-[#1f2930] overflow-hidden flex items-center justify-center">
          <User className="h-5 w-5 text-zinc-400" />
        </div>
      </div>
    </header>
  );
}
