import React from "react";
import { Experience } from "../../interfaces/Experience";
import "./Experience.css";

type Props = {
    experience: Experience
};

const ExperienceFooter = (props: Props) => {
    const { experience } = props;
    const { from, to } = experience;

    return (<div style={
        {
            borderTop: "1px solid rgba(0, 0, 0, 0.05)"
        }
    }>
        <div style={{
            margin: "2% 0% 2% 2%"
        }}>
            <span className="light-font">
                {`${from} - ${to}`}
            </span>
        </div>
    </div>)
};

export default ExperienceFooter;