"use client";
import { Separator } from "@/components/ui/separator";
import { useEventId } from "@/features/events/hooks/use-event-id";
import { useGetFullSlots } from "@/features/slots/api/use-get-full-slots";
import React from "react";

const PrintablePage = () => {
  const eventId = useEventId();

  const { data: slots } = useGetFullSlots({ eventId: eventId });

  if (!slots) return;

  return (
    <div className="print-container">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="border p-3 w-[500px] text-center">Teams</th>
            <th className="border p-3 w-[200px] text-center">Gesture Play</th>
            <th className="border p-3 w-[200px] text-center">Relevance</th>
            <th className="border p-3 w-[200px] text-center">Time Usage</th>
            <th className="border p-3 w-[150px] text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => {
            const slotMembers = slot.slotMembers.map((member) => member);

            return (
              <tr className="border" key={slot.slotId}>
                <td>
                  <div className="flex justify-start w-full h-[100px]">
                    <div className="border-r flex h-full items-center justify-center">
                      <p className="-rotate-90">Slot {slot.slotNumber}</p>
                    </div>
                    <div className="justify-center items-center flex flex-col flex-1 gap-1">
                      <div className="h-full flex justify-center gap-x-2 items-center">
                        <p>{slotMembers[0]?.fullName}</p>
                        <p className="text-sm">
                          ({slotMembers[0]?.courseYear}{" "}
                          {slotMembers[0]?.courseName})
                        </p>
                      </div>
                      <Separator className="separator" />
                      <div className="h-full flex justify-center gap-x-4 items-center">
                        <p>{slotMembers[1]?.fullName}</p>
                        <p className="text-sm">
                          ({slotMembers[1]?.courseYear}{" "}
                          {slotMembers[1]?.courseName})
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full flex items-start gap-64 border-green-500 mt-20 h-40">
        <p className="text-xl font-semibold">Judge 1: </p>
        <p className="text-xl font-semibold">Judge 2:</p>
      </div>
    </div>
  );
};

export default PrintablePage;
