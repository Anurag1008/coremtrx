import { StrictMode, useEffect, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import App from "./App";
import CheckoutPage from "./pages/CheckoutPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const reset = () => {
      // Some browsers will scroll to keep the focused element visible.
      const active = document.activeElement as HTMLElement | null;
      active?.blur?.();
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run before paint, then once again next frame to beat late layout/focus scroll.
    reset();
    requestAnimationFrame(reset);
  }, [location.pathname]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
