"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RoomFormFieldDataType,
  roomFormFieldsData,
} from "@/data/roomFormFieldsData";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { checkGithubRepo } from "@/app/create-room/checkGithubRepo";
import { removeErrorWord } from "@/utils/removeErrorWord";
import { createRoom } from "@/services";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  tags: z.string().min(2).max(50),
  githubRepo: z.string(),
  description: z.string().min(2).max(100),
});

export function CreateRoomForm() {
  const route = useRouter();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // set default values to avoid DOM warning
    defaultValues: {
      name: "",
      tags: "",
      githubRepo: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    checkGithubRepo(values.githubRepo || "")
      .then(() => createRoom(values))
      .then(() => {
        toast({ title: "Room Created" });
        route.push("/");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Failed to create a room",
          description: removeErrorWord(error as string), // Use error message if available
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Loop over each field from formFieldData  */}
        {roomFormFieldsData.map((formField: RoomFormFieldDataType) => (
          <FormField
            key={formField.fieldName}
            control={form.control}
            name={formField.fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-xl">
                  {formField.label}
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-400"
                    placeholder={formField.placeholder || ""}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{formField.fieldDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
