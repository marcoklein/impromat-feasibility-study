import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { WorkshopPage } from "./pages/WorkshopPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<WelcomePage></WelcomePage>}></Route>
        <Route path="/workshop" element={<WorkshopPage></WorkshopPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
