import { ReactNode } from "react";

type ButtonType = "filled" | "outline";

export default function Button({
  type,
  children,
}: {
  type: ButtonType;
  children: ReactNode;
}) {
  if (type === "outline") {
    return <button className="py-2 px-8 border rounded">{children}</button>;
  }

  return (
    <button className="py-2 px-8 bg-grape rounded text-white">
      {children}
    </button>
  );
}
