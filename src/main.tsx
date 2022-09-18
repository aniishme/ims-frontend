import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
