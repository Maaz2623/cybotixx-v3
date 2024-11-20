"use client";
import React, { useEffect, useState } from "react";
import OnboardingForm from "../../components/onboarding-form";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data: userData, isLoading } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  useEffect(() => {
    if (userData) {
      setIsRedirecting(true);
      router.replace("/events");
    }
  }, [userData, router]);

  // Show loader if user data is loading or redirection is in progress
  if (isLoading || !userId || isRedirecting) {
    return (
      <div className="h-40 flex justify-center items-center">
        <LoaderIcon className="size-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Render onboarding form only if user data doesn't exist
  return (
    <div className="w-full flex justify-center items-center">
      <OnboardingForm userId={userId} />
    </div>
  );
};

export default OnboardingPage;
