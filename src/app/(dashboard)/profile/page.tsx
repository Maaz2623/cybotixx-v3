"use client";
import React from "react";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import ProfileForm from "./_components/profile-form";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const { userId } = useAuth();

  const router = useRouter();

  const { data: currentUser, isLoading: currentUserLoading } =
    useGetUserByClerkId({
      clerkId: userId as string,
    });

  if (!currentUserLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <LoaderIcon className="text-blue-500 size-8 animate-spin" />
      </div>
    );

  if (!currentUser) {
    return router.push("/onboarding");
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex justify-center items-center ">
          <ProfileForm
            fullName={currentUser.fullName}
            registerNumber={currentUser.registerNumber}
            courseName={currentUser.courseName}
            courseYear={currentUser.courseYear}
            phoneNumber={currentUser.phoneNumber}
            clerkId={currentUser.clerkId as string}
            clerkImageUrl={currentUser.clerkImageUrl}
            prizesWon={currentUser.prizesWon}
            participations={currentUser.participations}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfilePage;
