import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Workshop } from "../components/Workshop";
import { IMPROWIKI } from "../data/improwiki";
import { WorkshopElementModel } from "../models/WorkshopElementModel";
import { WorkshopModel } from "../models/WorkshopModel";

export function WorkshopPage() {
  const [workshop, setWorkshop] = useState<WorkshopModel>();

  useEffect(() => {
    const elements: WorkshopElementModel[] = [];
    for (let i = 0; i < 10; i++) {
      // TODO map entries
      const { content, tags, title, url } =
        IMPROWIKI[Math.floor(Math.random() * IMPROWIKI.length)];
      elements.push({ content, tags, sourceUrl: url, title });
    }
    const workshop: WorkshopModel = {
      title: "Workshop",
      elements,
    };
    setWorkshop(workshop);
  }, [setWorkshop]);

  if (!workshop) return <span>Loading ...</span>;
  return (
    <>
      <Navbar></Navbar>
      <Workshop workshop={workshop}></Workshop>
    </>
  );
}
