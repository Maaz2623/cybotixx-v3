import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetMemberByConvexId = typeof api.users.getMember._returnType;

export const useGetMemberByConvexId = ({
  convex_user_id,
}: {
  convex_user_id: Id<"users">;
}) => {
  const data = useQuery(api.users.getMember, { convex_user_id });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
