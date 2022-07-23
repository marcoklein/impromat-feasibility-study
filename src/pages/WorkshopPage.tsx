import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/old/Navbar";
import { OldWorkshop } from "../components/old/OldWorkshop";
import {
  findRandomWorkshopElementTitle,
  generateWorkshop,
} from "../functions/generate-workshop";
import { mapWorkshopElementTitlesToWorkshop } from "../functions/map-workshop-element-titles-to-workshop";
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
    const workshop = mapWorkshopElementTitlesToWorkshop(workshopElementTitles);
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
      <OldWorkshop
        workshop={workshop}
        onChangeWorkshopElementClick={onChangeClick}
      ></OldWorkshop>
    </>
  );
}
