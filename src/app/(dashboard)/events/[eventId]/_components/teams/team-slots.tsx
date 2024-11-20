import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEventId } from "@/features/events/hooks/use-event-id";
import { useGetSlots } from "@/features/slots/api/use-get-slots";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { Check, CheckIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJoinSlot } from "@/features/slots/api/use-join-slot";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { columns, Member } from "./columns";
import { useGetEventById } from "@/features/events/api/use-get-event-by-id";
import { useGetParticipantByMemberId } from "@/features/participants/api/use-get-participant-by-member-id";
import { cn } from "@/lib/utils";
import { useGetSlotsByEventIdMemberId } from "@/features/slots/api/use-get-slot-by-event-id-member-id";

const TeamSlots = () => {
  const eventId = useEventId();
  const { userId } = useAuth();

  // Use a map to store open state for each dialog by slot number
  const [openSlotDialog, setOpenSlotDialog] = useState<{
    [key: number]: boolean;
  }>({});
  const [openParentDialog, setOpenParentDialog] = useState(false);
  const { data: slots } = useGetSlots({ eventId: eventId as Id<"events"> });
  const { data: member } = useGetUserByClerkId({ clerkId: userId as string });
  const { data: members } = useGetMembers();
  const { data: event } = useGetEventById({ eventId: eventId });
  const { data: participant } = useGetParticipantByMemberId({
    convex_user_id: member?._id as Id<"users">,
    eventId: eventId,
  });
  const { mutate } = useJoinSlot();

  const [loading, setLoading] = useState(false);

  const { data: joinedSlot } = useGetSlotsByEventIdMemberId({
    eventId: eventId,
    memberId: member?._id as Id<"users">,
  });

  if (!slots || !member || !members || !event) {
    return (
      <div className="h-28 w-full flex justify-center items-center">
        <LoaderIcon className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  const formattedMembers: Member[] = members
    .filter(
      (member): member is NonNullable<typeof member> =>
        member !== null && member !== undefined
    )
    .map((member, index) => ({
      convex_user_id: member._id as Id<"users">,
      fullName: member.fullName as string,
      clerkImageUrl: member.clerkImageUrl as string,
      roleType: member.roleType as Member["roleType"],
      index,
    }));

  const handleJoin = ({ slotNumber }: { slotNumber: number }) => {
    setLoading(true);
    mutate(
      {
        eventId: eventId as Id<"events">,
        memberId: member._id,
        slotNumber: slotNumber,
      },
      {
        onSuccess(data) {
          toast.success(`Joined slot ${data}`);
          // Close both dialogs after joining
          setOpenSlotDialog((prevState) => ({
            ...prevState,
            [slotNumber]: false,
          }));
          setOpenParentDialog(false);
        },
        onError() {
          toast.error("Some Error Occured");
        },
      }
    );
  };

  return (
    <Dialog open={openParentDialog} onOpenChange={setOpenParentDialog}>
      <DialogTrigger asChild>
        <Button
          disabled={!!participant}
          className={cn(
            "h-8 text-xs md:text-sm w-[80px] md:w-[100px] bg-primary/50 hover:bg-primary/70 border-blue-600 border text-white",
            !!participant && "hidden"
          )}
        >
          {participant && (
            <div className="flex items-center px-2 gap-1">
              <Check className="size-4 text-blue-200" />
              <p className="text-xs">Joined</p>
            </div>
          )}
          {!participant && "Participate"}
        </Button>
      </DialogTrigger>
      {!!participant && (
        <Button
          disabled
          className="border-primary border text-white bg-primary/50 w-[100px] text-sm md:text-sm rounded-md"
        >
          <CheckIcon className="size-3" />
          <p className="text-xs">
            Slot {joinedSlot?.slotNumber} ({joinedSlot?.slotMembers.length}/
            {event.eventTeamMaxMembers})
          </p>
        </Button>
      )}
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Join a Team</DialogTitle>
        </DialogHeader>

        <ScrollArea className="border h-60 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
            {slots.map((slot) => {
              const membersInSlot = slot.slotMembers;
              const membersInEvent = formattedMembers.filter(
                (member) => member.convex_user_id
              );

              const membersExistInSlot = membersInEvent.filter((member) =>
                membersInSlot.includes(member.convex_user_id as Id<"users">)
              );

              const isSlotFull =
                event.eventTeamMaxMembers === slot.slotMembers.length;

              return (
                <Dialog
                  key={slot._id}
                  open={openSlotDialog[slot.slotNumber] || false} // Check if specific slot dialog is open
                  onOpenChange={(open) =>
                    setOpenSlotDialog((prevState) => ({
                      ...prevState,
                      [slot.slotNumber]: open,
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <Button className="border p-2 text-sm text-white text-center border-primary bg-primary/40 flex justify-center items-center rounded-md">
                      {isSlotFull ? (
                        <p className="text-xs">
                          Slot {slot.slotNumber} ({slot.slotMembers.length}/
                          {event.eventTeamMaxMembers})
                        </p>
                      ) : (
                        <p className="text-xs">
                          Slot {slot.slotNumber} ({slot.slotMembers.length}/
                          {event.eventTeamMaxMembers})
                        </p>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Join Slot {slot.slotNumber}</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. Decide you partner and slot before joining.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full space-y-3 overflow-auto">
                      <DataTable data={membersExistInSlot} columns={columns} />
                      <div className="flex justify-end items-center">
                        <Button
                          disabled={loading || isSlotFull}
                          className="border-primary bg-primary/50 text-white"
                          onClick={() =>
                            handleJoin({ slotNumber: slot.slotNumber })
                          }
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TeamSlots;
