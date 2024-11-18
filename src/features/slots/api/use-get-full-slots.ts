import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetFullSlots = typeof api.slots.getFullSlots._returnType;

export const useGetFullSlots = ({ eventId }: { eventId: Id<"events"> }) => {
  const data = useQuery(api.slots.getFullSlots, { eventId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
