"use client";

import { Lock, Mail, Users, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function NewConsultantPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">
            Onboarding Protocol
          </p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            New Consultant Setup
          </h1>
        </div>
        <div>
          <Button className="bg-[#007CD7] hover:bg-[#0065B3] text-white font-semibold rounded-full px-6">
            Generate & Email Access Token
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column (Forms) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Credentials */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-slate-700 font-medium mb-2">
              <Lock className="h-5 w-5 text-[#007CD7]" />
              Identity Credentials
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-500 text-sm">
                  Legal First Name
                </Label>
                <Input
                  placeholder="e.g. Sarah"
                  className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 text-sm">Legal Last Name</Label>
                <Input
                  placeholder="e.g. Chen"
                  className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">
                Institutional Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="s.chen@hospital.org"
                  className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-zinc-700 pl-10"
                />
              </div>
            </div>
          </div>

          {/* System Placement */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-slate-700 font-medium mb-2">
              <Network className="h-5 w-5 text-[#007CD7]" />
              System Placement
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-500 text-sm">
                  Primary Specialty
                </Label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2.5 outline-none focus:border-[#007CD7]">
                  <option value="" disabled selected>
                    Select Specialty...
                  </option>
                  <option>Neurology</option>
                  <option>Cardiology</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 text-sm">
                  Department Assignment
                </Label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2.5 outline-none focus:border-[#007CD7]">
                  <option value="" disabled selected>
                    Assign Department...
                  </option>
                  <option>Intensive Care</option>
                  <option>Surgery</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">
                Supervising Physician (Optional)
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search system directory..."
                  className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-zinc-700 pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Access Configuration) */}
        <div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 h-full">
            <div className="flex items-center gap-2 text-slate-700 font-medium mb-6">
              <ShieldIcon className="h-5 w-5 text-[#007CD7]" />
              Access Configuration
            </div>

            <div className="space-y-8">
              {/* Toggle 1 */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-slate-800 text-base font-medium">
                    EHR Write Access
                  </Label>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Permit consultant to modify Electronic Health Records
                    directly.
                  </p>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#007CD7]"
                />
              </div>

              {/* Toggle 2 */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-slate-800 text-base font-medium">
                    Prescription Authority
                  </Label>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enable digital prescription signing module.
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#007CD7]" />
              </div>

              {/* Toggle 3 */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-slate-800 text-base font-medium">
                    Advanced Analytics View
                  </Label>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Grant access to population health metrics and predictive
                    models.
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#007CD7]" />
              </div>
            </div>

            <div className="mt-10 p-4 bg-[#1a242a] border border-slate-300 rounded-lg">
              <p className="text-xs text-slate-500 flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007CD7] flex-shrink-0 mt-1"></span>
                <span>
                  Token valid for 48 hours. Requires 2FA completion by
                  consultant upon first login.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 4.96.9 6.8 1.83A1 1 0 0 1 20 6z" />
    </svg>
  );
}
