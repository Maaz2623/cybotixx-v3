import { useGetEventById } from "@/features/events/api/use-get-event-by-id";
import React from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";

const Rules = ({ eventId }: { eventId: string }) => {
  const { data: event } = useGetEventById({
    eventId: eventId as Id<"events">,
  });

  return (
    <div className="w-full min-h-screen p-3 md:text-base text-sm">
      {event?.eventRules.map((rule) => {
        return (
          <div key={rule} className="flex gap-2 justify-start items-center">
            <div className="size-2 rounded-full bg-white" />
            <p>{rule}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Rules;
