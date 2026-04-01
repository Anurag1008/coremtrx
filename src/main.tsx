import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import CheckoutPage from "./pages/CheckoutPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
