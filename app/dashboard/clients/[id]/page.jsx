"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ClientIdRedirect() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.id) {
      router.replace(`/dashboard/clients/view/${params.id}`);
    }
  }, [params, router]);

  return null;
}
