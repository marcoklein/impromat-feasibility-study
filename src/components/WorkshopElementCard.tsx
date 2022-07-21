import {
  mdiChevronDown,
  mdiChevronUp,
  mdiDiceMultipleOutline,
  mdiEye,
} from "@mdi/js";
import Icon from "@mdi/react";
import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";
import { setHTMLOverflow } from "../helpers/set-html-overflow";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import { ImprowikiLicenseText } from "./ImprowikiLicenseText";
import { Markdown } from "./Markdown";
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
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const [options, setOptions] = useState({
    workshopElementCard: { showTagsInPreview: true },
  });

  useEffect(() => {
    if (!isCollapsed) {
      setHTMLOverflow("hidden");
    } else {
      setHTMLOverflow("inherit");
    }
  }, [isCollapsed]);

  const modalContent = (
    <>
      <div className="tags are-small my-0">
        {tags.map((tag) => (
          <span key={tag} className="tag is-light">
            #{tag}
          </span>
        ))}
      </div>
      <Markdown text={content}></Markdown>
      <ImprowikiLicenseText
        sourceUrl={sourceUrl}
        title={title}
        date={sourceDate}
      ></ImprowikiLicenseText>
    </>
  );

  return (
    <div key={title} className="p-1" style={{ overflow: "hidden" }}>
      <div className={`modal ${!isCollapsed ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head has-background-primary">
            <p className="title is-5 m-0 is-flex-grow-1">{title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              Close
            </button>
          </header>
          <section className="modal-card-body">{modalContent}</section>
          <footer className="modal-card-foot py-0">
            <button
              className="button is-light"
              onClick={() => onChangeClick(element)}
            >
              <span className="icon-text">
                <Icon className="icon" path={mdiDiceMultipleOutline}></Icon>
                <span>Change</span>
              </span>
            </button>
          </footer>
        </div>
      </div>

      <div className="card">
        <header className="card-header">
          <div className="is-flex-grow-1">
            <p
              className="card-header-title is-clickable"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {title}
            </p>
            {options.workshopElementCard.showTagsInPreview && (
              <div className="tags are-small px-4 pb-4">
                {tags.map((tag) => (
                  <span key={tag} className="tag is-light">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="buttons pr-3">
            <button
              className="button is-black is-responsive is-inverted is-align-self-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Icon
                className="icon"
                path={isShowingOptions ? mdiChevronUp : mdiChevronDown}
              ></Icon>
            </button>
          </div>
        </header>
        <div className="card-footer"></div>
        {isShowingOptions && (
          <footer className="card-footer">
            <button
              className="button is-ghost card-footer-item"
              onClick={() => setIsCollapsed(false)}
            >
              <span className="icon-text">
                <Icon className="icon" path={mdiEye}></Icon>
                <span>View</span>
              </span>
            </button>
            <button
              className="button is-ghost card-footer-item"
              onClick={() => onChangeClick(element)}
            >
              <span className="icon-text">
                <Icon className="icon" path={mdiDiceMultipleOutline}></Icon>
                <span>Change</span>
              </span>
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
