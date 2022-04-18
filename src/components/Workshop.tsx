import { WorkshopModel } from "../models/WorkshopModel";
import MarkdownIt from "markdown-it";
import { WorkshopElementCard } from "./WorkshopElementCard";

interface ComponentProps {
  workshop: WorkshopModel;
}

/**
 * Show information about a workshop.
 */
export function Workshop({ workshop }: ComponentProps) {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <h1 className="title">{workshop.title}</h1>
          <h1 className="subtitle">
            {workshop.elements.length} excercises and games for your improv
            session
          </h1>
        </div>
      </section>
      <section className="section is-small">
        {workshop.elements.map((element) => (
          <WorkshopElementCard element={element}></WorkshopElementCard>
        ))}
      </section>
    </>
  );
}
