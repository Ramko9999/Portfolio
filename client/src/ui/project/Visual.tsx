import React from "react";
import {Project} from "../../interfaces/Project";

const ProjectVisual = ({image}: Project) => {

    return (
      <div>
        <img key={image} className="project-visual" src={image} alt="" />
      </div>
  
    );
  }
  
  export default ProjectVisual;