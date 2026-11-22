import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const savedTheme = window.localStorage.getItem('site-theme');
document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// Reveal the interactive app only after React has had a frame to replace the
// server-rendered SEO fallback. This prevents the raw bilingual HTML from
// flashing on slow mobile connections while keeping it available to crawlers
// and to visitors when JavaScript is disabled.
window.requestAnimationFrame(() => {
  document.documentElement.classList.remove('js-loading');
});
