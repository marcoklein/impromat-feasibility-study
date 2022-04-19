import { WorkshopModel } from "../models/WorkshopModel";
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
        <div className="hero is-primary">
          <div className="hero-body">
            <h1 className="title">{workshop.title}</h1>
            <h1 className="subtitle">
              {workshop.elements.length} &Uuml;bungen und Spiele f&uuml;r eine
              Improvisationstheaterprobe
            </h1>
          </div>
        </div>
      </section>
      <main className="section">
        <div className="container">
          {workshop.elements.map((element) => (
            <WorkshopElementCard element={element}></WorkshopElementCard>
          ))}
        </div>
      </main>
    </>
  );
}
