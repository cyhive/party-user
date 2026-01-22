"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mountain, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/admin/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully");
      setTimeout(() => router.push("/admin/login"), 1500);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-orange-400 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl p-8 space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Mountain className="h-9 w-9 text-red-600" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              CPI(M) Kaithode
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            Create an admin account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded text-sm text-center">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="admin@gmail.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-2.5 text-white font-semibold text-lg hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-red-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
