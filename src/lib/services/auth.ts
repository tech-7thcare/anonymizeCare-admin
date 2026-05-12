import { api } from "@/lib/api";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface MeResponse {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const { data } = await api.post<SignInResponse>("signin", payload);
  return data;
}

export async function getMe(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("me");
  return data;
}
