import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AllRoutes.jsx";
import Authentication from "./context/Authentication.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Authentication>
          <RouterProvider router={router} />
        </Authentication>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
