/** Big centred project title shown as each project begins; it lifts away once scrubbing starts. */
export default function ProjectIntro({ index, title, tamil, tagline }: { index: string; title: string; tamil: string; tagline: string }) {
  return (
    <div className="project-intro">
      <span className="project-intro-index">Project {index}</span>
      <p className="project-intro-ta" lang="ta">
        {tamil}
      </p>
      <h2 className="project-intro-title">{title}</h2>
      <p className="project-intro-tag">{tagline}</p>
    </div>
  );
}
