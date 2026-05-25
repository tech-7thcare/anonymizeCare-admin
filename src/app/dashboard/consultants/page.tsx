"use client";

import {
  Download,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useAllConsultants,
  useInstitutionConsultants,
} from "@/hooks/useConsultants";
import { useMe } from "@/hooks/useMe";
import type {
  ConsultantCategory,
  ConsultantSpecialty,
} from "@/lib/services/consultants";

function getLabel(
  field: ConsultantCategory | ConsultantSpecialty | string | undefined,
): string {
  if (!field) return "—";
  if (typeof field === "string") return field;
  return field.label ?? "—";
}

function getInstitutionId(
  me: ReturnType<typeof useMe>["data"],
): string | undefined {
  if (!me) return undefined;
  if (me.institution && typeof me.institution === "object")
    return me.institution._id;
  if (typeof me.institution === "string") return me.institution;
  return me.institutionId;
}

export default function ConsultantsPage() {
  const [page, setPage] = useState(1);
  const { data: me } = useMe();
  const institutionId = getInstitutionId(me);

  const { data, isLoading, isError } = useInstitutionConsultants(
    institutionId,
    page,
  );

  const consultants = data?.data ?? [];
  const pagination = data?.pagination;

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

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-24 text-slate-400 gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading consultants…</span>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-24 text-rose-500 text-sm">
            Failed to load consultants. Please try again.
          </div>
        ) : consultants.length === 0 ? (
          <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
            No consultants found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="font-medium p-4 pl-6">Consultant</th>
                  <th className="font-medium p-4">Specialty</th>
                  <th className="font-medium p-4">Category</th>
                  <th className="font-medium p-4">Status</th>
                  <th className="font-medium p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consultants.map((consultant) => {
                  const initials =
                    `${consultant.user.firstName?.[0] ?? ""}${consultant.user.lastName?.[0] ?? ""}`.toUpperCase();
                  const fullName = `${consultant.user.firstName} ${consultant.user.lastName}`;
                  const isVerified = consultant.isConsultantVerified;

                  return (
                    <tr
                      key={consultant._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#007CD7]/10 flex items-center justify-center font-semibold text-[#007CD7] border border-[#007CD7]/20 text-sm">
                            {initials}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">
                              {fullName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {consultant.user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 text-sm">
                        {getLabel(consultant.specialty)}
                      </td>
                      <td className="p-4 text-slate-700 text-sm">
                        {getLabel(consultant.category)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                            isVerified
                              ? "bg-[#007CD7]/10 text-[#007CD7] border-[#007CD7]/20"
                              : "bg-amber-50 text-amber-600 border-amber-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${isVerified ? "bg-[#007CD7]" : "bg-amber-500"}`}
                          />
                          {isVerified ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <button className="text-slate-400 hover:text-slate-700 p-2">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
            <div>
              Showing {(page - 1) * pagination.limit + 1}–
              {Math.min(page * pagination.limit, pagination.total)} of{" "}
              {pagination.total}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-[#007CD7] text-white"
                        : "hover:bg-slate-100 text-slate-500"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.pages, p + 1))
                }
                disabled={page === pagination.pages}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {pagination && pagination.pages <= 1 && consultants.length > 0 && (
          <div className="p-4 border-t border-slate-200 text-sm text-slate-500">
            Showing {consultants.length} of {pagination.total} consultant
            {pagination.total !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
