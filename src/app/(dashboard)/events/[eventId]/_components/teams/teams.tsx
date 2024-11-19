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
import { columns, Member } from "./columns";
import { DataTable } from "./data-table";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Teams = ({ eventId }: { eventId: string }) => {
  const { data } = useGetFullSlots({ eventId: eventId as Id<"events"> });
  const { data: event } = useGetEventById({ eventId: eventId as Id<"events"> });

  if (!event) return;

  if (!data) return;

  return (
    <div className="min-h-screen border w-full">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-xl md:text-2xl p-5 font-semibold flex items-center gap-2 justify-center">
          <p>{data.length} Slot(s) full</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="ml-2 size-4 cursor-pointer hover:text-gray-600 transition-all duration-300" />
              </TooltipTrigger>
              <TooltipContent>
                <p>When slots are full, They Appear here</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>
      </div>
      <div className="border flex flex-wrap justify-center items-start gap-x-4 p-4 gap-y-6 md:p-14">
        {data.map(({ slotNumber, slotId, slotMembers }) => {
          const formattedSlotMembers: Member[] = slotMembers.map(
            (member, index) => {
              return {
                convex_user_id: member?._id as Id<"users">,
                clerkImageUrl: member?.clerkImageUrl as string,
                fullName: member?.fullName as string,
                roleType: member?.roleType as Member["roleType"],
                index,
              };
            }
          );

          return (
            <Dialog key={slotId}>
              <DialogTrigger asChild>
                <Button className="border-primary border text-white rounded-md bg-primary/50 w-20 h-8 flex justify-center text-xs md:text-sm items-center">
                  Slot {slotNumber}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-md">
                <DialogHeader>
                  <DialogTitle className="flex w-full items-center justify-center gap-2">
                    <>
                      <p>Slot {slotNumber}</p>
                      <p className="text-gray-400">
                        ( {slotMembers.length}/{event.eventTeamMaxMembers} )
                      </p>
                    </>
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="w-full space-y-3">
                  <DataTable data={formattedSlotMembers} columns={columns} />
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;
