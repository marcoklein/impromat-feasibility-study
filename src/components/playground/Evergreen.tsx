import {
  Badge,
  CrossIcon,
  FilterIcon,
  Heading,
  IconButton,
  majorScale,
  Menu,
  minorScale,
  Pane,
  Paragraph,
  Popover,
  SmallCrossIcon,
  SmallTickIcon,
} from "evergreen-ui";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Routes, Route, Link, Outlet, useParams } from "react-router-dom";
import { IMPROV_DATABASE } from "../../data/improv-database";
import { generateWorkshop } from "../../functions/generate-workshop";
import { mapWorkshopElementTitlesToWorkshop } from "../../functions/map-workshop-element-titles-to-workshop";
import { WorkshopElementModel } from "../../models/WorkshopElementModel";
import { Markdown } from "../Markdown";
import { Page } from "./Page";
import ReactMarkdown from "react-markdown";

const Desktop = ({ children }: { children: JSX.Element }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }: { children: JSX.Element }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};

const Mobile = ({ children }: { children: JSX.Element }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }: { children: JSX.Element }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

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
        <Pane id="left" flexGrow="1">
          {workshop.elements.map((element) => (
            <Link to={element.title}>
              <Pane
                elevation={1}
                hoverElevation={2}
                activeElevation={2}
                padding={minorScale(2)}
                margin={minorScale(2)}
                // onClick={() => setSelectedElement(element)}
              >
                <Heading>{element.title}</Heading>
                {/* <Paragraph>{element.content}</Paragraph> */}
                <Pane>
                  {element.tags.map((tag) => (
                    <Badge marginRight={minorScale(1)}>{tag}</Badge>
                  ))}
                </Pane>
              </Pane>
            </Link>
          ))}
        </Pane>

        <Outlet></Outlet>
      </Pane>
    </Pane>
  );
}

function WorkshopElementDetailsPage() {
  return (
    <Page headerProps={{ showBackButton: true, title: "Workshop Element" }}>
      <WorkshopElementDetailsFragment></WorkshopElementDetailsFragment>
    </Page>
  );
}

function WorkshopDetailsPage() {
  return (
    <Page headerProps={{ title: "Workshop" }}>
      <Workshop></Workshop>
    </Page>
  );
}

function WorkshopElementDetailsFragment() {
  const params = useParams();
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const workshopElement = IMPROV_DATABASE.find(
    ({ title }) => title == params.elementId
  );

  return (
    <Pane padding={minorScale(2)}>
      {!isMobile && (
        <Link to="..">
          <IconButton
            float="right"
            appearance="minimal"
            icon={CrossIcon}
          ></IconButton>
        </Link>
      )}
      <Heading>{workshopElement?.title}</Heading>
      <Paragraph>
        {workshopElement?.content && (
          <ReactMarkdown>{workshopElement.content}</ReactMarkdown>
        )}
      </Paragraph>
    </Pane>
  );
}

export function Evergreen({}: ComponentProps) {
  // const isMobile = useMediaQuery({ maxWidth: 767 });
  const isMobile = useMediaQuery({ maxWidth: 500 });
  return (
    <Routes>
      <Route path="*" element={<WorkshopDetailsPage></WorkshopDetailsPage>}>
        {!isMobile && (
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
        )}
      </Route>
      {isMobile && (
        <Route
          path=":elementId"
          element={<WorkshopElementDetailsPage></WorkshopElementDetailsPage>}
        ></Route>
      )}
    </Routes>
  );
}
