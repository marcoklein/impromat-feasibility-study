import { minorScale, Pane } from "evergreen-ui";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useIsMobile } from "./shared/IsMobile";
import { WorkshopAddElementsFragment } from "./workshop/WorkshopAddElementsFragment";
import { WorkshopAddElementsPage } from "./workshop/WorkshopAddElementsPage";
import { WorkshopDetailsPage } from "./workshop/WorkshopDetailsPage";
import { WorkshopElementDetailsPage } from "./workshop/WorkshopElementDetailsPage";
import { WorkshopElementDetailsFragment } from "./workshop/WorkshopElementsDetailsFragment";

export function WorkshopRoutes() {
  const isMobile = useIsMobile();
  return (
    <Routes>
      <Route path="*" element={<WorkshopDetailsPage></WorkshopDetailsPage>}>
        <Route path="edit"></Route>
        {!isMobile && (
          <>
            <Route
              path="add/*"
              element={
                <Pane
                  id="right"
                  flexGrow="2"
                  elevation={1}
                  marginY={minorScale(2)}
                >
                  <WorkshopAddElementsFragment></WorkshopAddElementsFragment>
                </Pane>
              }
            ></Route>
            <Route
              path=":elementId"
              element={
                <Pane
                  id="right"
                  flexGrow="2"
                  elevation={1}
                  marginY={minorScale(2)}
                >
                  <WorkshopElementDetailsFragment></WorkshopElementDetailsFragment>
                </Pane>
              }
            ></Route>
          </>
        )}
      </Route>
      {isMobile && (
        <>
          <Route
            path="add/*"
            element={<WorkshopAddElementsPage></WorkshopAddElementsPage>}
          ></Route>
          <Route
            path=":elementId"
            element={<WorkshopElementDetailsPage></WorkshopElementDetailsPage>}
          ></Route>
        </>
      )}
    </Routes>
  );
}
