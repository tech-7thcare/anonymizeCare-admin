"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchInstitutionConsultants,
  type ConsultantsListResponse,
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
