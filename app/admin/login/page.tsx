"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isAdminAuthenticated, setAdminAuthenticated, verifyAdminCredentials } from "@/lib/auth/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [readonlyRemoved, setReadonlyRemoved] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    if (isAdminAuthenticated()) {
      setIsAuthenticated(true);
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Verify credentials
    if (verifyAdminCredentials(username, password)) {
      // Set authentication
      setAdminAuthenticated();
      
      // Redirect to admin dashboard
      router.push("/admin");
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <>
      <Header />
      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 relative pt-20 sm:pt-24 lg:pt-28"
        style={{
          background: 'linear-gradient(180deg, #001B57 0%, #155DFC 50%, #FFFFFF 100%)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg p-8 sm:p-10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="typography-h2 text-black mb-3">Admin Access</h1>
              <p className="typography-p2 text-black/60">
                Secure dashboard for managing events and bookings
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="typography-p2 text-red-700 flex-1">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              {/* Hidden fields to prevent browser autofill */}
              <input type="text" name="fake-username" autoComplete="off" style={{ display: 'none' }} tabIndex={-1} />
              <input type="password" name="fake-password" autoComplete="off" style={{ display: 'none' }} tabIndex={-1} />
              
              {/* Username Field */}
              <div>
                <label 
                  htmlFor="username" 
                  className="flex items-center gap-2 typography-p2 text-black mb-3 font-semibold"
                >
                  <div className="p-1.5 bg-primary/10 rounded">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  onFocus={() => {
                    if (!readonlyRemoved) {
                      setReadonlyRemoved(true);
                    }
                  }}
                  disabled={loading}
                  readOnly={!readonlyRemoved}
                  required
                  className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-black/20"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  autoFocus
                />
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="flex items-center gap-2 typography-p2 text-black mb-3 font-semibold"
                >
                  <div className="p-1.5 bg-primary/10 rounded">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  onFocus={() => {
                    if (!readonlyRemoved) {
                      setReadonlyRemoved(true);
                    }
                  }}
                  disabled={loading}
                  readOnly={!readonlyRemoved}
                  required
                  className="w-full px-4 py-3.5 rounded-lg border-2 border-black/10 bg-white text-black typography-p2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-black/20"
                  autoComplete="new-password"
                  data-lpignore="true"
                  data-form-type="other"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-secondary typography-btn2 py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Authenticating...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-black/10">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-black/40" />
                <p className="typography-footnote text-black/60 text-center">
                  Protected admin area
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-6 text-center">
            <p className="typography-footnote text-white/80">
              Authorized personnel only
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
