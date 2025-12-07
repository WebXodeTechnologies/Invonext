"use client";

import { SignIn,useUser  } from "@clerk/nextjs";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {

  const { isSignedIn } = useUser();
  const router = useRouter();

  
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-linear-to-tr from-blue-500 to-purple-500 opacity-40 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-linear-to-br from-pink-400 to-yellow-400 opacity-30 blur-3xl animate-pulse"></div>
      </div>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/dashboard" />
    </div>
  );
}
