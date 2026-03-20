import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/600.css";
import "@fontsource/source-serif-4/700.css";
import App from "./App";
import { LearningProvider } from "./learning/LearningContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LearningProvider>
      <App />
    </LearningProvider>
  </StrictMode>
);
