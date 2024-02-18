"use client";

import { ToastProvider } from "@/components/Toast";

interface ContextsProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const Contexts = ({ children }: ContextsProps) => {
  return <ToastProvider>{children}</ToastProvider>;
};
