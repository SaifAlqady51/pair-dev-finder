"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type UnreadMessagesCounterContextType = {
  unreadMessagesCount: number;
  setUnreadMessagesCount: Dispatch<SetStateAction<number>>;
};

const defaultContext: UnreadMessagesCounterContextType = {
  unreadMessagesCount: 0,
  setUnreadMessagesCount: () => {
    throw new Error("setUnreadMessagesCount called outside provider");
  },
};

const UnreadMessagesCounterContext = createContext(defaultContext);

export const UnreadMessagesCounterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  return (
    <UnreadMessagesCounterContext.Provider
      value={{ unreadMessagesCount, setUnreadMessagesCount }}
    >
      {children}
    </UnreadMessagesCounterContext.Provider>
  );
};

// Custom hook to use the context
export const useUnreadMessagesCounter = () => {
  return useContext(UnreadMessagesCounterContext);
};
