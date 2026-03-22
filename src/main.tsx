import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/600.css";
import "@fontsource/source-serif-4/700.css";
import App from "./App";
import { appBasePath } from "./lib/base-path";
import { LearningProvider } from "./learning/LearningContext";
import { applyLegacyHashRedirect } from "./pages/LegacyHashRedirect";
import "./index.css";

// Rewrite legacy hash URLs before React mounts so the router sees the correct path.
applyLegacyHashRedirect();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={appBasePath}>
      <LearningProvider>
        <App />
      </LearningProvider>
    </BrowserRouter>
  </StrictMode>
);
