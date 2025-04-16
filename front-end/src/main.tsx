import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/tailwindcss.css";
import "./assets/css/index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
document.documentElement.dir = "rtl";
