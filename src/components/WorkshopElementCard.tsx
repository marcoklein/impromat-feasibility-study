import MarkdownIt from "markdown-it";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import React, { useState } from "react";
import { ImprowikiLicenseText } from "./ImprowikiLicenseText";
const markdownRender = new MarkdownIt();

interface ComponentProps {
  element: WorkshopElementModel;
  onChangeClick: (element: WorkshopElementModel) => void;
}

/**
 * Show information about a workshop element in a card.
 */
export function WorkshopElementCard({
  element,
  onChangeClick,
}: ComponentProps) {
  const { title, content, tags, sourceUrl, sourceDate } = element;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  return (
    <>
      <div key={title} className="box">
        <div
          className="is-clickable"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h2 className="title mb-2">{title}</h2>
          <div
            style={{
              overflow: "auto",
              overflowY: "auto",
              height: isCollapsed ? "6rem" : "70vh",
            }}
          >
            <p
              // className={`content is-clickable ${
              //   isCollapsed ? "has-text-grey" : ""
              // }`}
              onClick={() => setIsCollapsed(!isCollapsed)}
              dangerouslySetInnerHTML={{
                __html: markdownRender.render(content),
              }}
            ></p>

            <div className="tags has-text-grey-darker has-background-white-ter is-rounded p-1">
              {tags.map((tag) => (
                <span key={tag} className="is-size-7 mx-1">
                  #{tag}
                </span>
              ))}
            </div>

            <ImprowikiLicenseText
              sourceUrl={sourceUrl}
              title={title}
              date={sourceDate}
            ></ImprowikiLicenseText>
          </div>
          <div
            className="button is-ghost is-small is-fullwidth"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "Aufklappen" : "Einklappen"}
          </div>
        </div>
        <hr className="mb-3 mt-2"></hr>

        <div className="buttons are-small is-flex">
          <div className="is-flex-grow-1">
            <button
              className={`button ${isLocked ? "" : "is-info"}`}
              onClick={() => setIsLocked(!isLocked)}
            >
              {isLocked ? "Entsperren" : "Sperren"}
            </button>
          </div>

          <button
            className="button"
            disabled={isLocked}
            onClick={() => onChangeClick(element)}
          >
            Neue Übung
          </button>
        </div>
      </div>
    </>
  );
}
