import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";

interface Props {
  children?: ReactNode;
}

export default function AppProvider({ children }: Readonly<Props>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline enableColorScheme />
      {children}
    </QueryClientProvider>
  );
}
