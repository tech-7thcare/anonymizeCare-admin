import { api } from "@/lib/api";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface MeResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  userType?: string;
  isUserAnonymous?: boolean;
  isStudent?: boolean;
  walletBalance?: number;
  isEmailVerified?: boolean;
  isDeleted?: boolean;
  timezone?: string;
  acceptedTerms?: boolean;
  institutionId?: string;
  institution?: string | { _id: string; name?: string };
  createdAt?: string;
  updatedAt?: string;
}

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const { data } = await api.post<SignInResponse>("signin", payload);
  return data;
}

export async function getMe(): Promise<MeResponse> {
  const { data } = await api.get<{ user: MeResponse }>("me");
  return data.user;
}
