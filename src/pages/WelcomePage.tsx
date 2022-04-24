import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

interface ComponentProps {}

export function WelcomePage(props: ComponentProps) {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Impromat</p>
          <p className="subtitle">
            Generiere Workshops f&uuml;r Improvisationtheater
          </p>
        </div>
      </section>
      <div className="notification is-warning">
        Impromat ist noch in der Entwicklung.
      </div>
      <section className="section is-small">
        <div className="box">
          <p>
            Plane Improvisationtheater Spiele und &Uuml;bungen auf Knopfdruck.
          </p>
          <Link className="mt-4 button is-primary" to="/workshop">
            Plane Workshop
          </Link>
        </div>
        <div className="box">
          <h2 className="title">Warum?</h2>
          <p>
            Aufgrund folgender Frage in unsere Improgruppe: "Hey, hat jemand
            heute schon etwas f&uuml;r die Probe vorbereitet?"
          </p>
          <p>Und weil ich f&uuml;r Proben oft schnelle Inspiration suche.</p>
        </div>
        <div className="box">
          Impromat ist ein Open-Source Projekt und auf{" "}
          <a href="https://github.com/marcoklein/impromat" target="_blank">
            GitHub
          </a>{" "}
          zu finden.
        </div>
      </section>
    </>
  );
}
