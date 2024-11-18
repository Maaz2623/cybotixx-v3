import React from "react";
import { DataTable } from "./data-table";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { columns, Winner } from "./columns";
import { useGetWinnersByEventId } from "@/features/winners/api/use-get-winners-by-event-id";

const Winners = ({ eventId }: { eventId: string }) => {
  const { data: winners } = useGetWinnersByEventId({
    eventId: eventId as Id<"events">,
  });

  if (!winners) return null;

  if (winners.length === 0) return;

  const formattedMembers: Winner[] = winners
    .filter(
      (winner): winner is NonNullable<typeof winner> =>
        winner !== null && winner !== undefined
    ) // Type guard to exclude null/undefined
    .map((winner, index) => ({
      convex_user_id: winner._id as Id<"users">,
      fullName: winner.fullName as string,
      clerkImageUrl: winner.clerkImageUrl as string,
      roleType: winner.roleType as Winner["roleType"],
      index,
    }));

  return (
    <div className="w-full">
      <DataTable data={formattedMembers} columns={columns} />
    </div>
  );
};

export default Winners;
