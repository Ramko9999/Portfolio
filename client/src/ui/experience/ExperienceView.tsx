import React, {useState, useEffect} from "react";
import { Experience } from "../../interfaces/Experience";
import ExperienceApi from "../../api/Experience";
import ExperienceTile from "./ExperienceTile";
import ScrollLink from "../util/ScrollLink";


const ExperienceView = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Experience[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(()=>{
        ExperienceApi.getExperiences().then((dat)=>{
            setData(dat["experience"]);
        }).catch((error)=>{
            setError(true);
        }).finally(()=>{
            setLoading(false);
        })
    }, []);

    if(loading || data === null){
        return null;
    }

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
                {data.map((exp: Experience, index)=> {
                    return (<ExperienceTile key={index} experience={exp}/>)
                })}
            </div>
            <ScrollLink target="project-view" text="Go To Projects"/>
        </div>
    )
}

export default ExperienceView;