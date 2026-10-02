export default function ProjectLabel({ index, title, tamil, extra }: { index: string; title: string; tamil?: string; extra?: string }) {
  return (
    <div className="project-label">
      <span className="project-label-kicker">My Projects · {index}</span>
      <span className="project-label-title">{title}</span>
      {tamil && (
        <span className="project-label-ta" lang="ta">
          {tamil}
        </span>
      )}
      {extra && <span className="project-label-extra">{extra}</span>}
    </div>
  );
}
