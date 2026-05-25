"use client";

import { useState } from "react";
import {
  KeyRound,
  Copy,
  Ban,
  Trash2,
  Loader2,
  CheckCircle2,
  User,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessCodes } from "@/hooks/useAccessCodes";
import {
  createAccessCodes,
  deleteAccessCodes,
  deactivateAccessCodes,
} from "@/lib/services/access-codes";
import { toast } from "sonner";

type ActionInProgress = { id: string; type: "delete" | "deactivate" } | null;
type Tab = "all" | "active" | "redeemed" | "inactive";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "redeemed", label: "Redeemed" },
  { key: "inactive", label: "Inactive" },
];

export default function AccessCodesPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useAccessCodes();
  const codes = data?.data ?? [];

  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [count, setCount] = useState(10);
  const [expiresAt, setExpiresAt] = useState("2026-12-31T23:59:59");
  const [generateSuccess, setGenerateSuccess] = useState<number | null>(null);
  const [actionInProgress, setActionInProgress] =
    useState<ActionInProgress>(null);

  const copyCode = (code: string) => navigator.clipboard.writeText(code);

  const { mutate: generate, isPending: generating } = useMutation({
    mutationFn: () =>
      createAccessCodes({
        count,
        expiresAt: new Date(expiresAt).toISOString(),
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["access-codes"] });
      setGenerateSuccess(res.count);
      setTimeout(() => setGenerateSuccess(null), 3000);
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Failed to generate codes. Please try again.";
      toast.error(message);
    },
  });

  const { mutate: deleteOne } = useMutation({
    mutationFn: (id: string) => deleteAccessCodes([id]),
    onMutate: (id) => setActionInProgress({ id, type: "delete" }),
    onSettled: () => setActionInProgress(null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["access-codes"] });
      toast.success("Access code deleted.");
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Failed to delete code.";
      toast.error(message);
    },
  });

  const { mutate: deactivateOne } = useMutation({
    mutationFn: (id: string) => deactivateAccessCodes([id]),
    onMutate: (id) => setActionInProgress({ id, type: "deactivate" }),
    onSettled: () => setActionInProgress(null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["access-codes"] });
      toast.success("Access code deactivated.");
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Failed to deactivate code.";
      toast.error(message);
    },
  });

  const activeCount = codes.filter((c) => c.isActive && !c.isUsed).length;
  const usedCount = codes.filter((c) => c.isUsed).length;
  const inactiveCount = codes.filter((c) => !c.isActive).length;

  const filteredCodes = codes.filter((c) => {
    if (activeTab === "active") return c.isActive && !c.isUsed;
    if (activeTab === "redeemed") return c.isUsed;
    if (activeTab === "inactive") return !c.isActive;
    return true;
  });

  const tabCount: Record<Tab, number> = {
    all: codes.length,
    active: activeCount,
    redeemed: usedCount,
    inactive: inactiveCount,
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Access Codes
        </h1>
        <p className="text-slate-500 mt-1">
          Generate, view, deactivate, and delete institution access codes.
        </p>
      </div>

      {/* Stats + Generate */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Generate form */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-5">
            <KeyRound className="h-5 w-5 text-[#007CD7]" />
            Generate Codes
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Quantity
              </Label>
              <Input
                type="number"
                min={1}
                max={500}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="bg-slate-50 border-slate-200 text-slate-800"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Expiry Date
              </Label>
              <Input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="bg-slate-50 border-slate-200 text-slate-800"
              />
            </div>
            {generateSuccess !== null && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                {generateSuccess} code{generateSuccess !== 1 ? "s" : ""}{" "}
                created!
              </div>
            )}
            <Button
              className="w-full bg-[#007CD7] hover:bg-[#0065B3] text-white font-semibold"
              onClick={() => generate()}
              disabled={generating}
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                </span>
              ) : (
                <>
                  <KeyRound className="h-4 w-4 mr-2" /> Generate Codes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Active stat */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-1">
          <p className="text-sm font-medium text-slate-500">Active / Unused</p>
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight">
            {isLoading ? "—" : activeCount}
          </h2>
          <p className="text-xs text-slate-400 mt-auto">
            Ready to be redeemed by institution members
          </p>
        </div>

        {/* Used + Inactive stat */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Redeemed</p>
            <p className="text-3xl font-bold text-slate-800">
              {isLoading ? "—" : usedCount}
            </p>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-sm font-medium text-slate-500">Deactivated</p>
            <p className="text-3xl font-bold text-slate-800">
              {isLoading ? "—" : inactiveCount}
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-2 pt-2 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.key
                  ? "bg-white border border-b-white border-slate-200 text-[#007CD7] -mb-px"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.label}
              {!isLoading && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    activeTab === tab.key
                      ? "bg-[#007CD7]/10 text-[#007CD7]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tabCount[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading access codes…</span>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-20 text-rose-500 text-sm">
            Failed to load access codes. Please try again.
          </div>
        ) : filteredCodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <KeyRound className="h-8 w-8 opacity-30" />
            <p className="text-sm">
              {activeTab === "all"
                ? "No access codes yet. Generate some above."
                : `No ${activeTab} codes.`}
            </p>
          </div>
        ) : activeTab === "redeemed" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6">Code</th>
                  <th className="p-4">Redeemed By</th>
                  <th className="p-4">Redeemed At</th>
                  <th className="p-4">Expires</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCodes.map((code) => {
                  const isDeleting =
                    actionInProgress?.id === code._id &&
                    actionInProgress.type === "delete";
                  const busy = isDeleting;
                  const user = code.usedBy as
                    | { nickname?: string; email?: string }
                    | undefined;

                  return (
                    <tr
                      key={code._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 pl-6 font-mono text-slate-800 text-sm font-medium">
                        {code.code}
                      </td>
                      <td className="p-4">
                        {user ? (
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                              <User className="h-3.5 w-3.5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {user.nickname ?? "—"}
                              </p>
                              <p className="text-xs text-slate-400">
                                {user.email ?? ""}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        {code.usedAt
                          ? new Date(code.usedAt).toLocaleString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        {new Date(code.expiresAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => copyCode(code.code)}
                            title="Copy code"
                            disabled={busy}
                            className="text-slate-400 hover:text-[#007CD7] transition-colors p-1.5 rounded-lg hover:bg-[#007CD7]/10 disabled:opacity-40"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteOne(code._id)}
                            title="Delete code"
                            disabled={busy}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50 disabled:opacity-40"
                          >
                            {isDeleting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6">Code</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Expires</th>
                  <th className="p-4">Created</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCodes.map((code) => {
                  const isExpired = new Date(code.expiresAt) < new Date();
                  const statusLabel = code.isUsed
                    ? "Redeemed"
                    : !code.isActive
                      ? "Inactive"
                      : isExpired
                        ? "Expired"
                        : "Active";
                  const statusColor =
                    statusLabel === "Active"
                      ? "bg-[#007CD7]/10 text-[#007CD7] border-[#007CD7]/20"
                      : statusLabel === "Redeemed"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200";
                  const dotColor =
                    statusLabel === "Active"
                      ? "bg-[#007CD7]"
                      : statusLabel === "Redeemed"
                        ? "bg-emerald-500"
                        : "bg-slate-400";

                  const isDeleting =
                    actionInProgress?.id === code._id &&
                    actionInProgress.type === "delete";
                  const isDeactivating =
                    actionInProgress?.id === code._id &&
                    actionInProgress.type === "deactivate";
                  const busy = isDeleting || isDeactivating;

                  return (
                    <tr
                      key={code._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 pl-6 font-mono text-slate-800 text-sm font-medium">
                        {code.code}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${dotColor}`}
                          />
                          {statusLabel}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        {new Date(code.expiresAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        {new Date(code.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => copyCode(code.code)}
                            title="Copy code"
                            disabled={busy}
                            className="text-slate-400 hover:text-[#007CD7] transition-colors p-1.5 rounded-lg hover:bg-[#007CD7]/10 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          {code.isActive && !code.isUsed && (
                            <button
                              onClick={() => deactivateOne(code._id)}
                              title="Deactivate code"
                              disabled={busy}
                              className="text-slate-400 hover:text-amber-500 transition-colors p-1.5 rounded-lg hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {isDeactivating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Ban className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => deleteOne(code._id)}
                            title="Delete code"
                            disabled={busy}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {isDeleting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && codes.length > 0 && (
          <div className="p-4 border-t border-slate-100 text-xs text-slate-400">
            {activeCount} active · {usedCount} redeemed · {inactiveCount}{" "}
            inactive
          </div>
        )}
      </div>
    </div>
  );
}
