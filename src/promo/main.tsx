import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PromoPage } from "./PromoPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PromoPage />
  </StrictMode>,
);
