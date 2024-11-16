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

const EventsPage = () => {
  const { userId } = useAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const { data: currentUser } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  const { mutate } = useCreateEvent();
  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    mutate(
      {
        eventName: name,
      },
      {
        onSuccess(data) {
          setName("");
          toast.success("Event Created");
          router.push(`/events/${data}`);
        },
      }
    );
  };

  return (
    <>
      {(currentUser.roleType === "ADMIN" ||
        currentUser.roleType === "SUPER_ADMIN") && (
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
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
              <div className="w-full flex justify-end items-center">
                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-10 bg-primary/50 w-20 border border-green-600 cursor-pointer hover:bg-primary/80 flex justify-center items-center gap-2 z-10 text-white"
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
    </>
  );
};

export default EventsPage;
