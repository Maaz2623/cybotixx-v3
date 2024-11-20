import { useGetEvents } from "@/features/events/api/use-get-events";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const EventContainer = () => {
  const { data: events } = useGetEvents();

  const router = useRouter();

  if (!events) {
    return (
      <div className="h-40 w-full flex justify-center items-center">
        <p className="text-lg">No Events</p>
      </div>
    );
  }

  return (
    <div className="md:w-full py-3 space-y-6 px-2 md:p-3 w-[90%]">
      {events.map((event) => {
        const eventDate = event.eventDate; // Assuming format is "dd/MM/yyyy"

        return (
          <div
            onClick={() => router.push(`/events/${event._id}`)}
            key={event._id}
            className="border cursor-pointer shadow-lg shadow-blue-500/20 rounded-lg overflow-hidden md:flex w-full"
          >
            <div className="aspect-video border-b overflow-hidden relative w-full md:w-1/2">
              {event.eventImage && (
                <Image src={event.eventImage} alt="eventImage" fill />
              )}
              {!event.eventImage && (
                <div className="bg-white/10 border-b flex justify-center items-center w-full h-full">
                  <p>No Image</p>
                </div>
              )}
            </div>
            <div className="px-3 pt-3 pb-5">
              <div className="justify-between flex items-center">
                <h2 className="text-2xl font-medium">{event.eventName}</h2>
                <p
                  className={cn(
                    "border md:hidden rounded-md py-1 text-xs px-2",
                    !event.eventComplete && "bg-blue-500/50 border-blue-500",
                    event.eventComplete && "bg-gray-600/50 border-white"
                  )}
                >
                  {event.eventComplete && "Completed"}
                  {!event.eventComplete && "Upcoming"}
                </p>
              </div>
              <p className="text-xs rounded-md border w-fit px-2 py-1 bg-white/10 mt-3">
                {eventDate}
              </p>
              <p
                className={cn(
                  "border hidden md:flex w-fit mt-4 rounded-md py-1 text-xs px-2",
                  !event.eventComplete && "bg-blue-500/50 border-blue-500",
                  event.eventComplete && "bg-gray-600/50 border-white"
                )}
              >
                {event.eventComplete && "Completed"}
                {!event.eventComplete && "Upcoming"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventContainer;
