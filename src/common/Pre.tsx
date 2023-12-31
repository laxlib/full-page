import Prism from "prismjs";
import { toast } from "react-hot-toast";
import { ClipboardIcon, RocketIcon } from "@/assets/icons";
import React, { useCallback, useEffect, useState } from "react";

const Pre = ({ children }: { children: string }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const copyHandler = useCallback(() => {
    if (!active) {
      if ("clipboard" in navigator) {
        setActive(true);
        toast.success("Copied");
        navigator.clipboard.writeText(children);
        setTimeout(() => setActive(false), 1100);
      } else toast.error("Your browser does'nt support this feature");
    }
  }, [active, children]);

  return (
    <pre dir="ltr" className="max-w-full w-full">
      <button onClick={copyHandler} className="mb-4 border border-color rounded-md w-fit p-2 block relative overflow-hidden">
        <ClipboardIcon className={`transition duration-200 ${active ? "scale-0" : "scale-100"}`} />
        <span
          className={`absolute w-full h-full centering top-full right-full ${
            active && "translate-x-[200%] -translate-y-[200%] transition !duration-[1100ms]"
          }`}
        >
          <RocketIcon />
        </span>
      </button>
      <code className="language-javascript">{children}</code>
    </pre>
  );
};

export default Pre;
