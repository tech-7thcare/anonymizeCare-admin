"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe, type MeResponse } from "@/lib/services/auth";

export function useMe() {
  return useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
