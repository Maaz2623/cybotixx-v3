"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  AwardIcon,
  Shield,
  ShieldBan,
  ShieldCheck,
  ShieldEllipsis,
  ShieldHalf,
  SwordsIcon,
  TrophyIcon,
} from "lucide-react";
import Image from "next/image";

// Define the Member type
export type Winner = {
  winnerPosition: number;
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
      const position = row.original.winnerPosition;

      return (
        <div>
          {position === 1 && (
            <div className="flex gap-1 justify-start items-center">
              <TrophyIcon className="text-yellow-600 " />
              <p className="text-lg font-semibold">1st</p>
            </div>
          )}
          {position === 2 && (
            <div className="flex gap-1 justify-start items-center">
              <AwardIcon className="text-gray-300" />
              <p className="text-lg font-semibold">2nd</p>
            </div>
          )}
          {position === 3 && (
            <div className="flex gap-1 justify-start items-center">
              <AwardIcon className="text-amber-900" />
              <p className="text-lg font-semibold">3rd</p>
            </div>
          )}
        </div>
      );
    },
  },
];
