import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type useGetParticipantByMemberId =
  typeof api.participants.getParticipantByMemberId._returnType;

export const useGetParticipantByMemberId = ({
  convex_user_id,
  eventId,
}: {
  convex_user_id: Id<"users">;
  eventId: Id<"events">;
}) => {
  const data = useQuery(api.participants.getParticipantByMemberId, {
    convex_user_id,
    eventId,
  });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
