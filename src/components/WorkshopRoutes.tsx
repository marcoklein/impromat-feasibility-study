import {
  Button,
  IconButton,
  minorScale,
  Pane,
  PlusIcon,
  SearchInput,
  Group,
  TextInput,
  Icon,
  LightningIcon,
  SearchIcon,
  BookIcon,
  Heading,
  majorScale,
  Paragraph,
  DragHandleVerticalIcon,
} from "evergreen-ui";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
  useRoutes,
} from "react-router-dom";
import { IMPROV_DATABASE } from "../data/improv-database";
import { generateWorkshop } from "../functions/generate-workshop";
import { mapWorkshopElementTitlesToWorkshop } from "../functions/map-workshop-element-titles-to-workshop";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import { useIsMobile } from "./IsMobile";
import { Page } from "./Page";
import { UnstyledLink } from "./UnstyledLink";
import { WorkshopDetailsPage } from "./WorkshopDetailsPage";
import { WorkshopElementDetailsPage } from "./WorkshopElementDetailsPage";
import { WorkshopElementDetailsFragment } from "./WorkshopElementsDetailsFragment";

export function WorkshopAddElementsFragment() {
  const [searchValue, setSearchValue] = useState("");

  function SwitchGroup(props: {
    tab: "search" | "inspiration" | "library";
    urlPrefix: string;
  }) {
    return (
      <Pane display="flex">
        <Group flexGrow="1" display="flex">
          <Button
            is={NavLink}
            to={`${props.urlPrefix}/inspiration`}
            appearance={props.tab === "inspiration" ? "primary" : "default"}
            flexGrow="1"
            borderRadius="0"
          >
            <Icon marginRight={minorScale(2)} icon={LightningIcon}></Icon>
            Inspiration
          </Button>

          <Button
            is={NavLink}
            to={`${props.urlPrefix}/search`}
            appearance={props.tab === "search" ? "primary" : "default"}
            flexGrow="1"
            borderRadius="0"
          >
            <Icon marginRight={minorScale(2)} icon={SearchIcon}></Icon>
            Suche
          </Button>
          <Button
            is={NavLink}
            to={`${props.urlPrefix}/library`}
            appearance={props.tab === "library" ? "primary" : "default"}
            flexGrow="1"
            borderRadius="0"
          >
            <Icon marginRight={minorScale(2)} icon={BookIcon}></Icon>
            Bibliothek
          </Button>
        </Group>
      </Pane>
    );
  }

  function TabPane(props: { children: JSX.Element }) {
    return <Pane margin={majorScale(2)}>{props.children}</Pane>;
  }

  function InspirationTab() {
    return (
      <TabPane>
        <div>Hi</div>
      </TabPane>
    );
  }

  function SearchTab() {
    const [workshop] = useState(
      mapWorkshopElementTitlesToWorkshop(generateWorkshop())
    );
    console.log("workshop", workshop);
    const elements: WorkshopElementModel[] = IMPROV_DATABASE.map((element) => {
      return {
        sourceDate: element.createdAt,
        sourceTitle: element.title,
        content: element.content,
        sourceUrl: element.url,
        tags: [],
        title: element.title,
      };
    });
    return (
      <TabPane>
        <>
          <Pane display="flex">
            <TextInput
              placeholder="Suche"
              flexGrow="1"
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
            ></TextInput>
          </Pane>
          {elements
            .filter((element) => element.title.includes(searchValue))
            .map((element) => (
              <UnstyledLink to={element.title}>
                <Pane
                  elevation={1}
                  hoverElevation={2}
                  activeElevation={2}
                  padding={minorScale(2)}
                  marginY={minorScale(2)}
                  display="flex"
                  alignItems="center"
                >
                  <Icon
                    icon={DragHandleVerticalIcon}
                    marginRight={minorScale(1)}
                  ></Icon>
                  <Heading>{element.title}</Heading>

                  {/* <Pane>
                  {element.tags.map((tag) => (
                    <Badge marginRight={minorScale(1)}>{tag}</Badge>
                  ))}
                </Pane> */}
                </Pane>
              </UnstyledLink>
            ))}
        </>
      </TabPane>
    );
  }

  function LibraryTab() {
    return (
      <TabPane>
        <>
          <Heading>Kommt bald</Heading>
          <Paragraph>
            Verwalte deine Lieblingsspiele und f&uuml;ge eigene Kreationen
            deiner Biblithek hinzu.
          </Paragraph>
        </>
      </TabPane>
    );
  }

  return (
    <Pane>
      {/* TODO migrate tabs out of routes to make relative links work */}
      <Routes>
        <Route
          index
          element={
            <>
              <SwitchGroup tab="inspiration" urlPrefix="."></SwitchGroup>
              <InspirationTab></InspirationTab>
            </>
          }
        ></Route>
        <Route
          path="inspiration"
          element={
            <>
              <SwitchGroup tab="inspiration" urlPrefix=".."></SwitchGroup>
              <InspirationTab></InspirationTab>
            </>
          }
        ></Route>
        <Route
          path="search"
          element={
            <Pane>
              <SwitchGroup tab="search" urlPrefix=".."></SwitchGroup>
              <SearchTab></SearchTab>
            </Pane>
          }
        ></Route>
        <Route
          path="library"
          element={
            <Pane>
              <SwitchGroup tab="library" urlPrefix=".."></SwitchGroup>
              <LibraryTab></LibraryTab>
            </Pane>
          }
        ></Route>
      </Routes>
    </Pane>
  );
}
export function WorkshopAddElementsPage() {
  return (
    <Page headerProps={{ showBackButton: true, title: "Neues Element" }}>
      <WorkshopAddElementsFragment></WorkshopAddElementsFragment>
    </Page>
  );
}

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
function useRouteMatch(arg0: string) {
  throw new Error("Function not implemented.");
}
