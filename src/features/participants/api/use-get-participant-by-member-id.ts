import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type useGetParticipantByMemberId =
  typeof api.participants.getParticipantByMemberId._returnType;

export const useGetParticipantByMemberId = ({
  convex_user_id,
}: {
  convex_user_id: Id<"users">;
}) => {
  const data = useQuery(api.participants.getParticipantByMemberId, {
    convex_user_id,
  });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
