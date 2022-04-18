import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
