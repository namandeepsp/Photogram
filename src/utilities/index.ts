export const scrollToBottom = (domElement: HTMLDivElement | null) => {
  if (!domElement) return;
  domElement?.scrollTo({ top: domElement?.scrollHeight, behavior: "smooth" });
};
