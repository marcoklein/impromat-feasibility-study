import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Workshop } from "../components/Workshop";
import { IMPROWIKI } from "../data/improwiki";
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

  function generateWorkshop() {
    setWorkshop(undefined);
    const workshopElementTitles: string[] = [];
    for (let i = 0; i < 8; i++) {
      const { title } = IMPROWIKI[Math.floor(Math.random() * IMPROWIKI.length)];
      workshopElementTitles.push(title);
    }
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
      const element = IMPROWIKI.find(({ title }) => elementTitle === title);
      if (element) {
        const { content, tags, title, url, createdAt } = element;
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
      generateWorkshop();
    } else {
      const elements = searchParams.getAll(SEARCH_PARAM_ELEMENT_NAME);
      console.log("get search params", elements);
      loadWorkshop(elements);
    }
  }, [searchParams]);

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
      <Workshop workshop={workshop}></Workshop>
    </>
  );
}
