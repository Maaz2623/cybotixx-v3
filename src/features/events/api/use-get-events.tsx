import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type GetEvents = typeof api.events.getEvents._returnType;

export const useGetEvents = () => {
  const data = useQuery(api.events.getEvents);
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
