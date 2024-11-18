import { useGetFullSlots } from "@/features/slots/api/use-get-full-slots";
import React from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { useGetEventById } from "@/features/events/api/use-get-event-by-id";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Teams = ({ eventId }: { eventId: string }) => {
  const { data } = useGetFullSlots({ eventId: eventId as Id<"events"> });
  const { data: event } = useGetEventById({ eventId: eventId as Id<"events"> });

  if (!event) return;

  if (!data) return;

  const fullSlots = data.slots.filter(
    (slot) => slot.members.length >= event.eventTeamMaxMembers
  );

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen border w-full">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-xl md:text-2xl p-5 font-semibold">
          {fullSlots.length} Slot(s) Full
        </h1>
      </div>
      <div className="border flex flex-wrap justify-center items-start gap-x-4 p-4 gap-y-6 md:p-14">
        {fullSlots.map((slot) => {
          return (
            <Dialog key={slot.slotId}>
              <DialogTrigger asChild>
                <Button className="border-primary border text-white rounded-md bg-primary/50 w-20 h-8 flex justify-center text-xs md:text-sm items-center">
                  Slot {slot.slotNumber}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-md">
                <DialogHeader>
                  <DialogTitle>Join Slot {slot.slotNumber}</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                {/* <div className="w-full space-y-3">
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
                </div> */}
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;
