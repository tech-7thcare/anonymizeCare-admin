"use client";

import Link from "next/link";
import Image from "next/image";
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
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col text-slate-600 shadow-sm">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div>
            <Image
              src="/logo.png"
              alt="AnonymizeCare Logo"
              width={90}
              height={90}
              className="object-contain"
            />
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Admin Console
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-[#007CD7]/10 text-[#007CD7] shadow-sm"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${isActive ? "text-[#007CD7]" : "text-slate-400"}`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 space-y-5">
        <Button className="w-full bg-[#007CD7] hover:bg-[#0065B3] text-white rounded-xl shadow-sm font-semibold transition-all">
          <Plus className="h-4 w-4 mr-2" /> Add Consultant
        </Button>
        <div className="space-y-1.5 border-t border-slate-100 pt-5">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors font-medium"
          >
            <LifeBuoy className="h-4 w-4 text-slate-400" /> Support
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors font-medium text-slate-600"
          >
            <LogOut className="h-4 w-4 text-slate-400" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
