import React, {useState} from "react";
import { Experience } from "../../interfaces/Experience";
import "./ExperienceTile.css";


type Props = {
    experience: Experience
}


const ExperienceTile = (props:Props) => {
    const {experience} = props;
    const {company, from, to, points, background, position, logo} = experience;
    const [expanded, setExpanded] = useState(false);
    
    return (
        <div id="exp-tile" onClick={()=> {setExpanded(!expanded)}} style={
            {
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "gray",
                borderRadius: "5px",
                textAlign: "justify",
                background: "white",
                minHeight: "85px"
            }
        }>
            <div style = {
                {
                    width: "100%",
                    margin: "auto",
                    verticalAlign: "middle"
                }
            }>
                <div style={
                    {
                        marginLeft: "2%",
                        display: "inline-block",
                    }
                }>
                    <img style={
                        {
                            margin: "auto",
                            maxWidth: "65px",
                            maxHeight: "65px"
                            
                        }
                    } src={logo} alt="TigerGraph"/>
                </div>
                <span style={
                    {
                        fontSize: "225%",

                    }
                }>
                <div style={
                    {
                        display: "inline-block",
                        marginLeft: "2%",
                    }
                }>
                 {position} 
                </div>
                <div className="clickable" style={
                    {
                        marginLeft: "2%",
                        display: "inline-block",
                        color: "#f06",
                    }
                }>
                  @{company}
                </div>
                </span>
            </div>
        </div>
    )
}

export default ExperienceTile;