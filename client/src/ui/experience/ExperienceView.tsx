import React, {useState, useEffect} from "react";
import { Experience } from "../../interfaces/Experience";
import ExperienceApi from "../../api/Experience";
import ExperienceTile from "./ExperienceTile";


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
                {data.map((exp: Experience)=> {
                    return (<ExperienceTile experience={exp}/>)
                })}
            </div>
        </div>
    )
}

export default ExperienceView;