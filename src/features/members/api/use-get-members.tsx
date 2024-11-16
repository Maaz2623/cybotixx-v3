import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type GetMembers = typeof api.users.getMembers._returnType;

export const useGetMembers = () => {
  const data = useQuery(api.users.getMembers);
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
