import React from "react";
import { DataTable } from "./data-table";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import { columns, Winner } from "./columns";
import { useGetWinnersByEventId } from "@/features/winners/api/use-get-winners-by-event-id";

const Winners = ({ eventId }: { eventId: string }) => {
  const { data: winners } = useGetWinnersByEventId({
    eventId: eventId as Id<"events">,
  });

  console.log(winners);

  if (!winners)
    return (
      <div className="min-h-40 flex justify-center items-center">
        <LoaderIcon className="size-8 text-green-500 animate-spin" />
      </div>
    );

  const formattedMembers: Winner[] = winners.map((winner, index) => ({
    convex_user_id: winner?._id as Id<"users">,
    fullName: winner?.fullName as string,
    clerkImageUrl: winner?.clerkImageUrl as string,
    roleType: winner?.roleType as Winner["roleType"],
    index: index,
  }));

  return (
    <div className="w-full">
      <DataTable data={formattedMembers} columns={columns} />
    </div>
  );
};

export default Winners;
