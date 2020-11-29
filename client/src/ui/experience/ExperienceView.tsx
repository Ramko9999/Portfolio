import React from "react";
import { Experience } from "../../interfaces/Experience";
import ExperienceTile from "./ExperienceTile";
import ScrollLink from "../util/ScrollLink";


type Props = {
    experiences: Experience[]
}
const ExperienceView = ({experiences}: Props) => {
 
    return (
        <div style={
            {
                overflow: "auto",
                width: "80%",
                minWidth: "500px",
                margin: "0 auto",
                padding: "10px",
                alignContent: "center",
                textAlign: "center"
              }
        }>
            <div style={
                {
                    color: "black",
                    fontSize: "300%"
                }
            }>
                Experience
            </div>
            <div style={{
                marginTop: "5%",
                width: "auto",
            }}>
                {experiences.map((exp: Experience, index)=> {
                    return (<ExperienceTile key={index} experience={exp}/>)
                })}
            </div>
            <ScrollLink target="project-view" text="Go To Projects"/>
        </div>
    )
}

export default ExperienceView;