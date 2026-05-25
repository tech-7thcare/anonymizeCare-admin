import { api } from "@/lib/api";

// --- Types ---

export interface ConsultantUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  userType?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
}

export interface ConsultantCategory {
  _id: string;
  value: string;
  label: string;
}

export interface ConsultantSpecialty {
  _id: string;
  value: string;
  label: string;
  category?: string;
}

export interface ConsultantCategoryWithSpecialties {
  _id: string;
  value: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
  specialties: { _id: string; label: string; value: string }[];
}

export interface ConsultantCategoriesResponse {
  success: boolean;
  count: number;
  data: ConsultantCategoryWithSpecialties[];
}

export interface ConsultantSpecialtyDetail {
  _id: string;
  value: string;
  label: string;
  category?: { _id: string; value: string; label: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface ConsultantSpecialtiesResponse {
  success: boolean;
  count: number;
  data: ConsultantSpecialtyDetail[];
}

export interface Consultant {
  _id: string;
  id?: string;
  user: ConsultantUser;
  category: ConsultantCategory | string;
  specialty: ConsultantSpecialty | string;
  medicalLicenseNumber: string;
  medicalLicenseFile?: string;
  cvFile?: string;
  signature?: string;
  institutionIdFile?: string;
  numberOfConsultations: number;
  hourlyRate: number;
  numberOfStudentSessions: number;
  rating: number;
  numberOfReviews: number;
  currency: string;
  availabilityType: string;
  isConsultantVerified: boolean;
  isConsultantDeleted?: boolean;
  state?: string;
  country?: string;
  institution?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConsultantsPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
}

export interface ConsultantsListResponse {
  message: string;
  data: Consultant[];
  pagination: ConsultantsPagination;
}

export interface CreateConsultantPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  categoryId: string;
  specialtyId: string;
  medicalLicenseNumber: string;
  institutionId: string;
  cvFile?: File | null;
  medicalLicenseFile?: File | null;
  signature?: File | null;
  institutionIdFile?: File | null;
}

export interface CreateConsultantResponse {
  status: boolean;
  message: string;
  data: {
    consultant: Record<string, unknown>;
    workExperiences: unknown[];
  };
}

// --- API Functions ---

export async function fetchConsultantCategories(): Promise<ConsultantCategoriesResponse> {
  const { data } = await api.get<ConsultantCategoriesResponse>("consultant-category");
  return data;
}

export async function fetchConsultantSpecialties(
  categoryId: string,
): Promise<ConsultantSpecialtiesResponse> {
  const { data } = await api.get<ConsultantSpecialtiesResponse>(
    `consultant-specialty/${categoryId}`,
  );
  return data;
}

export async function fetchAllConsultants(): Promise<ConsultantsListResponse> {
  const { data } = await api.get<ConsultantsListResponse>(
    "consultant/all-consultants",
  );
  return data;
}

export async function fetchInstitutionConsultants(
  institutionId: string,
  page = 1,
  limit = 10,
): Promise<ConsultantsListResponse> {
  const { data } = await api.get<ConsultantsListResponse>(
    `institutions/${institutionId}/consultants`,
    { params: { page, limit } },
  );
  return data;
}

export async function createInstitutionConsultant(
  payload: CreateConsultantPayload,
): Promise<CreateConsultantResponse> {
  const form = new FormData();
  form.append("firstName", payload.firstName);
  form.append("lastName", payload.lastName);
  form.append("email", payload.email);
  form.append("phoneNumber", payload.phoneNumber);
  form.append("password", payload.password);
  form.append("categoryId", payload.categoryId);
  form.append("specialtyId", payload.specialtyId);
  form.append("medicalLicenseNumber", payload.medicalLicenseNumber);
  form.append("institutionId", payload.institutionId);
  if (payload.cvFile) form.append("cvFile", payload.cvFile);
  if (payload.medicalLicenseFile)
    form.append("medicalLicenseFile", payload.medicalLicenseFile);
  if (payload.signature) form.append("signature", payload.signature);
  if (payload.institutionIdFile)
    form.append("institutionIdFile", payload.institutionIdFile);

  const { data } = await api.post<CreateConsultantResponse>(
    "institutions/consultants",
    form,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}
