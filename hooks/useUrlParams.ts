import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useUrlParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Lire les paramètres depuis l'URL
  const getStartTime = () => searchParams.get("start") || null;
  const getEndTime = () => searchParams.get("end") || null;

  // Mettre à jour l'URL avec les nouveaux horaires
  const updateUrl = useCallback(
    (startTime: string, endTime: string) => {
      const params = new URLSearchParams();
      params.set("start", startTime);
      params.set("end", endTime);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname]
  );

  // Générer le lien de partage
  const getShareUrl = useCallback(
    (startTime: string, endTime: string) => {
      if (typeof window === "undefined") return "";
      const params = new URLSearchParams();
      params.set("start", startTime);
      params.set("end", endTime);
      return `${window.location.origin}${pathname}?${params.toString()}`;
    },
    [pathname]
  );

  return {
    getStartTime,
    getEndTime,
    updateUrl,
    getShareUrl,
  };
}
