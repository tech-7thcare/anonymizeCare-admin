"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Phone,
  Network,
  FileText,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Upload,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useMe } from "@/hooks/useMe";
import { toast } from "sonner";
import {
  useConsultantCategories,
  useConsultantSpecialties,
} from "@/hooks/useConsultants";
import {
  createInstitutionConsultant,
  type CreateConsultantPayload,
} from "@/lib/services/consultants";

function getInstitutionId(me: ReturnType<typeof useMe>["data"]) {
  if (!me) return undefined;
  if (me.institutionId) return me.institutionId;
  if (typeof me.institution === "string") return me.institution;
  if (me.institution && typeof me.institution === "object")
    return me.institution._id;
  return undefined;
}

function FileInput({
  label,
  onChange,
  file,
}: {
  label: string;
  onChange: (f: File | null) => void;
  file: File | null;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <Label className="text-slate-500 text-sm">{label}</Label>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-[#007CD7] hover:bg-blue-50/30 transition-colors text-left"
      >
        <Upload className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="truncate">
          {file ? file.name : "Click to upload file…"}
        </span>
      </button>
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

export default function NewConsultantPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me } = useMe();
  const institutionId = getInstitutionId(me) ?? "";

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    categoryId: "",
    specialtyId: "",
    medicalLicenseNumber: "",
  });
  const [files, setFiles] = useState<{
    cvFile: File | null;
    medicalLicenseFile: File | null;
    signature: File | null;
    institutionIdFile: File | null;
  }>({
    cvFile: null,
    medicalLicenseFile: null,
    signature: null,
    institutionIdFile: null,
  });

  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateConsultantPayload) =>
      createInstitutionConsultant(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] });
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/consultants"), 1800);
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useConsultantCategories();
  const { data: specialtiesData, isLoading: specialtiesLoading } =
    useConsultantSpecialties(fields.categoryId || undefined);
  const categories = categoriesData?.data ?? [];
  const specialties = specialtiesData?.data ?? [];

  const set =
    (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFields((prev) => ({
      ...prev,
      categoryId: e.target.value,
      specialtyId: "",
    }));
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFields((prev) => ({ ...prev, specialtyId: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ ...fields, institutionId, ...files });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Consultant Created</h2>
        <p className="text-slate-500 text-sm">Redirecting to roster…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/consultants"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 mb-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Roster
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            New Consultant Setup
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identity Credentials */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Lock className="h-5 w-5 text-[#007CD7]" />
            Identity Credentials
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">First Name</Label>
              <Input
                placeholder="e.g. Sarah"
                required
                value={fields.firstName}
                onChange={set("firstName")}
                className="bg-slate-50 border-slate-200 text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">Last Name</Label>
              <Input
                placeholder="e.g. Chen"
                required
                value={fields.lastName}
                onChange={set("lastName")}
                className="bg-slate-50 border-slate-200 text-slate-800"
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
                type="email"
                placeholder="s.chen@hospital.org"
                required
                value={fields.email}
                onChange={set("email")}
                className="bg-slate-50 border-slate-200 text-slate-800 pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="tel"
                  placeholder="+2348012345678"
                  required
                  value={fields.phoneNumber}
                  onChange={set("phoneNumber")}
                  className="bg-slate-50 border-slate-200 text-slate-800 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="password"
                  placeholder="StrongPass@123"
                  required
                  value={fields.password}
                  onChange={set("password")}
                  className="bg-slate-50 border-slate-200 text-slate-800 pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Network className="h-5 w-5 text-[#007CD7]" />
            Professional Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">Category</Label>
              <select
                required
                value={fields.categoryId}
                onChange={handleCategoryChange}
                disabled={categoriesLoading}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#007CD7]/30 focus:border-[#007CD7] disabled:opacity-50"
              >
                <option value="">
                  {categoriesLoading ? "Loading…" : "Select a category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-500 text-sm">Specialty</Label>
              <select
                required
                value={fields.specialtyId}
                onChange={handleSpecialtyChange}
                disabled={!fields.categoryId || specialtiesLoading}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#007CD7]/30 focus:border-[#007CD7] disabled:opacity-50"
              >
                <option value="">
                  {!fields.categoryId
                    ? "Select a category first"
                    : specialtiesLoading
                      ? "Loading…"
                      : "Select a specialty"}
                </option>
                {specialties.map((sp) => (
                  <option key={sp._id} value={sp._id}>
                    {sp.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 text-sm">
              Medical License Number
            </Label>
            <Input
              placeholder="e.g. 8h7g5d"
              required
              value={fields.medicalLicenseNumber}
              onChange={set("medicalLicenseNumber")}
              className="bg-slate-50 border-slate-200 text-slate-800"
            />
          </div>
        </div>

        {/* Document Uploads */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <FileText className="h-5 w-5 text-[#007CD7]" />
            Documents
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FileInput
              label="CV / Resume"
              file={files.cvFile}
              onChange={(f) => setFiles((p) => ({ ...p, cvFile: f }))}
            />
            <FileInput
              label="Medical License File"
              file={files.medicalLicenseFile}
              onChange={(f) =>
                setFiles((p) => ({ ...p, medicalLicenseFile: f }))
              }
            />
            <FileInput
              label="Signature"
              file={files.signature}
              onChange={(f) => setFiles((p) => ({ ...p, signature: f }))}
            />
            <FileInput
              label="Institution ID File"
              file={files.institutionIdFile}
              onChange={(f) =>
                setFiles((p) => ({ ...p, institutionIdFile: f }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/dashboard/consultants">
            <Button
              type="button"
              variant="outline"
              className="bg-white border-slate-200 text-slate-700"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isPending || !institutionId}
            className="bg-[#007CD7] hover:bg-[#0065B3] text-white font-semibold min-w-36"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Creating…
              </span>
            ) : (
              "Create Consultant"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
