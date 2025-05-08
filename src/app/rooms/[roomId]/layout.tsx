import React from "react";
import { UnreadMessagesCounterProvider } from "@/components";

interface ParamsProps {
  params: {
    roomId: string;
  };
  children: React.ReactNode;
}

export default async function Layout({ params, children }: ParamsProps) {
  return (
    <UnreadMessagesCounterProvider>{children}</UnreadMessagesCounterProvider>
  );
}
