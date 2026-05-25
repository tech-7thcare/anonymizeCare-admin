import { api } from "@/lib/api";

export interface AccessCode {
  _id: string;
  institution: string;
  code: string;
  createdBy: string;
  isUsed: boolean;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  usedAt?: string;
  usedBy?: {
    _id: string;
    nickname?: string;
    email?: string;
  };
}

export interface CreateAccessCodesPayload {
  count: number;
  expiresAt: string; // ISO string
}

export interface CreateAccessCodesResponse {
  success: boolean;
  message: string;
  count: number;
  data: AccessCode[];
}

export interface FetchAccessCodesResponse {
  success: boolean;
  message: string;
  data: AccessCode[];
}

export async function createAccessCodes(
  payload: CreateAccessCodesPayload,
): Promise<CreateAccessCodesResponse> {
  const { data } = await api.post<CreateAccessCodesResponse>(
    "institutions/access-codes",
    payload,
  );
  return data;
}

export async function fetchAccessCodes(): Promise<FetchAccessCodesResponse> {
  const { data } = await api.get<FetchAccessCodesResponse>(
    "institutions/access-codes",
  );
  return data;
}

export async function deleteAccessCodes(
  accessCodes: string[],
): Promise<{ success: boolean; message: string }> {
  const { data } = await api.delete<{ success: boolean; message: string }>(
    "institutions/access-codes",
    { data: { accessCodes } },
  );
  return data;
}

export async function deactivateAccessCodes(
  accessCodes: string[],
): Promise<{ success: boolean; message: string }> {
  const { data } = await api.post<{ success: boolean; message: string }>(
    "institutions/access-codes/deactivate",
    { accessCodes },
  );
  return data;
}
