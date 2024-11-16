"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  IdCard,
  MoreHorizontal,
  Shield,
  ShieldBan,
  ShieldCheck,
  ShieldEllipsis,
  ShieldHalf,
  SwordsIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Id } from "../../../../../convex/_generated/dataModel";
import MemberCard from "./member-card";
import { toast } from "sonner";
import { useAssignRoleType } from "@/features/members/api/use-assign-role-type";
import { useGetMemberByConvexId } from "@/features/members/api/use-get-member-by-convex-id";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";

// Define the Member type
export type Member = {
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
  registerNumber: string;
};

// Actions Column Wrapper Component
// const ActionsCell = ({ clerkId }: { clerkId: Id<"users"> }) => {
//   const { mutate } = useAssignRoleType();

//   const {userId} = useAuth()

//   const { data } = useGetUserByClerkId({ clerkId });

//   if (!data) return;

//   console.log(data.roleType)

//   return (
//     <Dialog>
//       <DialogHeader>
//         <DialogTitle>
//           <DialogDescription></DialogDescription>
//         </DialogTitle>
//       </DialogHeader>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DialogTrigger asChild>
//             <DropdownMenuItem>
//               <IdCard className="size-6" />
//               Show Card
//             </DropdownMenuItem>
//           </DialogTrigger>
//           <DropdownMenuSeparator />

//           {(data.roleType === "SUPER_ADMIN" || data.roleType === "ADMIN") && (
//             <>
//               <DropdownMenuLabel>Assign Roles</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               {data.roleType === "SUPER_ADMIN" && (
//                 <DropdownMenuItem
//                   onClick={() => {
//                     mutate({ convex_user_id, roleType: "ADMIN" });
//                     toast.success("Role assigned successfully");
//                   }}
//                 >
//                   <ShieldHalf className="size-4 md:size-5 text-emerald-500 fill-green-500/20" />
//                   Admin
//                 </DropdownMenuItem>
//               )}
//               <DropdownMenuItem
//                 onClick={() => {
//                   mutate({ convex_user_id, roleType: "MODERATOR" });
//                   toast.success("Role assigned successfully");
//                 }}
//               >
//                 <ShieldCheck className="size-4 md:size-5 text-blue-500 fill-blue-500/20" />
//                 Moderator
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   mutate({ convex_user_id, roleType: "CORE_MEMBER" });
//                   toast.success("Role assigned successfully");
//                 }}
//               >
//                 <ShieldEllipsis className="size-4 md:size-5 text-orange-500 fill-orange-500/20" />
//                 Core Member
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   mutate({ convex_user_id, roleType: "MEMBER" });
//                   toast.success("Role assigned successfully");
//                 }}
//               >
//                 <Shield className="size-4 md:size-5 text-violet-500 fill-violet-500/20" />
//                 Member
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   mutate({ convex_user_id, roleType: "BANNED" });
//                   toast.success("Role assigned successfully");
//                 }}
//               >
//                 <ShieldBan className="size-4 md:size-5 text-gray-500 fill-gray-500/20" />
//                 Ban Member
//               </DropdownMenuItem>
//             </>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <MemberCard convex_user_id={convex_user_id} />
//     </Dialog>
//   );
// };

const ActionsCell = ({ convex_user_id }: { convex_user_id: Id<"users"> }) => {
  const { userId } = useAuth();
  const { data: currentUser } = useGetUserByClerkId({
    clerkId: userId as string,
  });
  const { data: member } = useGetMemberByConvexId({ convex_user_id });

  const { mutate } = useAssignRoleType();

  if (!currentUser) return null;

  if (!member) return null;

  return (
    <Dialog>
      <DialogHeader>
        <DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogTitle>
      </DialogHeader>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <IdCard className="size-6" />
              Show Card
            </DropdownMenuItem>
          </DialogTrigger>

          {(currentUser.roleType === "SUPER_ADMIN" ||
            currentUser.roleType === "ADMIN") &&
            member.roleType !== "SUPER_ADMIN" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Promote</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currentUser.roleType === "SUPER_ADMIN" && (
                  <DropdownMenuItem
                    onClick={() => {
                      mutate({ convex_user_id, roleType: "ADMIN" });
                      toast.success("Role assigned successfully");
                    }}
                  >
                    <ShieldHalf className="size-4 md:size-5 text-emerald-500 fill-green-500/20" />
                    Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    mutate({ convex_user_id, roleType: "MODERATOR" });
                    toast.success("Role assigned successfully");
                  }}
                >
                  <ShieldCheck className="size-4 md:size-5 text-blue-500 fill-blue-500/20" />
                  Moderator
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    mutate({ convex_user_id, roleType: "CORE_MEMBER" });
                    toast.success("Role assigned successfully");
                  }}
                >
                  <ShieldEllipsis className="size-4 md:size-5 text-orange-500 fill-orange-500/20" />
                  Core Member
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    mutate({ convex_user_id, roleType: "MEMBER" });
                    toast.success("Role assigned successfully");
                  }}
                >
                  <Shield className="size-4 md:size-5 text-violet-500 fill-violet-500/20" />
                  Member
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    mutate({ convex_user_id, roleType: "BANNED" });
                    toast.success("Role assigned successfully");
                  }}
                >
                  <ShieldBan className="size-4 md:size-5 text-gray-500 fill-gray-500/20" />
                  Ban Member
                </DropdownMenuItem>
              </>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
      <MemberCard convex_user_id={convex_user_id} />
    </Dialog>
  );
};

// Table Columns Definition
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "registerNumber",
    header: "",
    cell: () => null,
  },
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
            <ShieldHalf className="size-4 md:size-5 text-emerald-500 fill-green-500/20" />
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const convex_user_id = row.original.convex_user_id as Id<"users">;
      return <ActionsCell convex_user_id={convex_user_id} />;
    },
  },
];
