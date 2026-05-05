"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Key,
  Wallet,
  LifeBuoy,
  LogOut,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Consultants", href: "/dashboard/consultants", icon: Users },
  { name: "Access Codes", href: "/dashboard/access-codes", icon: Key },
  { name: "Finance", href: "/dashboard/finance", icon: Wallet },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#0d1317] border-r border-[#1f2930] h-screen flex flex-col text-zinc-400">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-[#1f2930] bg-[#0d1317]">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-full">
            <div className="w-4 h-4 bg-[#98e9a8] rounded-full" />
          </div>
          <div>
            <h1 className="text-[#98e9a8] font-bold text-lg leading-tight uppercase tracking-wide">
              AnonymizeCare
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
              Admin Console
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-[#13221b] text-[#98e9a8] font-medium"
                  : "hover:bg-[#131b20] hover:text-zinc-200"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${isActive ? "text-[#98e9a8]" : "text-zinc-500"}`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 space-y-4">
        <Button className="w-full bg-[#98e9a8] hover:bg-[#81d492] text-[#0a2717] rounded-full font-semibold">
          <Plus className="h-4 w-4 mr-2" /> Add Consultant
        </Button>
        <div className="space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-sm hover:text-zinc-200 transition-colors"
          >
            <LifeBuoy className="h-4 w-4 text-zinc-500" /> Support
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm hover:text-rose-400 transition-colors"
          >
            <LogOut className="h-4 w-4 text-zinc-500" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
