"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Shield,
  ShieldBan,
  ShieldCheck,
  ShieldEllipsis,
  ShieldHalf,
  SwordsIcon,
} from "lucide-react";
import Image from "next/image";

// Define the Member type
export type Winner = {
  convex_user_id: string;
  clerkImageUrl: string;
  fullName: string;
  roleType:
    | "SUPER_ADMIN"
    | "ADMIN"
    | "MODERATOR"
    | "CORE_MEMBER"
    | "MEMBER"
    | "BANNED";
  index: number;
};

// Table Columns Definition
export const columns: ColumnDef<Winner>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.clerkImageUrl}
          alt="image"
          width={50}
          height={50}
          className="border size-8 md:size-10 aspect-square rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.fullName;
      const roleType = row.original.roleType;

      return (
        <div className="flex justify-start items-center gap-1">
          {roleType === "SUPER_ADMIN" && (
            <SwordsIcon className="size-4 md:size-5 text-red-500 fill-red-500/50" />
          )}
          {roleType === "ADMIN" && (
            <ShieldHalf className="size-4 md:size-5 text-emerald-500 fill-blue-500/20" />
          )}
          {roleType === "MODERATOR" && (
            <ShieldCheck className="size-4 md:size-5 text-blue-500 fill-blue-500/20" />
          )}
          {roleType === "CORE_MEMBER" && (
            <ShieldEllipsis className="size-4 md:size-5 text-orange-500 fill-orange-500/20" />
          )}
          {roleType === "MEMBER" && (
            <Shield className="size-4 md:size-5 text-violet-500 fill-violet-500/20" />
          )}
          {roleType === "BANNED" && (
            <ShieldBan className="size-4 md:size-5 text-gray-500 fill-gray-500/20" />
          )}
          <p className="text-nowrap text-md md:text-lg truncate w-[115px] flex md:w-[150px]">
            {name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "index",
    header: "Position",
    cell: ({ row }) => {
      const position = row.original.index + 1;

      return (
        <div>
          {position === 1 && "1st"}
          {position === 2 && "2nd"}
          {position === 3 && "3rd"}
        </div>
      );
    },
  },
];
