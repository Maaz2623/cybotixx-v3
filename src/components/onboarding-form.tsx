"use client";

import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, useUser } from "@clerk/nextjs";
import { useCreateUser } from "@/features/users/api/use-create-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import Cookies from "js-cookie";

const formSchema = z.object({
  fullName: z.string().min(2).max(100),
  registerNumber: z.string().min(10).max(20),
  courseName: z.string().max(10),
  courseYear: z.string().min(1),
  phoneNumber: z.string().min(1).max(10),
  clerkId: z.string(),
  clerkImageUrl: z.string(),
});

const OnboardingForm = () => {
  const { userId } = useAuth();

  const userImageUrl = useUser().user?.imageUrl;

  const { mutate, isPending } = useCreateUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      registerNumber: "",
      courseName: "",
      courseYear: "",
      phoneNumber: "",
      clerkId: "",
      clerkImageUrl: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { fullName, registerNumber, courseName, courseYear, phoneNumber } =
        values;
      console.log(values);

      mutate(
        {
          fullName,
          registerNumber,
          courseName,
          courseYear,
          phoneNumber,
          clerkId: userId as string,
          clerkImageUrl: userImageUrl as string,
          prizesWon: 0,
          participations: 0,
        },
        {
          onSuccess(data) {
            if (data) {
              Cookies.set("convex_user_id", data, {
                expires: 7,
                path: "/",
              });
            }
            toast.success("Created Successfully");
            router.push("/events");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-10 w-full mx-4 md:w-1/3 sm:w-1/2 space-y-4">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold">Onboarding</h1>
        <p className="text-md text-gray-300">
          Basic information to get to know you.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" className="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registerNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Register Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 23BCAJC020"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between w-full gap-4">
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BCA">BCA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseYear"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select current academic year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">I</SelectItem>
                      <SelectItem value="2">II</SelectItem>
                      <SelectItem value="3">III</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 9658423014"
                    className=""
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary/50 hover:bg-primary/70 border-green-600 border text-white"
          >
            {isPending ? (
              <LoaderIcon className="text-white size-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingForm;
