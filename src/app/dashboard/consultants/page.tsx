"use client";

import {
  Download,
  UserPlus,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const consultants = [
  {
    id: "C-8921",
    name: "Dr. Aris Thorne",
    specialty: "Neurology",
    department: "Intensive Care",
    status: "Active",
    avatar: "A",
  },
  {
    id: "C-7433",
    name: "Dr. Elena Rostova",
    specialty: "Cardiology",
    department: "Surgery",
    status: "Active",
    avatar: "E",
  },
  {
    id: "C-5102",
    name: "Dr. Marcus Kane",
    specialty: "Orthopedics",
    department: "Outpatient",
    status: "Inactive",
    avatar: "M",
  },
  {
    id: "C-9011",
    name: "Dr. Sarah Vance",
    specialty: "Pediatrics",
    department: "Emergency",
    status: "Active",
    avatar: "S",
  },
];

export default function ConsultantsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Consultant Roster
          </h1>
          <p className="text-slate-500 mt-1">
            Manage clinical staff, specialties, and operational status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Link href="/dashboard/consultants/new">
            <Button className="bg-[#007CD7] hover:bg-[#0065B3] text-white font-semibold">
              <UserPlus className="h-4 w-4 mr-2" /> Add Consultant
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center text-slate-500 mr-2">
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-sm">Filters</span>
          </div>
          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#007CD7]">
            <option>All Specialties</option>
            <option>Neurology</option>
            <option>Cardiology</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#007CD7]">
            <option>All Departments</option>
            <option>Intensive Care</option>
            <option>Surgery</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#007CD7]">
            <option>Status: All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="text-slate-500 text-sm">Showing 42 Results</div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm">
                <th className="font-medium p-4 pl-6">Consultant</th>
                <th className="font-medium p-4">Specialty</th>
                <th className="font-medium p-4">Department</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2930]">
              {consultants.map((consultant) => (
                <tr
                  key={consultant.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-700 border border-slate-200">
                        {consultant.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {consultant.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          ID: {consultant.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 text-sm">
                    {consultant.specialty}
                  </td>
                  <td className="p-4 text-slate-700 text-sm">
                    {consultant.department}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                        consultant.status === "Active"
                          ? "bg-[#007CD7]/10 text-[#007CD7] border-[#007CD7]/20"
                          : "bg-zinc-500/10 text-slate-500 border-zinc-500/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${consultant.status === "Active" ? "bg-[#007CD7]" : "bg-zinc-500"}`}
                      ></span>
                      {consultant.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button className="text-slate-400 hover:text-slate-700 p-2">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>Showing 1 to 4 of 42</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1f2930] text-slate-800">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
              2
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
