"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAccessCodes, type FetchAccessCodesResponse } from "@/lib/services/access-codes";

export function useAccessCodes() {
  return useQuery<FetchAccessCodesResponse>({
    queryKey: ["access-codes"],
    queryFn: fetchAccessCodes,
  });
}
