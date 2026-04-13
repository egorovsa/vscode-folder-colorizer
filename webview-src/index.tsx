import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootNode = document.getElementById("root");

if (rootNode) {
  createRoot(rootNode).render(<App />);
}
