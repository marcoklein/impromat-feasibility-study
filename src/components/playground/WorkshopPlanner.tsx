interface ComponentProps {}

export function WorkshopPlanner({}: ComponentProps) {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero is-primary">
          <div className="hero-body">
            <h1 className="title">Aufw&auml;rmen</h1>
            <h1 className="subtitle">
              Diese Aufw&auml;rm&uuml;bungen k&ouml;nnten zu deinem Workshop
              passen. F&uuml;ge diese durch Anklicken hinzu.
            </h1>
          </div>
        </div>
      </section>
      <main className="section">
        <div className="container">
          <div className="box">
            <h3 className="title is-4">Das k&ouml;nnte passen</h3>
            {["Namensklatschen", "Raumlauf", "...", "..."].map((title) => (
              <div className="card mb-1">
                <div className="card-header">
                  <div className="card-header-title">{title}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="box">
            <h3 className="title is-4">Deine Auswahl</h3>
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">Namensklatschen</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
