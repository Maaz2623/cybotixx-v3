"use client";
import { useEventId } from "@/features/events/hooks/use-event-id";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetEventById } from "@/features/events/api/use-get-event-by-id";
import { Check, LoaderIcon, PlusCircleIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Image from "next/image";
import Rules from "./_components/rules/rules";
import Winners from "./_components/winners/winners";
import Participants from "./_components/participants/participants";
import { cn } from "@/lib/utils";
import { useCreateParticipant } from "@/features/participants/api/use-create-participant";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useGetParticipantByMemberId } from "@/features/participants/api/use-get-participant-by-member-id";
import Teams from "./_components/teams/teams";
import TeamSlots from "./_components/teams/team-slots";

interface TabInterface {
  label: string;
  component: React.ReactNode;
  isActive: boolean;
}

const EventIdPage = () => {
  const eventId = useEventId();
  const { userId } = useAuth();
  const { data: event } = useGetEventById({ eventId });
  const { data: currentUser } = useGetUserByClerkId({
    clerkId: userId as string,
  });
  const { mutate, isPending } = useCreateParticipant();
  const [tabActive, setTabActive] = useState("Rules");

  const [rules, setRules] = useState<Array<string>>(
    event?.eventRules.reverse() || []
  );
  const [newRule, setNewRule] = useState("");

  const { data: participant } = useGetParticipantByMemberId({
    convex_user_id: currentUser?._id as Id<"users">,
    eventId: eventId as Id<"events">,
  });

  if (!event || !currentUser) {
    return (
      <div className="h-64 flex justify-center items-center w-full">
        <LoaderIcon className="size-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const participate = () => {
    mutate(
      {
        eventId: eventId as Id<"events">,
        memberId: currentUser?._id as Id<"users">,
      },
      {
        onSuccess: () => {
          toast.success("Participation Successful");
        },
      }
    );
  };

  const addRule = () => {
    setRules([...rules, newRule]);
    toast.success("Rule added. Make sure you save the changes");
    setNewRule("");
  };

  const tabs: TabInterface[] = [
    {
      label: "Rules",
      component: <Rules eventId={eventId} />,
      isActive: tabActive === "Rules",
    },
    {
      label: "Teams",
      component: <Teams eventId={event._id} />,
      isActive: tabActive === "Teams",
    },
    {
      label: "Participants",
      component: <Participants eventId={event._id} />,
      isActive: tabActive === "Participants",
    },
    {
      label: "Winners",
      component: <Winners eventId={event._id} />,
      isActive: tabActive === "Winners",
    },
  ];

  return (
    <div className="w-full p-4 space-y-4 md:flex flex-col justify-center items-center">
      {(currentUser?.roleType === "SUPER_ADMIN" ||
        currentUser?.roleType === "ADMIN") && (
        <div className="flex w-full items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="submit"
                className="w-20 text-xs bg-primary/50 hover:bg-primary/70 border-blue-600 border text-white"
              >
                Edit Event
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[80%]">
              <DialogHeader>
                <DialogTitle className="w-full text-center text-2xl">
                  Edit Event
                </DialogTitle>
                <DialogDescription></DialogDescription>
                <form className="space-y-4" action="">
                  <div className="gap-y-2 flex flex-col">
                    <p className="text-sm">Change Event Name</p>
                    <Input
                      placeholder="Event Name"
                      defaultValue={event?.eventName}
                    />
                  </div>
                  <div className="gap-y-2 flex flex-col">
                    <p className="text-sm">Change Event Image</p>
                    <Input
                      placeholder="Event Image Url"
                      defaultValue={event?.eventImage}
                    />
                  </div>
                  <div className="gap-y-2 flex flex-col">
                    <div className="flex justify-between text-center">
                      <p className="flex justify-center items-center text-sm">
                        Change/Add Event Rules
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={`ghost`}>
                            <PlusCircleIcon className="size-3" />
                            <p className="text-xs">Add Rule</p>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[80%]">
                          <DialogHeader className="space-y-4">
                            <DialogTitle>Add Rule</DialogTitle>
                            <form className="space-y-4" onSubmit={addRule}>
                              <DialogDescription>
                                <Input
                                  minLength={1}
                                  className="w-full"
                                  placeholder="Enter rule"
                                  onChange={(e) => setNewRule(e.target.value)}
                                />
                              </DialogDescription>
                              <div className="w-full flex justify-end items-center">
                                <Button
                                  type="submit"
                                  className="w-20 text-xs bg-primary/50 hover:bg-primary/70 border-blue-600 border text-white"
                                >
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <ScrollArea className="w-full h-40 gap-y-3">
                      {rules.map((rule, index) => {
                        return (
                          <div
                            key={index}
                            className="flex gap-x-3 justify-start items-center mb-2 w-full"
                          >
                            <div className="h-2 w-2 bg-white/50 rounded-full" />
                            <Input
                              placeholder="Event Rule"
                              defaultValue={rule}
                              className="h-7 text-xs rounded-sm"
                            />
                          </div>
                        );
                      })}
                    </ScrollArea>
                  </div>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div className="p-2 space-y-4 md:w-[80%]">
        <div className="w-full flex justify-center items-center">
          <div className="aspect-video w-full md:w-full rounded-lg overflow-hidden relative">
            {event.eventImage !== "" ? (
              <Image
                src={event?.eventImage}
                alt="image"
                // width={500}
                // height={500}
                fill
                className=""
              />
            ) : (
              <div className="h-full flex justify-center items-center w-full bg-white/10">
                No Image
              </div>
            )}
          </div>
        </div>
        <div className="w-full px-4 h-14 flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">{event.eventName}</p>
          {event.eventType === "individual" && (
            <Button
              onClick={participate}
              type="submit"
              disabled={!!participant || isPending}
              className="h-8 text-xs md:text-sm w-[80px] md:w-[100px] bg-primary/50 hover:bg-primary/70 border-blue-600 border text-white"
            >
              {participant && <Check className="size-4 text-blue-200" />}
              {!participant && "Participate"}
            </Button>
          )}
          {event.eventType === "team" && (
            // <Dialog>
            //   <DialogTrigger asChild>
            //     <Button
            //       disabled={!!participant || isPending}
            //       className="h-8 text-xs md:text-sm w-[80px] md:w-[100px] bg-primary/50 hover:bg-primary/70 border-blue-600 border text-white"
            //     >
            //       {participant && (
            //         <div className="flex items-center px-2 gap-1">
            //           <Check className="size-4 text-blue-200" />
            //           <p className="text-xs">Joined</p>
            //         </div>
            //       )}
            //       {!participant && "Participate"}
            //     </Button>
            //   </DialogTrigger>
            //   <DialogContent className="w-[90%] rounded-lg">
            //     <DialogHeader>
            //       <DialogTitle>Join a Team</DialogTitle>
            //     </DialogHeader>
            //     <TeamSlots />
            //   </DialogContent>
            // </Dialog>
            <TeamSlots />
          )}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex overflow-auto py-3 scroll-smooth">
            {tabs.map((tab) => {
              return (
                <div
                  onClick={() => setTabActive(tab.label)}
                  className="w-[150px] cursor-pointer text-center"
                  key={tab.label}
                >
                  <p
                    className={cn(
                      "px-2 py-1 w-full text-sm border-b md:text-base transition-transform transform duration-300",
                      tab.isActive && "border-b-blue-500"
                    )}
                  >
                    {tab.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {tabs.map((tab) => {
        return (
          <div
            key={tab.label}
            className={cn(
              "hidden",
              tab.isActive && "flex w-full justify-center items-center"
            )}
          >
            {tab.component}
          </div>
        );
      })}
    </div>
  );
};

export default EventIdPage;
