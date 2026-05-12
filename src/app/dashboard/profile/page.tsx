"use client";

import { User, Mail, Phone, Globe, ShieldCheck, Calendar } from "lucide-react";
import { useMe } from "@/hooks/useMe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="h-9 w-9 rounded-lg bg-[#007CD7]/10 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-[#007CD7]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-800 truncate">
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { data: me, isLoading } = useMe();

  const fullName = me ? `${me.firstName} ${me.lastName}` : "";
  const initials = me
    ? `${me.firstName[0] ?? ""}${me.lastName[0] ?? ""}`.toUpperCase()
    : "";

  const joinedDate = me?.createdAt
    ? new Date(me.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  if (isLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-48" />
        <div className="h-64 bg-slate-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Profile
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Your account information and details.
        </p>
      </div>

      {/* Avatar + name card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-6 shadow-sm">
        <div className="h-20 w-20 rounded-2xl bg-[#007CD7]/10 flex items-center justify-center shrink-0">
          {initials ? (
            <span className="text-2xl font-bold text-[#007CD7]">
              {initials}
            </span>
          ) : (
            <User className="h-8 w-8 text-[#007CD7]" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {fullName || "—"}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">{me?.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#007CD7]/10 text-[#007CD7]">
              {me?.userType?.replace(/_/g, " ") ?? "User"}
            </span>
            {me?.isEmailVerified && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-3 w-3" /> Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold text-slate-700">
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <DetailRow icon={Mail} label="Email Address" value={me?.email} />
          <DetailRow
            icon={Phone}
            label="Phone Number"
            value={me?.phoneNumber}
          />
          <DetailRow icon={Globe} label="Timezone" value={me?.timezone} />
          <DetailRow icon={Calendar} label="Member Since" value={joinedDate} />
        </CardContent>
      </Card>
    </div>
  );
}
