"use client";
import React from "react";
import OnboardingForm from "../../components/onboarding-form";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const { userId } = useAuth();

  const router = useRouter();

  const { data, isLoading } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  if (isLoading) {
    return (
      <div className="h-40 flex justify-center items-center">
        <LoaderIcon className="size-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!userId) {
    return null;
  }

  if (data) {
    Cookies.set("convex_user_id", data._id, {
      expires: 7,
      path: "/",
    });
    router.replace("/events");
  }

  if (data) {
    return null;
  }
  // Render onboarding form if no user data exists
  return (
    <div className="w-full flex justify-center items-center">
      <OnboardingForm userId={userId} />
    </div>
  );
};

export default OnboardingPage;
