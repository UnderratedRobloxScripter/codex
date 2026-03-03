import React from "react";
import ReactDOM from "react-dom/client";
import { IDELayout } from "./components/layout/IDELayout";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IDELayout />
  </React.StrictMode>
);
