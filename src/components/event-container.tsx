import { useGetEvents } from "@/features/events/api/use-get-events";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const EventContainer = () => {
  const { data: events } = useGetEvents();

  const router = useRouter()

  if (!events)
    return (
      <div className="h-40 w-full flex justify-center items-center">
        <LoaderIcon className="text-green-500 animate-spin size-10" />
      </div>
    );

  return (
    <div className="w-full py-3 space-y-6 px-2 md:p-3">
      {events.map((event) => {
        return (
          <div onClick={() => router.push(`/events/${event._id}`)} key={event._id} className="border cursor-pointer border-red-500 rounded-lg overflow-hidden md:flex w-full">
            <div className="aspect-video border border-yellow-500 w-full md:w-1/2" />
            <div className="p-2">
              <div className="justify-between flex">
                <h2>{event.eventName}</h2>
                <p>Upcoming</p>
              </div>
              <p>Event Slogan</p>
              <p>Event Date</p>
              <p>Participants</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventContainer;
