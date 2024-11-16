"use client";
import React, { Suspense } from "react";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/features/users/api/use-create-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const formSchema = z.object({
  fullName: z.string().min(2).max(100),
  registerNumber: z.string().min(10).max(20),
  courseName: z.string().max(10),
  courseYear: z.string().min(1),
  phoneNumber: z.string().min(1).max(10),
  clerkId: z.string(),
});

interface ProfileFormProps {
  fullName: string;
  registerNumber: string;
  courseName: string;
  courseYear: string;
  phoneNumber: string;
  clerkId: string;
}

const ProfileForm = ({
  fullName,
  registerNumber,
  courseName,
  courseYear,
  phoneNumber,
  clerkId,
}: ProfileFormProps) => {
  const { mutate, isPending } = useCreateUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName,
      registerNumber,
      courseName,
      courseYear,
      phoneNumber,
      clerkId,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess() {
        toast.success("Successfully");
        router.push("/profile");
      },
    });
  }

  return (
    <div className="pt-10 w-full md:w-[80%] md:px-0 px-4">
      <div className="w-full flex justify-center p-5 pb-14 items-center">
        <div className="size-14">
          <UserButton />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="e.g. John Doe"
                    className=""
                    {...field}
                  />
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
                    disabled
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
                      <SelectTrigger disabled className="">
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
                      <SelectTrigger disabled className="w-full">
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
                    disabled
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
            disabled
            className="w-full bg-primary/50 hover:bg-primary/70 border-green-600 border text-white"
          >
            {isPending ? (
              <LoaderIcon className="text-white size-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
