import MarkdownIt from "markdown-it";
import React from "react";
const markdownRender = new MarkdownIt();

interface ComponentProps {
  text: string;
}

export function Markdown({ text: markdownText }: ComponentProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: markdownRender.render(markdownText) }}
    ></div>
  );
}
