import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

interface ComponentProps {}

export function WelcomePage(props: ComponentProps) {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Impromat</p>
          <p className="subtitle">
            Generate Workshops for Improvisational Theatre
          </p>
        </div>
        <div className="notification is-warning is-small">
          Impromat is still work in progress and not yet fully complete.
        </div>
      </section>
      <section className="section is-small">
        <div className="box">
          <p>
            Create worskhops for improvisational theatre with the press of a
            button.
          </p>
          <Link className="mt-4 button is-primary" to="workshop">
            Plan Workshop
          </Link>
        </div>
        <div className="box">
          <h2 className="title">Why?</h2>
          <p>
            Because we often had the following question in our improvisational
            theatre group: "Hey, has somebody prepared something for our improv
            session tonight?"
          </p>
          <p>
            And because I have often wandered through Improwiki or other improv
            ressources to gather inspiration for new workshops.
          </p>
        </div>
      </section>
    </>
  );
}
