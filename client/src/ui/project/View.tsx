import { CSSProperties } from "react";
import { Project } from "../../Interface";
import { getRGBColor } from "../../Util";
import "./Project.css";

const getPoints = (description: string) => {
  return description
    .split(".")
    .filter((point) => point.trim().length > 0)
    .map((point) => `${point}.`);
};

const Tile = ({ description, url, name, image, topics }: Project) => {
  const points = getPoints(description);

  return (
    <div className="project">
      <div className="project-overlay">
        <div className="project-content">
          <div
            className="project-title clickable"
            onClick={() => window.open(url)}
          >
            {name}
          </div>
          {points.map((point, index) => {
            return (
              <div key={index} className="project-content-point">
                {point}
              </div>
            );
          })}
          <div className="project-topics">
            {topics.map((topic, index) => {
              const topicStyle: CSSProperties = {
                backgroundColor: getRGBColor(topic),
              };
              return (
                <div key={index} className="project-topic" style={topicStyle}>
                  {topic}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <img src={image} className="project-visual" />
    </div>
  );
};

type Props = {
  projects: Project[];
};

const View = ({ projects }: Props) => {
  return (
    <div className="section">
      <div className="section-title">Projects</div>
      <div className="project-list">
        {projects.map((project, index) => {
          return <Tile key={index} {...project} />;
        })}
      </div>
    </div>
  );
};

export default View;
