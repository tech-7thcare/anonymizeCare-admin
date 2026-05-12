"use client";

import Link from "next/link";
import { Search, Bell, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMe } from "@/hooks/useMe";

export function Header() {
  const { data: me } = useMe();
  const fullName = me ? `${me.firstName} ${me.lastName}` : "";

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm relative z-10">
      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search consultants, departments..."
          className="w-full bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-11 h-11 rounded-xl focus-visible:ring-[#007CD7]/20 focus-visible:border-[#007CD7]/30 transition-all shadow-sm"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        <button className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2.5 rounded-full transition-all relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2.5 rounded-full transition-all">
          <Settings className="h-5 w-5" />
        </button>
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 ml-2 cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            {fullName && (
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {fullName}
              </p>
            )}
            {me?.email && <p className="text-xs text-slate-500">{me.email}</p>}
          </div>
          <div className="h-10 w-10 rounded-full border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center group-hover:ring-2 group-hover:ring-[#007CD7]/20 transition-all bg-[#007CD7]/10">
            <User className="h-5 w-5 text-[#007CD7]" />
          </div>
        </Link>
      </div>
    </header>
  );
}
