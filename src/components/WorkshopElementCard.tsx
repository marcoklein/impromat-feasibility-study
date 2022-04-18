import MarkdownIt from "markdown-it";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import React from "react";
import { ImprowikiLicenseText } from "./ImprowikiLicenseText";
const markdownRender = new MarkdownIt();

interface ComponentProps {
  element: WorkshopElementModel;
}

/**
 * Show information about a workshop element in a card.
 */
export function WorkshopElementCard({ element }: ComponentProps) {
  const { title, content, tags, sourceUrl } = element;
  return (
    <>
      <div key={title} className="box">
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag} className="tag is-info">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="title">{title}</h2>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: markdownRender.render(content),
          }}
        ></p>
        <ImprowikiLicenseText
          sourceUrl={sourceUrl}
          title={title}
        ></ImprowikiLicenseText>
      </div>
    </>
  );
}
