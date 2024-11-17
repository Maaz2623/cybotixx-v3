import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetEventById = typeof api.events.getEventById._returnType;

export const useGetEventById = ({
  eventId,
}: {
  eventId: Id<"events">;
}) => {
  const data = useQuery(api.events.getEventById, { eventId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
