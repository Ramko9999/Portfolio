import React from "react";
import ColorHash from "../../api/ColorHash";
import "./Project.css";

type Props = {
    topic: string
}

const TopicTag = ({ topic }: Props) => {

    return (<div className="project-tag" style={{ backgroundColor: ColorHash.getRGBColor(topic) }}>
        <div style={{
            margin: "0px 2px 0px 2px"
        }}>
            {topic}
        </div>
    </div>);
}

export default TopicTag;