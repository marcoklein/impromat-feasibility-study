import {
  minorScale,
  MenuIcon,
  Heading,
  IconButton,
  Pane,
  ArrowLeftIcon,
} from "evergreen-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

interface PageHeaderComponentProps {
  showBackButton?: boolean;
  title?: string;
}

export function PageHeader({
  showBackButton,
  title,
}: PageHeaderComponentProps) {
  const navigate = useNavigate();
  return (
    <Pane
      display="flex"
      alignItems="center"
      elevation={2}
      padding={minorScale(2)}
    >
      {showBackButton ? (
        <IconButton
          appearance="minimal"
          icon={ArrowLeftIcon}
          marginRight={minorScale(2)}
          onClick={() => navigate("..")}
        ></IconButton>
      ) : (
        <IconButton
          appearance="minimal"
          icon={MenuIcon}
          marginRight={minorScale(2)}
        ></IconButton>
      )}

      <Pane flexGrow="1">
        <Heading>{title ? title : "Impromat"}</Heading>
      </Pane>
      {/* <Pane>
        <Button>New Workshop</Button>
      </Pane> */}
    </Pane>
  );
}

interface ComponentProps {
  headerElement?: JSX.Element;
  headerProps?: PageHeaderComponentProps;
  contentElement?: JSX.Element;
  children?: JSX.Element;
}

export function Page({
  headerElement,
  headerProps,
  contentElement,
  children,
}: ComponentProps) {
  return (
    <Pane>
      {headerElement ? (
        headerElement
      ) : (
        <PageHeader {...headerProps}></PageHeader>
      )}
      <Pane>
        {contentElement}
        {children}
      </Pane>
    </Pane>
  );
}
