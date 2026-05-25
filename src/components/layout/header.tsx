"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useMe } from "@/hooks/useMe";

export function Header() {
  const { data: me } = useMe();
  const fullName = me ? `${me.firstName} ${me.lastName}` : "";
  const institutionName =
    me?.institution && typeof me.institution === "object"
      ? (me.institution as { _id: string; name?: string }).name
      : undefined;

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm relative z-10">
      {/* University / institution name */}
      <div className="flex-1">
        {institutionName ? (
          <div>
            <p className="text-xs font-semibold text-[#007CD7] uppercase tracking-widest">
              Institution
            </p>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {institutionName}
            </h2>
          </div>
        ) : (
          <div className="h-10" />
        )}
      </div>

      {/* Right: admin info + profile icon */}
      <div className="flex items-center gap-3">
        {(fullName || me?.email || institutionName) && (
          <div className="text-right">
            {fullName && (
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {fullName}
              </p>
            )}
            {me?.email && <p className="text-xs text-slate-500">{me.email}</p>}
            {institutionName && (
              <p className="text-xs text-[#007CD7] font-medium mt-0.5">
                {institutionName}
              </p>
            )}
          </div>
        )}
        <Link
          href="/dashboard/profile"
          className="h-10 w-10 rounded-full border border-slate-200 shadow-sm flex items-center justify-center hover:ring-2 hover:ring-[#007CD7]/20 transition-all bg-[#007CD7]/10 ml-1"
        >
          <User className="h-5 w-5 text-[#007CD7]" />
        </Link>
      </div>
    </header>
  );
}
