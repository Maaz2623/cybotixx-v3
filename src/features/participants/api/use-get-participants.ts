import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetParticipantsByEventId = typeof api.users.getMember._returnType;

export const useGetParticipantsByEventId = ({
  eventId,
}: {
  eventId: Id<"events">;
}) => {
  const data = useQuery(api.participants.getParticipants, { eventId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
