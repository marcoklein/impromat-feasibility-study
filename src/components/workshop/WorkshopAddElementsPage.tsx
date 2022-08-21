import React from "react";
import { Page } from "../shared/Page";
import { WorkshopAddElementsFragment } from "./WorkshopAddElementsFragment";

export function WorkshopAddElementsPage() {
  return (
    <Page headerProps={{ showBackButton: true, title: "Neues Element" }}>
      <WorkshopAddElementsFragment></WorkshopAddElementsFragment>
    </Page>
  );
}
