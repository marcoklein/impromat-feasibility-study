import {
  Button,
  DoubleChevronLeftIcon,
  DragHandleVerticalIcon,
  FilterIcon,
  Heading,
  Icon,
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
import { Outlet } from "react-router-dom";
import { generateWorkshop } from "../../functions/generate-workshop";
import { mapWorkshopElementTitlesToWorkshop } from "../../functions/map-workshop-element-titles-to-workshop";
import { WorkshopElementModel } from "../../models/WorkshopElementModel";
import { EditInput } from "../shared/EditInput";
import { UnstyledLink } from "../shared/UnstyledLink";

interface WorkshopComponentProps {
  allowEdit: boolean;
}

export function WorkshopComponent({ allowEdit }: WorkshopComponentProps) {
  const [workshop] = useState(
    mapWorkshopElementTitlesToWorkshop(generateWorkshop())
  );

  const [workshopTitle, setWorkshopTitle] = useState(workshop.title);

  const [selectedElement, setSelectedElement] =
    useState<WorkshopElementModel>();

  const [showFilter, setShowFilter] = useState(false);

  function AllowEdit(props: { children: JSX.Element }) {
    if (allowEdit) return props.children;
    return <></>;
  }

  return (
    <Pane>
      <Pane display="flex" alignItems="center" margin={majorScale(2)}>
        <Pane flexGrow="1">
          <Heading display="flex" alignItems="center">
            {allowEdit ? (
              <EditInput
                value={workshopTitle}
                onChangeValue={(newValue) => setWorkshopTitle(newValue)}
              ></EditInput>
            ) : (
              workshopTitle
            )}
          </Heading>
        </Pane>
        <Pane>
          {showFilter && (
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
          )}
          <IconButton
            appearance="minimal"
            icon={DoubleChevronLeftIcon}
          ></IconButton>
          {/* <IconButton icon={MenuIcon} appearance="minimal"></IconButton> */}
        </Pane>
      </Pane>

      <Pane id="left-pane" display="flex">
        <Pane id="left" flexGrow="1" flexShrink="0.3" paddingX={minorScale(2)}>
          {workshop.elements.map((element) => (
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
          <Pane
            id="bottom"
            display="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            <AllowEdit>
              <UnstyledLink to="add">
                <Button appearance="primary">Neues Element</Button>
              </UnstyledLink>
            </AllowEdit>
          </Pane>
        </Pane>

        <Outlet></Outlet>
      </Pane>
    </Pane>
  );
}
