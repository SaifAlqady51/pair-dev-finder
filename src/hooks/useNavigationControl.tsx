"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface NavigationControlType {
  canAccess: boolean;
  setCanAccess: Dispatch<SetStateAction<boolean>>;
}

export const NavigateControl = createContext<NavigationControlType | undefined>(
  undefined
);

export function NavigateionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [canAccess, setCanAccess] = useState(false);
  return (
    <NavigateControl.Provider value={{ canAccess, setCanAccess }}>
      {children}
    </NavigateControl.Provider>
  );
}

export function useNavigatControl() {
  const access = useContext(NavigateControl);
  if (access === undefined) {
    throw new Error("useNavigateControl must be used with a NavigateControll");
  }
  return access;
}
