import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetSlotByEventIdMemberId =
  typeof api.slots.getSlotByEventIdMemberId._returnType;

export const useGetSlotsByEventIdMemberId = ({
  eventId,
  memberId,
}: {
  eventId: Id<"events">;
  memberId: Id<"users">;
}) => {
  const data = useQuery(api.slots.getSlotByEventIdMemberId, {
    eventId,
    memberId,
  });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
