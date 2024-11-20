"use client";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns, Member } from "./_components/columns";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { LoaderIcon } from "lucide-react";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const MembersPage = () => {
  const { userId } = useAuth();
  const { data: members, isLoading: membersLoading } = useGetMembers();
  const router = useRouter();

  const { data: currentUser, isLoading: currentUserLoading } =
    useGetUserByClerkId({
      clerkId: userId as string,
    });
  if (!members) return;

  const formattedMembers: Member[] = members.map((member) => ({
    convex_user_id: member._id as string,
    fullName: member.fullName,
    clerkImageUrl: member.clerkImageUrl,
    roleType: member.roleType as Member["roleType"],
  }));

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
    <div className="w-full p-5 mt-10 max-h-screen">
      {membersLoading ? (
        <div className="w-full h-20 flex justify-center items-center">
          <LoaderIcon className="text-blue-500 size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={formattedMembers} />
      )}
    </div>
  );
};

export default MembersPage;
