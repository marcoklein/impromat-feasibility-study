import { IconButton, LockIcon, UnlockIcon } from "evergreen-ui";
import React, { useState } from "react";
import { Page } from "./Page";
import { WorkshopComponent } from "./Workshop";

export function WorkshopDetailsPage() {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <Page
      headerProps={{
        title: "Workshop",
        rightElement: (
          <IconButton
            appearance="minimal"
            icon={isLocked ? LockIcon : UnlockIcon}
            onClick={() => setIsLocked(!isLocked)}
          ></IconButton>
        ),
      }}
    >
      <WorkshopComponent allowEdit={!isLocked}></WorkshopComponent>
    </Page>
  );
}
