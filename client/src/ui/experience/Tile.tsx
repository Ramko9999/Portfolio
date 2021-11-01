import { useState } from "react";
import { Experience } from "../../interfaces/Experience";
import ExperienceHeader from "./Header";
import ExperienceFooter from "./Footer";


type Props = {
    experience: Experience
}

const ExperienceTile = (props: Props) => {
    const { experience } = props;
    const { points, background } = experience;
    const [isOpen, setIsOpen] = useState(false);


    const getBody = () => {
        return (
            <div className="light-font restrict-spacing" style={
                {
                    margin: "1% 2% 1% 2%",
                    color: "black"
                }
            } onClick = {(event) => event.stopPropagation()}>
                {background}
                {getBullets()}
            </div>);
    }

    const getBullets = () => {
        return points.map((point, index) => {
            return (
                <div key={index}>
                    <div style={
                        {
                            margin: "2% 0% 0% 2%"
                        }
                    }>
                        <div className="light-font" style={
                            {
                                display: "inline-block"
                            }
                        }>
                            {"-"}
                        </div>
                        {`   ${point}`}
                    </div>
                </div>
            )
        });
    }

    return (
        <div className="experience-tile" onClick={() => { setIsOpen(!isOpen) }}>
            <ExperienceHeader experience={experience} />
            {isOpen ? getBody() : null}
            <ExperienceFooter experience={experience} />
        </div>
    )
}

export default ExperienceTile;