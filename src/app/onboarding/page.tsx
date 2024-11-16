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

  const { data, isLoading } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="h-40 flex justify-center items-center">
        <LoaderIcon className="size-10 text-green-500 animate-spin" />
      </div>
    );
  }

  if (data) {
    Cookies.set("convex_user_id", data._id, {
      expires: 7,
      path: "/",
    });

    router.replace("/events"); // Redirect if user data is found
    return;
  }

  // Render onboarding form if no user data exists
  return (
    <div className="w-full flex justify-center items-center">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
