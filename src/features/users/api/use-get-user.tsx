import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type GetUserByClerkId = typeof api.users.getUserByClerkId._returnType;

export const useGetUserByClerkId = ({ clerkId }: { clerkId: string }) => {
  const data = useQuery(api.users.getUserByClerkId, { clerkId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
