import { useState, CSSProperties } from "react";
import { Experience } from "../../Interface";
import "./Experience.css";

const Tile = ({
  background,
  position,
  team,
  tech,
  name,
  from,
  to,
  display,
}: Experience) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const expHeaderStyle: CSSProperties = {
    background: display.background,
    color: display.text,
    fontFamily: display.font,
    borderColor: display.background,
  };

  let expStyle: CSSProperties = {};
  if (isOpen || isHovered) {
    expStyle = { ...expStyle, boxShadow: `0px 0px 5px ${display.background}` };
  }

  return (
    <div
      className="experience"
      style={expStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="experience-heading" style={expHeaderStyle}>
        <div className="experience-title">{name}</div>
        <div className="experience-meta">
          <div>{position}</div>
          <div>{`${from} - ${to}`}</div>
        </div>
      </div>
      {isOpen && (
        <div className="experience-content">
          <div>
            <strong>Team: </strong>
            <span>{team}</span>
          </div>
          <div>
            <strong>Background: </strong>
            <span>{background}</span>
          </div>
          <div>
            <strong>Tech: </strong>
            <span>{`${tech.join(", ")}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

type Props = {
  experiences: Experience[];
};

const View = ({ experiences }: Props) => {
  return (
    <div className="section">
      <div className="experience-list">
        <div className="section-title">Experience</div>
        {experiences.map((exp: Experience, index) => {
          return <Tile key={index} {...exp} />;
        })}
      </div>
    </div>
  );
};

export default View;
