import React, { useState } from "react";
import { Project } from "../../interfaces/Project";
import { useSpring, animated } from "react-spring";
import "./Project.css";
import ProjectOverlay from "./Overlay";
import ProjectVisual from "./Visual";

type Props = {
  project: Project,
  hoverEnabled: boolean
}

const ProjectTile = ({project, hoverEnabled}: Props) => {
  const [hover, setHover] = useState(false);

  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  let style;

  if ((!hoverEnabled) || hover) {
    style = { "filter": "brightness(30%)" };
  }
  else {
    style = {}
  }

  const handleMouseEnter = () => {
    if (hoverEnabled){
      setHover(true);
    }
  }

  const handleMouseLeave = () => {
    if (hoverEnabled){
      setHover(false);
    }
  }

  return (
    <animated.div style={animationProps}>
        <div style={{position:"relative"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {(!hoverEnabled || hover) && <ProjectOverlay {...project} />}
          <div style={style}>
            <ProjectVisual {...project} />
          </div>
        </div>
    </animated.div>
  );
}

export default ProjectTile;