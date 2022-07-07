export function setHTMLOverflow(overflow: "hidden" | "inherit") {
  document.getElementsByTagName("html").item(0)!.style.overflow = overflow;
}
