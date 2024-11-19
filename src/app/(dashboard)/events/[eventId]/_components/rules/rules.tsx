import { useGetEventById } from "@/features/events/api/use-get-event-by-id";
import React from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";

const Rules = ({ eventId }: { eventId: string }) => {
  const { data: event } = useGetEventById({
    eventId: eventId as Id<"events">,
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-lg shadow-lg p-6 md:text-base text-sm">
      <h1 className="text-2xl font-semibold mb-6 text-center border-b-2 border-gray-600 pb-3">
        Event Rules
      </h1>
      <div className="flex flex-col gap-y-4">
        {event?.eventRules.map((rule, index) => (
          <div
            key={index}
            className="flex gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600 shadow-sm"
          >
            <div className="h-3 w-3 mt-1 rounded-full bg-teal-500"></div>
            <p className="flex-1 text-gray-300">{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
