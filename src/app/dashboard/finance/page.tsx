"use client";

import { ArrowUpRight, RefreshCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const studentOverrides = [
  {
    nickname: "Alex D.",
    id: "10-0492-XX",
    limit: "9",
    usage: 7,
    action: "Active",
  },
  {
    nickname: "Marcus K.",
    id: "10-0551-XY",
    limit: "15",
    usage: 14,
    action: "Warning",
  },
];

export default function FinancePage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[#007CD7] text-xs font-bold tracking-wider uppercase mb-1">
            Healthcare Intelligence
          </p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Healthcare Control
          </h1>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            Total Spend
          </p>
          <h2 className="text-4xl font-bold text-slate-900">$245.8k</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            Projected Spend
          </p>
          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-bold text-slate-900">$310.2k</h2>
            <ArrowUpRight className="h-5 w-5 text-[#007CD7] mb-1.5" />
          </div>
        </div>
        <div className="bg-[#0f2216] border border-[#183623] rounded-xl p-6">
          <p className="text-[#007CD7] text-xs font-bold uppercase tracking-wider mb-2">
            Remaining Balance
          </p>
          <h2 className="text-4xl font-bold text-[#007CD7]">$54.2k</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Utilization (Circular Progress) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start w-[calc(100%-3rem)]">
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Budget Utilization
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Real-time semester burn rate
              </p>
            </div>
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1.5 rounded-full text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              Warning: Budget nearing capacity
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center mt-20 mb-10 relative">
            <svg
              viewBox="0 0 100 100"
              className="w-56 h-56 transform -rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-zinc-800"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset="50.24"
                className="text-[#007CD7] drop-shadow-[0_0_8px_rgba(0,124,215,0.5)] transition-all duration-1000 ease-in-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-2">
              <span className="text-4xl font-bold text-[#007CD7]">80%</span>
              <span className="text-xs text-slate-500 font-medium tracking-wider mt-1 uppercase">
                UTILIZED
              </span>
            </div>
          </div>

          <div className="w-full flex justify-between items-end border-t border-slate-200 pt-6">
            <div>
              <p className="text-slate-500 text-sm mb-1">Total Slots Used</p>
              <p className="text-2xl font-bold text-slate-800">12,450</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-sm mb-1">Semester Budget</p>
              <p className="text-2xl font-bold text-slate-800">15,000</p>
            </div>
          </div>
        </div>

        {/* Semester-Wide Limits */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col h-full">
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            Semester-Wide Limits
          </h3>

          <div className="space-y-6 flex-1">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <p className="text-slate-500 text-sm mb-3">
                Default Slot Limit / Student
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white border border-slate-200 text-slate-900 text-2xl font-bold rounded-lg w-16 h-14 flex items-center justify-center">
                  5
                </div>
                <div className="text-slate-400 text-sm leading-tight">
                  slots per
                  <br />
                  semester
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 opacity-80">
              <p className="text-slate-400 text-sm mb-3">
                Hard Cap (Requires Admin)
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white text-slate-700 text-2xl font-bold rounded-lg w-16 h-14 flex items-center justify-center">
                  10
                </div>
                <div className="text-slate-400 text-sm leading-tight">
                  slots
                  <br />
                  maximum
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 bg-white border-slate-200 text-[#007CD7] hover:bg-white hover:text-[#007CD7] hover:border-slate-300"
          >
            <RefreshCcw className="h-4 w-4 mr-2" /> Update Limits
          </Button>
        </div>
      </div>

      {/* Student Overrides Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-6">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Student Overrides</h3>
          <button className="text-[#007CD7] text-sm font-medium hover:text-[#0065B3] transition-colors">
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 pl-6">Student Nickname</th>
                <th className="p-4">Institutional ID</th>
                <th className="p-4 text-center">Current Slot Limit</th>
                <th className="p-4">Usage</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2930]">
              {studentOverrides.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6 text-slate-700 text-sm font-medium">
                    {item.nickname}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{item.id}</td>
                  <td className="p-4 text-center">
                    <span className="inline-block text-[#007CD7] font-bold bg-[#007CD7]/10 px-3 py-1 rounded">
                      {item.limit}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 text-sm min-w-[2rem]">
                        {item.usage}/{item.limit}
                      </span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.action === "Warning" ? "bg-rose-500" : "bg-[#007CD7]"}`}
                          style={{
                            width: `${(item.usage / parseInt(item.limit)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-500 hover:text-slate-800"
                    >
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
