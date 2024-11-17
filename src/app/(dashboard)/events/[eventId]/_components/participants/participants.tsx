import React from "react";
import { DataTable } from "./data-table";
import { useGetParticipantsByEventId } from "@/features/participants/api/use-get-participants";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { columns, Member } from "./columns";
import { LoaderIcon } from "lucide-react";

const Participants = ({ eventId }: { eventId: string }) => {
  const { data: participants } = useGetParticipantsByEventId({
    eventId: eventId as Id<"events">,
  });

  if (!participants)
    return (
      <div className="min-h-40 flex justify-center items-center">
        <LoaderIcon className="size-8 text-green-500 animate-spin" />
      </div>
    );

  const formattedMembers: Member[] = participants.map((participant) => ({
    convex_user_id: participant?._id as Id<"users">,
    fullName: participant?.fullName as string,
    clerkImageUrl: participant?.clerkImageUrl as string,
    roleType: participant?.roleType as Member["roleType"],
  }));

  return (
    <div className="w-full">
      <DataTable data={formattedMembers} columns={columns} />
    </div>
  );
};

export default Participants;
