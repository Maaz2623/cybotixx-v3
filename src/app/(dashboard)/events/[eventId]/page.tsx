"use client";
import { useEventId } from "@/features/events/hooks/use-event-id";
import { useGetUserByClerkId } from "@/features/users/api/use-get-user";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventIdPage = () => {
  const eventId = useEventId();

  const { userId } = useAuth();

  const { data: currentUser } = useGetUserByClerkId({
    clerkId: userId as string,
  });

  if(!currentUser) return

  return (
    <div className="w-full border">
      {(currentUser.roleType === "SUPER_ADMIN" || currentUser.roleType === "ADMIN") && (

        <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Edit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      )}
      {eventId}
    </div>
  );
};

export default EventIdPage;
