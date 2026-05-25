"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchInstitutionConsultants,
  fetchConsultantCategories,
  fetchConsultantSpecialties,
  fetchAllConsultants,
  type ConsultantsListResponse,
  type ConsultantCategoriesResponse,
  type ConsultantSpecialtiesResponse,
} from "@/lib/services/consultants";

export function useInstitutionConsultants(
  institutionId: string | undefined,
  page = 1,
  limit = 10,
) {
  return useQuery<ConsultantsListResponse>({
    queryKey: ["consultants", institutionId, page, limit],
    queryFn: () => fetchInstitutionConsultants(institutionId!, page, limit),
    enabled: !!institutionId,
  });
}

export function useConsultantCategories() {
  return useQuery<ConsultantCategoriesResponse>({
    queryKey: ["consultant-categories"],
    queryFn: fetchConsultantCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useConsultantSpecialties(categoryId: string | undefined) {
  return useQuery<ConsultantSpecialtiesResponse>({
    queryKey: ["consultant-specialties", categoryId],
    queryFn: () => fetchConsultantSpecialties(categoryId!),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllConsultants() {
  return useQuery<ConsultantsListResponse>({
    queryKey: ["all-consultants"],
    queryFn: fetchAllConsultants,
  });
}
