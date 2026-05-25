import { api } from "@/lib/api";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface InstitutionDetail {
  _id: string;
  name: string;
  type?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  isVerified?: boolean;
  isActive?: boolean;
  freeConsultationsPerMonth?: number;
  createdAt?: string;
  updatedAt?: string;
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
  institutionRole?: string;
  institution?: string | InstitutionDetail;
  createdAt?: string;
  updatedAt?: string;
}

interface MeApiResponse {
  user: MeResponse;
  institutionStaff?: {
    _id: string;
    institution?: InstitutionDetail;
    role?: string;
    isActive?: boolean;
  };
}

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const { data } = await api.post<SignInResponse>("signin", payload);
  return data;
}

export async function getMe(): Promise<MeResponse> {
  const { data } = await api.get<MeApiResponse>("me");
  const user = data.user;
  if (data.institutionStaff?.institution) {
    user.institution = data.institutionStaff.institution;
    user.institutionRole = data.institutionStaff.role;
  }
  return user;
}
