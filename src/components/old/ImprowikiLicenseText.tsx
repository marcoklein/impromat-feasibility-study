interface ComponentProps {
  sourceUrl: string;
  title: string;
  date: string;
}

export function ImprowikiLicenseText({
  sourceUrl,
  title,
  date,
}: ComponentProps) {
  return (
    <div className="is-italic is-size-7">
      <span className="has-text-weight-bold">Lizenz: </span>
      Inhalt basiert auf{" "}
      <a href={sourceUrl} target="_blank">
        {title}
      </a>{" "}
      unter der{" "}
      <a href="https://improwiki.com/de/lizenz" target="_blank">
        CC BY-SA 3.0
      </a>{" "}
      Lizenz von{" "}
      <a href="https://improwiki.com" target="_blank">
        improwiki.de
      </a>{" "}
      ({new Date(date).toLocaleDateString()})
    </div>
  );
}
