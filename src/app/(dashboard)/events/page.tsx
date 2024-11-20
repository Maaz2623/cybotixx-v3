"use client";
import EventContainer from "@/components/event-container";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { useCreateEvent } from "@/features/events/api/use-create-event";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventsPage = () => {
  const { userId } = useAuth();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTeamMaxMembers, setEventTeamMaxMembers] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { data: currentUser } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  const { mutate } = useCreateEvent();

  // if (!currentUserLoading)
  //   return (
  //     <div className="flex justify-center items-center h-40">
  //       <LoaderIcon className="text-blue-500 size-8 animate-spin" />
  //     </div>
  //   );

  if (!currentUser) {
    return router.push("/onboarding");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    mutate(
      {
        eventName: name,
        eventDate: date,
        eventType: eventType,
        eventTeamMaxMembers: eventTeamMaxMembers,
      },
      {
        onSuccess(data) {
          setName("");
          toast.success("Event Created");
          router.push(`/events/${data}`);
        },
        onError() {
          setName("");
          toast.error("Some Error Occured");
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {(currentUser.roleType === "ADMIN" ||
        currentUser.roleType === "SUPER_ADMIN") && (
        <Dialog>
          <DialogTrigger
            asChild
            className="w-full border flex items-center justify-end"
          >
            <Button
              disabled={loading}
              type="submit"
              className="mt-10 bg-primary/50 w-20 border border-blue-600 cursor-pointer hover:bg-primary/80 flex justify-center items-center gap-2 z-10 text-white"
            >
              {loading ? (
                <LoaderIcon className="text-white size-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[80%]">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                minLength={1}
                max={50}
                required
                className="w-full"
                placeholder="Event Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                minLength={1}
                max={50}
                required
                className="w-full"
                placeholder="DD/MM/YYYY"
                onChange={(e) => setDate(e.target.value)}
              />{" "}
              <div className="flex justify-start items-center gap-3">
                <Select onValueChange={(e) => setEventType(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  minLength={1}
                  max={50}
                  disabled={eventType !== "team"}
                  required
                  className="w-[150px]"
                  placeholder="Max Members"
                  type="number"
                  onChange={(e) => {
                    setEventTeamMaxMembers(parseInt(e.target.value));
                  }}
                />
              </div>
              <div className="w-full flex justify-end items-center">
                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-10 bg-primary/50 w-20 border border-blue-600 cursor-pointer hover:bg-primary/80 flex justify-center items-center gap-2 z-10 text-white"
                >
                  {loading ? (
                    <LoaderIcon className="text-white size-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <EventContainer />
    </div>
  );
};

export default EventsPage;
