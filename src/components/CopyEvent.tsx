"use client";

import { useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { Copy, CopyCheck, CopyX } from "lucide-react";

type CopyState = "idle" | "copied" | "error";

export const CopyEventButton = ({
  eventId,
  clerkUserId,
  ...buttonProps
}: Omit<ButtonProps, "children" | "onClick"> & {
  eventId: string;
  clerkUserId: string;
}) => {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const CopyIcon = getCopyIcon(copyState);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${location.origin}/book/${clerkUserId}/${eventId}`)
      .then(() => {
        setCopyState("copied");
        setTimeout(() => setCopyState("idle"), 2000);
      })
      .catch(() => {
        setCopyState("error");
        setTimeout(() => setCopyState("idle"), 2000);
      });
  };
  return (
    <Button {...buttonProps} onClick={handleCopyLink}>
      <CopyIcon className="size-4 mr-2" />
      {getChildren(copyState)}
    </Button>
  );
};

const getCopyIcon = (copyState: CopyState) => {
  switch (copyState) {
    case "idle":
      return Copy;
    case "copied":
      return CopyCheck;
    case "error":
      return CopyX;
  }
};

const getChildren = (copyState: CopyState) => {
  switch (copyState) {
    case "idle":
      return "Copy Link";
    case "copied":
      return "Copied!";
    case "error":
      return "Error";
  }
};
