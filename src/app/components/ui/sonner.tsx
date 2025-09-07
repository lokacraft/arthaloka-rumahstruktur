"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps, toast } from "sonner";
import React from "react";

export const showToast = (
  message: string,
  type: "success" | "error" = "success",
  icon?: React.ReactNode
) => {
  const bgColor =
    type === "success" ? "rgba(0,128,0,0.6)" : "rgba(128,0,0,0.6)";
  const textColor = "#FAFAFA";
  toast(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{message}</span>
    </div>,
    {
      style: {
        background: bgColor,
        color: textColor,
        fontWeight: 600,
        borderRadius: "1rem",
        padding: "1rem",
        width:"fit-content",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
      },
      position: "top-right",
    }
  );
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
