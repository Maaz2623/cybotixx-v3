import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetWinnersByEventId =
  typeof api.winners.getWinnersByEventId._returnType;

export const useGetWinnersByEventId = ({
  eventId,
}: {
  eventId: Id<"events">;
}) => {
  const data = useQuery(api.winners.getWinnersByEventId, {
    eventId,
  });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
