import { Experience } from "../../interfaces/Experience";
import "./Experience.css";

type Props = {
    experience: Experience
};

const ExperienceHeader = (props: Props) => {
    const { experience } = props;
    const { position, name, logo} = experience;

    const getLogo = () => {
        return (
            <img className="logo" src={logo} alt="Logo" />
        );
    };

    const getTitle = () => {
        return (<div>
                <div className="strong-font">
                    {name}
                </div>
                <div className="light-font">
                    {position}
                </div>  
        </div>);
    };

    return (<div className="experience-header">
        <div style={{
            verticalAlign: "middle",
        }}>
            <div style={{
                margin: "2% 0% 2% 2%",
                display: "inline-block",
            }}>
                {getTitle()}
            </div>
            <div style={{
                margin: "2% 2% 2% 0%",
                float: "right"
            }}>
                {getLogo()}
            </div>
        </div>
    </div>);
}

export default ExperienceHeader;