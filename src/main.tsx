import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "~/assets/body.css";
import "~/assets/scrollbar.css";
import "~/assets/svg.css";
import "~/assets/fonts/fonts.css";
//
import "~/assets/assets.css"
import "~/assets/table.css"
import "~/components/content/assets/content.css"
import "~/components/form/assets/collapse.css"
import "~/components/form/assets/form.css"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
