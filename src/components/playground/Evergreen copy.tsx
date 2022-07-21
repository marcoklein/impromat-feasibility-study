import {
  Badge,
  FilterIcon,
  Heading,
  IconButton,
  majorScale,
  Menu,
  minorScale,
  Pane,
  Popover,
  SmallCrossIcon,
  SmallTickIcon,
} from "evergreen-ui";
import React, { useState } from "react";
import { generateWorkshop } from "../../functions/generate-workshop";
import { mapWorkshopElementTitlesToWorkshop } from "../../functions/map-workshop-element-titles-to-workshop";
import { WorkshopElementModel } from "../../models/WorkshopElementModel";
import { Page } from "./Page";

interface ComponentProps {}

function Workshop() {
  const [workshop] = useState(
    mapWorkshopElementTitlesToWorkshop(generateWorkshop())
  );

  const [selectedElement, setSelectedElement] =
    useState<WorkshopElementModel>();

  return (
    <Pane>
      <Pane display="flex" alignItems="center" margin={majorScale(2)}>
        <Heading flexGrow="1">{workshop.title}</Heading>
        <Popover
          content={
            <Menu>
              <Menu.Group title="Show">
                <Menu.Item icon={SmallCrossIcon}>Show Tags</Menu.Item>
                <Menu.Item icon={SmallTickIcon}>Show Tags</Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <IconButton icon={FilterIcon} appearance="minimal"></IconButton>
        </Popover>
      </Pane>

      <Pane display="flex">
        <Pane id="left">
          {workshop.elements.map((element) => (
            // <Popover
            //   content={({ close }) => (
            //     <Card width={320} height={320} padding={minorScale(2)}>
            //       <IconButton
            //         float="right"
            //         icon={CrossIcon}
            //         onClick={close}
            //       ></IconButton>
            //       {/* <Text>{element.content.substr(0, 100)}</Text> */}
            //       <Text>{element.content}</Text>
            //       <Button
            //         appearance="primary"
            //         position="absolute"
            //         bottom="0"
            //         left="0"
            //         width="100%"
            //       >
            //         Mehr
            //       </Button>
            //     </Card>
            //   )}
            // >
            <Pane
              elevation={1}
              hoverElevation={2}
              activeElevation={2}
              padding={minorScale(2)}
              margin={minorScale(2)}
              onClick={() => setSelectedElement(element)}
            >
              <Heading>{element.title}</Heading>
              {/* <Paragraph>{element.content}</Paragraph> */}
              <Pane>
                {element.tags.map((tag) => (
                  <Badge marginRight={minorScale(1)}>{tag}</Badge>
                ))}
              </Pane>
            </Pane>
            // </Popover>
          ))}
        </Pane>
        {selectedElement && (
          <Pane id="right" flexGrow="2" elevation={1} marginY={minorScale(2)}>
            <Heading>{selectedElement.title}</Heading>
          </Pane>
        )}
      </Pane>
    </Pane>
  );
}

function WorkshopElementDetailsPage() {
  return (
    <Page>
      <WorkshopElementDetailsPage></WorkshopElementDetailsPage>
    </Page>
  );
}

function WorkshopDetailsPage() {
  return (
    <Page>
      <Workshop></Workshop>
    </Page>
  );
}

function WorkshopElementDetailsFragment() {
  return <Heading>This is some details</Heading>;
}

export function Evergreen({}: ComponentProps) {
  return <WorkshopDetailsPage></WorkshopDetailsPage>;
}
