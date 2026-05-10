"use client";

import {
  KeyRound,
  Download,
  FileText,
  ArrowUpRight,
  Copy,
  Ban,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const liveInventory = [
  {
    id: "VXR-992-A1B2",
    tier: "Standard Clinical",
    dept: "Neurology Dept. A",
    status: "Active",
  },
  {
    id: "VXR-881-C334",
    tier: "Admin Override",
    dept: "System Global",
    status: "Active",
  },
  {
    id: "VXR-770-E5F6",
    tier: "Research Long-term",
    dept: "Cardiology Research Unit",
    status: "Redeemed",
  },
  {
    id: "VXR-669-G7H8",
    tier: "Standard Clinical",
    dept: "General Practice Hub",
    status: "Active",
  },
];

export default function AccessCodesPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Access Engine
          </h1>
          <p className="text-slate-500 mt-1">
            Manage and generate secure clinical access tokens.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <FileText className="h-4 w-4 mr-2" /> Export PDF
          </Button>
          <Button
            variant="outline"
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bulk Generation Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 text-slate-700 font-medium mb-6">
            <KeyRound className="h-5 w-5 text-[#007CD7]" />
            Bulk Generation
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Quantity
              </Label>
              <Input
                type="number"
                defaultValue="100"
                className="bg-slate-50 border-slate-200 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Access Tier
              </Label>
              <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2.5 outline-none focus:border-[#007CD7]">
                <option>Standard Clinical (7 Days)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Assigned Department
              </Label>
              <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2.5 outline-none focus:border-[#007CD7]">
                <option>Neurology Dept. A</option>
              </select>
            </div>

            <Button className="w-full bg-[#007CD7] hover:bg-[#0065B3] text-white font-semibold mt-2">
              <KeyRound className="h-4 w-4 mr-2" /> Generate Tokens
            </Button>
          </div>
        </div>

        {/* Active Tokens Stats */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">
            Active Tokens
          </p>
          <div className="flex items-end gap-2">
            <h2 className="text-5xl font-bold text-slate-900 tracking-tight">
              14,208
            </h2>
            <span className="text-[#007CD7] text-sm font-medium flex items-center mb-1">
              +12% <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>

          <div className="mt-auto flex items-end gap-1 h-24 pt-8">
            <div className="w-full bg-slate-100/50 rounded-sm h-[20%]"></div>
            <div className="w-full bg-slate-100/50 rounded-sm h-[30%]"></div>
            <div className="w-full bg-slate-100/50 rounded-sm h-[40%]"></div>
            <div className="w-full bg-slate-100/50 rounded-sm h-[25%]"></div>
            <div className="w-full bg-[#007CD7]/80 rounded-sm h-[60%]"></div>
            <div className="w-full bg-[#007CD7] rounded-sm h-[100%] shadow-[0_0_10px_rgba(0,124,215,0.3)]"></div>
          </div>
        </div>

        {/* Redeemed / Expired Stats */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">
            Redeemed / Expired
          </p>
          <div className="flex items-end gap-2">
            <h2 className="text-5xl font-bold text-slate-900 tracking-tight">
              3,492
            </h2>
            <span className="text-slate-400 text-sm font-medium mb-1">
              Last 30 Days
            </span>
          </div>

          <div className="mt-auto bg-slate-50 rounded-lg p-4 flex items-center justify-between border border-slate-200">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Redemption Rate
              </p>
              <p className="text-xl font-bold text-slate-800">82.4%</p>
            </div>
            <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-[#007CD7] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#007CD7] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Inventory Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-6">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-700">Live Inventory</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#1a242a] text-slate-700 text-xs font-medium rounded border border-slate-300">
              Active
            </span>
            <span className="px-3 py-1 text-slate-400 text-xs font-medium border border-transparent">
              Expired
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 pl-6">Token ID</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Assigned Dept</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2930]">
              {liveInventory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6 font-mono text-slate-700 text-sm">
                    {item.id}
                  </td>
                  <td className="p-4 text-slate-700 text-sm font-medium">
                    {item.tier}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{item.dept}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium ${
                        item.status === "Active"
                          ? "text-[#007CD7]"
                          : "text-slate-400 bg-slate-50 border border-slate-200"
                      }`}
                    >
                      {item.status === "Active" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#007CD7]"></span>
                      )}
                      {item.status === "Redeemed" && (
                        <RefreshCcw className="h-3 w-3 mr-0.5" />
                      )}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <div className="flex justify-end gap-2 text-slate-400">
                      {item.status === "Active" ? (
                        <>
                          <button
                            className="hover:text-slate-700 transition-colors p-1"
                            title="Copy"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            className="hover:text-rose-400 transition-colors p-1"
                            title="Revoke"
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <button className="text-zinc-700 cursor-not-allowed p-1">
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                    </div>
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
