"use client";
import React from "react";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import ProfileForm from "./_components/profile-form";
import { AnimatePresence, motion } from "framer-motion";
const ProfilePage = () => {
  const { userId } = useAuth();

  const { data } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  if (!data) return;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex justify-center items-center">
          <ProfileForm
            fullName={data.fullName}
            registerNumber={data.registerNumber}
            courseName={data.courseName}
            courseYear={data.courseYear}
            phoneNumber={data.phoneNumber}
            clerkId={data.clerkId}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfilePage;
