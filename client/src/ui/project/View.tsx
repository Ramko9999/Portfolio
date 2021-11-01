import React from "react";
import { Project } from "../../interfaces/Project";
import ProjectTile from "./Tile";
import {List} from "antd";


type Props = {
    projects: Project[]
}


const THRESHOLD_WIDTH = 500;

const ProjectView = ({projects}:Props) => {

    const hoverEnabled = window.innerWidth >= THRESHOLD_WIDTH;
    const tileColumns = hoverEnabled ? 2 : 1;

    return (
     <div className="section" style={{maxWidth: "1000px"}}>
        <div className="section-name">
            Projects
        </div>
        <div style ={
            {
                marginTop: "5%"
            }
        }>
            <List
                grid={{
                    gutter: 16,
                    column: tileColumns,
                }}
                itemLayout="vertical"
                size="large"
                dataSource={projects}
                renderItem={(data, index) => (
                    <div style={{margin: "5%"}}>
                        <ProjectTile
                            key={index}
                            project={data}
                            hoverEnabled={hoverEnabled}
                        />
                    </div>
                
                )}
            />
        </div>
    </div>);
}

export default ProjectView;