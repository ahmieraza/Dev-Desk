import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeAdminPanel } from "./admin/init";
import { ContentProvider } from "./admin/context/ContentContext";

// Initialize Admin Panel
initializeAdminPanel();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </React.StrictMode>
);
