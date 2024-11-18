import React from "react";
import { DataTable } from "./data-table";
import { useGetParticipantsByEventId } from "@/features/participants/api/use-get-participants";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { columns, Member } from "./columns";

const Participants = ({ eventId }: { eventId: string }) => {
  const { data: participants } = useGetParticipantsByEventId({
    eventId: eventId as Id<"events">,
  });

  if (!participants) return <div>Loading...</div>;

  if (participants.length === 0)
    return (
      <div className="w-full h-40 flex justify-center">
        <p>No Participants</p>
      </div>
    );

  const formattedParticipants: Member[] = participants
    .filter(
      (participant): participant is NonNullable<typeof participant> =>
        participant !== null && participant !== undefined
    ) // Type guard to exclude null/undefined
    .map((participant, index) => ({
      convex_user_id: participant._id as Id<"users">,
      fullName: participant.fullName as string,
      clerkImageUrl: participant.clerkImageUrl as string,
      roleType: participant.roleType as Member["roleType"],
      index,
    }));

  return (
    <div className="w-full min-h-screen">
      <DataTable data={formattedParticipants} columns={columns} />
    </div>
  );
};

export default Participants;
