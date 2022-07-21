import { IMPROV_DATABASE } from "../data/improv-database";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import { WorkshopModel } from "../models/WorkshopModel";

export function mapWorkshopElementTitlesToWorkshop(
  workshopElementTitles: string[]
) {
  const elements: WorkshopElementModel[] = [];
  for (const elementTitle of workshopElementTitles) {
    const element = IMPROV_DATABASE.find(({ title }) => elementTitle === title);
    if (element) {
      const { content, tags: elementTags, title, url, createdAt } = element;
      // const tags = elementTags.filter(
      //   (tagName) =>
      //     !["warmup", "excercise", "game"].find((tag) => tag === tagName)
      // );
      const tags = elementTags.map((tagName) => {
        const mappings = {
          warmup: "Aufwärmübung",
          excercise: "Übung",
          game: "Spiel",
        };
        return (mappings as any)[tagName] ?? tagName;
      });
      elements.push({
        content,
        tags,
        sourceUrl: url,
        title,
        sourceDate: createdAt,
      });
    } else {
      console.warn(
        `Found no workshop element with name "${elementTitle}". Skipping element.`
      );
    }
  }
  const workshop: WorkshopModel = {
    title: "Workshopinspiration",
    elements,
  };
  return workshop;
}
