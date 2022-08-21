import React from "react";
import { Page } from "../shared/Page";
import { WorkshopElementDetailsFragment } from "./WorkshopElementsDetailsFragment";

export function WorkshopElementDetailsPage() {
  return (
    <Page headerProps={{ showBackButton: true, title: "Workshop Element" }}>
      <WorkshopElementDetailsFragment></WorkshopElementDetailsFragment>
    </Page>
  );
}
