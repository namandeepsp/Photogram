import React from "react";

export const scrollToBottom = (domElement: React.HTMLElementType | null) => {
  if (!domElement) return;
  domElement?.scrollTo({ top: domElement?.scrollHeight, behavior: "smooth" });
};
