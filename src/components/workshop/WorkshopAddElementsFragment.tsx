import {
  minorScale,
  LightningIcon,
  SearchIcon,
  BookIcon,
  majorScale,
  DragHandleVerticalIcon,
  Button,
  Group,
  Heading,
  Icon,
  Pane,
  Paragraph,
  TextInput,
} from "evergreen-ui";
import React, { useState } from "react";
import {
  useMatch,
  useResolvedPath,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { IMPROV_DATABASE } from "../../data/improv-database";
import { WorkshopElementModel } from "../../models/WorkshopElementModel";
import { UnstyledLink } from "../shared/UnstyledLink";

export function WorkshopAddElementsFragment() {
  function SwitchGroup() {
    const searchMatch = useMatch({
      path: useResolvedPath("search").pathname,
      end: true,
    });
    const libraryMatch = useMatch({
      path: useResolvedPath("library").pathname,
      end: true,
    });
    const inspirationMatch =
      useMatch({
        path: useResolvedPath("inspiration").pathname,
        end: true,
      }) ||
      (!searchMatch && !libraryMatch);
    return (
      <>
        <Pane display="flex">
          <Group flexGrow="1" display="flex">
            <Button
              is={NavLink}
              to="./inspiration"
              appearance={inspirationMatch ? "primary" : "default"}
              flexGrow="1"
              borderRadius="0"
            >
              <Icon marginRight={minorScale(2)} icon={LightningIcon}></Icon>
              Inspiration
            </Button>

            <Button
              is={NavLink}
              to="./search"
              appearance={searchMatch ? "primary" : "default"}
              flexGrow="1"
              borderRadius="0"
            >
              <Icon marginRight={minorScale(2)} icon={SearchIcon}></Icon>
              Suche
            </Button>
            <Button
              is={NavLink}
              to="./library"
              appearance={libraryMatch ? "primary" : "default"}
              flexGrow="1"
              borderRadius="0"
            >
              <Icon marginRight={minorScale(2)} icon={BookIcon}></Icon>
              Bibliothek
            </Button>
          </Group>
        </Pane>
        <Outlet></Outlet>
      </>
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
    const [searchValue, setSearchValue] = useState("");
    const [elements] = useState(
      IMPROV_DATABASE.map((element): WorkshopElementModel => {
        return {
          sourceDate: element.createdAt,
          content: element.content,
          sourceUrl: element.url,
          tags: [],
          title: element.title,
        };
      })
    );
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
      <Routes>
        <Route path="/" element={<SwitchGroup></SwitchGroup>}>
          <Route index element={<InspirationTab></InspirationTab>}></Route>
          <Route
            path="inspiration"
            element={<InspirationTab></InspirationTab>}
          ></Route>
          <Route path="search" element={<SearchTab></SearchTab>}></Route>
          <Route path="library" element={<LibraryTab></LibraryTab>}></Route>
        </Route>
      </Routes>
    </Pane>
  );
}
