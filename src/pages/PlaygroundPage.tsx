import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { WorkshopRoutes } from "../components/WorkshopRoutes";
import { SelectElements } from "../components/playground/SelectElements";

export function PlaygroundPage() {
  const components = [
    {
      name: "Select Elements",
      path: "select",
      element: <SelectElements></SelectElements>,
    },
    {
      name: "Evergreen",
      path: "evergreen",
      element: <WorkshopRoutes></WorkshopRoutes>,
    },
  ];

  function fallback() {
    return (
      <>
        <p>Testing and Preview of experimental components</p>
        {components.map(({ name, path }) => (
          <Link className="button" to={`./${path}`}>
            {name}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {/* <Navbar></Navbar> */}
      {/* <div>
        <Link className="button" to="/playground">
          Playground
        </Link>
      </div> */}
      <Routes>
        <Route index element={fallback()}></Route>
        {components.map(({ path, element }) => (
          <Route path={`${path}/*`} element={element}></Route>
        ))}
      </Routes>
    </>
  );
}
