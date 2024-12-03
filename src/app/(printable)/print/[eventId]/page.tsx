"use client";
import { Separator } from "@/components/ui/separator";
import { useGetEventById } from "@/features/events/api/use-get-event-by-id";
import { useEventId } from "@/features/events/hooks/use-event-id";
import { useGetParticipantsByEventId } from "@/features/participants/api/use-get-participants";
import { useGetFullSlots } from "@/features/slots/api/use-get-full-slots";
import React from "react";

const PrintablePage = () => {
  const eventId = useEventId();

  const { data: slots } = useGetFullSlots({ eventId: eventId });

  const { data: event } = useGetEventById({ eventId: eventId });

  const { data: participants } = useGetParticipantsByEventId({
    eventId: eventId,
  });

  if (!slots || !event) return;

  if (!participants) return;

  return (
    <div className="print-container">
      <table className="w-full border-collapse">
        {event.eventName === "Pretense" && (
          <thead>
            <tr className="border">
              <th className="border p-3 w-[500px] text-center">Teams</th>
              <th className="border p-3 w-[200px] text-center">Gesture Play</th>
              <th className="border p-3 w-[200px] text-center">Relevance</th>
              <th className="border p-3 w-[200px] text-center">Time Usage</th>
              <th className="border p-3 w-[150px] text-center">Total</th>
            </tr>
          </thead>
        )}
        {event.eventName === "Break Silence" && (
          <thead>
            <tr className="border">
              <th className="border p-3 w-[100px] text-center">Sl No</th>
              <th className="border p-3 w-[500px] text-center">Participants</th>
              <th className="border p-3 w-[200px] text-center">Relevance</th>
              <th className="border p-3 w-[200px] text-center">Proficiency</th>
              <th className="border p-3 w-[150px] text-center">Total</th>
            </tr>
          </thead>
        )}
        {event.eventName === "Bill Board" && (
          <thead>
            <tr className="border">
              <th className="border p-3 w-[100px] text-center">Sl No</th>
              <th className="border p-3 w-[500px] text-center">Participants</th>
              <th className="border p-3 w-[200px] text-center">Relevance</th>
              <th className="border p-3 w-[200px] text-center">Creativity</th>
              <th className="border p-3 w-[150px] text-center">Total</th>
            </tr>
          </thead>
        )}
        {event.eventName == "Pretense" && (
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
        )}
        {event.eventName == "Pretense" && (
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
        )}
        {event.eventName == "Break Silence" && (
          <tbody>
            {participants.map((participant, index) => {
              return (
                <tr className="border" key={participant?._id}>
                  <td className="">
                    <p className="w-full text-center">{index + 1}</p>
                  </td>
                  <td className="border p-3">
                    <p className="w-full text-center">
                      {participant?.fullName}
                    </p>
                  </td>
                  <td className="border"></td>
                  <td className="border"></td>
                  <td className="border"></td>
                </tr>
              );
            })}
          </tbody>
        )}
        {event.eventName == "Bill Board" && (
          <tbody>
            {participants.map((participant, index) => {
              return (
                <tr className="border" key={participant?._id}>
                  <td className="">
                    <p className="w-full text-center">{index + 1}</p>
                  </td>
                  <td className="border p-3">
                    <p className="w-full text-center">
                      {participant?.fullName}
                    </p>
                  </td>
                  <td className="border"></td>
                  <td className="border"></td>
                  <td className="border"></td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>

      <div className="w-full flex items-start gap-64 border-green-500 mt-20 h-40">
        <p className="text-xl font-semibold">Judge 1: </p>
        <p className="text-xl font-semibold">Judge 2:</p>
      </div>
    </div>
  );
};

export default PrintablePage;
