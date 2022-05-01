import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Workshop } from "../components/Workshop";
import { IMPROV_DATABASE } from "../data/improv-database";
import {
  findRandomWorkshopElementTitle,
  generateWorkshop,
} from "../functions/generate-workshop";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import { WorkshopModel } from "../models/WorkshopModel";

const SEARCH_PARAM_ELEMENT_NAME = "i";

/**
 * Renders workshop information.
 * If the url contains no workshop information it generates a new one.
 */
export function WorkshopPreviewPage() {
  const [workshop, setWorkshop] = useState<WorkshopModel>();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeClick = useCallback(
    (element: WorkshopElementModel) => {
      const elements = searchParams.getAll(SEARCH_PARAM_ELEMENT_NAME);
      const index = elements.indexOf(element.title);
      if (index < 0) {
        console.warn("Element to change not in workshop.");
        return;
      }
      elements[index] = findRandomWorkshopElementTitle();

      setSearchParams(
        { [SEARCH_PARAM_ELEMENT_NAME]: elements },
        { replace: true }
      );
    },
    [workshop]
  );

  function generateWorkshopCallback() {
    setWorkshop(undefined);
    const workshopElementTitles = generateWorkshop();
    setTimeout(() => {
      setSearchParams(
        { [SEARCH_PARAM_ELEMENT_NAME]: workshopElementTitles },
        { replace: true }
      );
    }, 3000);
  }

  function loadWorkshop(workshopElementTitles: string[]) {
    const elements: WorkshopElementModel[] = [];
    for (const elementTitle of workshopElementTitles) {
      const element = IMPROV_DATABASE.find(
        ({ title }) => elementTitle === title
      );
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
    setWorkshop(workshop);
  }

  useEffect(() => {
    if (!searchParams.has(SEARCH_PARAM_ELEMENT_NAME)) {
      console.log("set search params");
      generateWorkshopCallback();
    } else {
      const elements = searchParams.getAll(SEARCH_PARAM_ELEMENT_NAME);
      console.log("get search params", elements);
      loadWorkshop(elements);
    }
  }, [searchParams, setWorkshop, setSearchParams]);

  if (!workshop)
    return (
      <>
        <section className="hero is-primary is-fullheight">
          <div className="hero-body">
            <div>
              <h1 className="title">Plane Probe</h1>
              <h1 className="subtitle">gleich fertig</h1>
              <div style={{ textAlign: "left" }}>
                <div className="button is-loading is-ghost is-disabled is-large"></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );

  return (
    <>
      <Navbar></Navbar>
      <Workshop
        workshop={workshop}
        onChangeWorkshopElementClick={onChangeClick}
      ></Workshop>
    </>
  );
}
