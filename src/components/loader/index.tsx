import { cn } from "@/lib/utils";
import * as React from "react";

interface ISpinnerProps {
  color?: string;
}

const Spinner: React.FunctionComponent<ISpinnerProps> = ({ color = "" }) => {
  return (
    <div
      className={`animate-spin inline-block size-6 border-3 border-current border-t-transparent rounded-full !${
        color.length ? color : "text-white"
      }`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
