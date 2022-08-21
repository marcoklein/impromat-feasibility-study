import {
  CrossIcon,
  Heading,
  IconButton,
  minorScale,
  Pane,
  Paragraph,
} from "evergreen-ui";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { IMPROV_DATABASE } from "../../data/improv-database";

export function WorkshopElementDetailsFragment() {
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
