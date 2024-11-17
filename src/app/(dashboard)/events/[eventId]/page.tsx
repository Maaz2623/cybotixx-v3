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
import { PlusCircleIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Image from "next/image";
import Overview from "./_components/overview";
import Rules from "./_components/rules";
import Winners from "./_components/winners";
import Participants from "./_components/participants";

interface TabInterface {
  label: string;
  component: React.ReactNode;
}

const EventIdPage = () => {
  const eventId = useEventId();
  const { data: event } = useGetEventById({ eventId });
  const { userId } = useAuth();
  const { data: currentUser } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  const [rules, setRules] = useState<Array<string>>(
    event?.eventRules.reverse() || []
  );
  const [newRule, setNewRule] = useState("");

  const addRule = () => {
    setRules([...rules, newRule]);
    toast.success("Rule added. Make sure you save the changes");
    setNewRule("");
  };

  if (!event) return;

  console.log(rules);

  const tabs: TabInterface[] = [
    {
      label: "Overview",
      component: <Overview />,
    },
    {
      label: "Rules",
      component: <Rules />,
    },
    {
      label: "Participants",
      component: <Participants />,
    },
    {
      label: "Winners",
      component: <Winners />,
    },
  ];

  return (
    <div className="w-full p-4 space-y-4">
      {(currentUser?.roleType === "SUPER_ADMIN" ||
        currentUser?.roleType === "ADMIN") && (
        <div className="flex w-full items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="submit"
                className="w-20 text-xs bg-primary/50 hover:bg-primary/70 border-green-600 border text-white"
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
                                  className="w-20 text-xs bg-primary/50 hover:bg-primary/70 border-green-600 border text-white"
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
      <div className="border p-2 space-y-4">
        <div className="w-full flex justify-center items-center">
          <div className="aspect-video w-full md:w-[400px] rounded-lg border overflow-hidden relative">
            <Image
              src={event?.eventImage}
              alt="image"
              // width={500}
              // height={500}
              fill
              className=""
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex gap-x-2 overflow-auto">
            {tabs.map((tab) => {
              return (
                <p
                  className="bg-free/10 px-2 w-[150px] bg-primary/50 hover:bg-primary/70 border-green-600 border text-white rounded-sm text-xs text-center md:text-base cursor-pointer py-1"
                  key={tab.label}
                >
                  {tab.label}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventIdPage;
