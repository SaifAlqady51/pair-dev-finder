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
import { formFieldDataType, formFieldsData } from "@/data/formFieldsData";
import { createRoomAction } from "@/app/create-room/actions";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  language: z.string().min(2).max(50),
  githubRepo: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
});

export function CreateRoomForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // set default values to avoid DOM warning
    defaultValues: {
      name: "",
      language: "",
      githubRepo: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createRoomAction(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Loop over each field from formFieldData  */}
        {formFieldsData.map((formField: formFieldDataType) => (
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
                  <Input placeholder={formField.placeholder || ""} {...field} />
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
