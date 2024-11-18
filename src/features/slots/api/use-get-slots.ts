import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetSlots = typeof api.users.getMember._returnType;

export const useGetSlots = ({ eventId }: { eventId: Id<"events"> }) => {
  const data = useQuery(api.slots.getSlotsByEventId, { eventId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
