import React from "react";
import { Project } from "../../interfaces/Project";
import { Space } from "antd";
import TopicTag from "./TopicTag";


const ProjectOverlay = ({ description, name, topics, url }: Project) => {

    const getBullets = () => {
        return description.split(".")
            .map((bullet) => bullet.trim())
            .filter((bullet) => bullet.length > 0)
            .map((bullet: string, index: number) => {
                
                let txt = bullet.trim();
                if (txt.length > 0) {
                    txt += ".";
                }
                return (<div key={index} className="light-font restrict-spacing" 
                    style={{color:"white"}}>{txt}</div>);
            });
    };

    return (

        <div className="project-overlay">
            <div className="strong-font" style={{color: "white"}}>
                {name}
            </div>
            <div>
                <Space direction="vertical" size="middle">
                    {getBullets()}
                </Space>
            </div>
            <div onClick={() => { window.open(url) }}
                className="clickable light-font" style={
                    {
                        marginTop: "5%",
                        textDecoration: "underline",
                        color: "white"
                    }
                }>
                View Source Code
            </div>
            <div style={{
                marginTop: "1%"
            }}>
                <div>
                    {topics.map((topic, index) => {
                        return (
                            <div key={index} style={{ margin: "2% 0% 0% 2%", display: "inline-block" }}>
                                <TopicTag topic={topic} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>)
}

export default ProjectOverlay;