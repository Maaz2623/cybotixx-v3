"use client";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns, Member } from "./_components/columns";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { LoaderIcon } from "lucide-react";

const MembersPage = () => {
  const { data: members, isLoading: membersLoading } = useGetMembers();
  if (!members) return;

  const formattedMembers: Member[] = members.map((member) => ({
    convex_user_id: member._id as string,
    fullName: member.fullName,
    clerkImageUrl: member.clerkImageUrl,
    roleType: member.roleType as Member["roleType"],
  }));
  return (
    <div className="w-full p-5 mt-10 max-h-screen">
      {membersLoading ? (
        <div className="w-full h-20 flex justify-center items-center">
          <LoaderIcon className="text-green-500 size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={formattedMembers} />
      )}
    </div>
  );
};

export default MembersPage;
