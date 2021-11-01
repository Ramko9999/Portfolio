import React from "react";
import { Experience } from "../../interfaces/Experience";
import ExperienceTile from "./Tile";
import "./Experience.css";


type Props = {
    experiences: Experience[],
    sectionName: string
}

const View = ({experiences, sectionName}: Props) => {
 
    return (
        <div className="section">
            <div className="section-name">
                {sectionName}
            </div>
            <div>
                {experiences.map((exp: Experience, index)=> {
                    return (
                    <div key={index} style={{marginTop: "5%"}}>
                       <ExperienceTile experience={exp}/>     
                    </div>)
                })}
            </div>
        </div>
    )
}

export default View;