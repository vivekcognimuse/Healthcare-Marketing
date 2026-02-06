"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth/admin-auth";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    setIsAuthorized(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="typography-p2 text-black/60">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
