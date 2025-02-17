"use client";

import { z } from "zod";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RoomFormFieldDataType,
  roomFormFieldsData,
} from "@/data/roomFormFieldsData";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { removeErrorWord } from "@/utils/removeErrorWord";
import { createRoomService } from "@/services";
import { KeywordsInput } from "./KeywordsInput";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  keywords: z.array(z.string().min(2).max(50)).max(5),
  githubRepo: z.string(),
  description: z.string().min(2).max(100),
  image: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Image must be a valid URL or empty",
    }),
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
      keywords: [],
      githubRepo: "",
      description: "",
      image: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      image: values.image ?? null, // Convert undefined to null
    };

    console.log(JSON.stringify(formattedValues));
    const createRoomResult = await createRoomService(formattedValues);

    if (!createRoomResult.success) {
      toast({
        variant: "destructive",
        title: "Failed to create a room",
        description: removeErrorWord(createRoomResult.message),
      });
      return;
    }

    toast({
      title: "Room Created",
      description: "Your new room has been successfully created.",
      variant: "success",
    });
    route.push("/");
  }

  return (
    <Form data-cy="create-room-form" {...form}>
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
                  {formField.label === "Keywords" ? (
                    <KeywordsInput field={field} />
                  ) : (
                    <Input
                      data-cy={formField["data-cy"]}
                      className="border-gray-400"
                      placeholder={formField.placeholder || ""}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" data-cy="create-room-submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
