import MarkdownIt from "markdown-it";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import React, { useState } from "react";
import { ImprowikiLicenseText } from "./ImprowikiLicenseText";
const markdownRender = new MarkdownIt();

interface ComponentProps {
  element: WorkshopElementModel;
}

/**
 * Show information about a workshop element in a card.
 */
export function WorkshopElementCard({ element }: ComponentProps) {
  const { title, content, tags, sourceUrl, sourceDate } = element;
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      <div key={title} className="box">
        <div className="is-flex">
          <div className="tags is-flex-grow-1">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <button
            className="button is-info is-outlined is-small is-rounded ml-1"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "Aufklappen" : "Einklappen"}
          </button>
        </div>
        <h2 className="title">{title}</h2>
        {isCollapsed ? (
          <hr></hr>
        ) : (
          <>
            <p
              className="content"
              dangerouslySetInnerHTML={{
                __html: markdownRender.render(content),
              }}
            ></p>
            <ImprowikiLicenseText
              sourceUrl={sourceUrl}
              title={title}
              date={sourceDate}
            ></ImprowikiLicenseText>
          </>
        )}
      </div>
    </>
  );
}
