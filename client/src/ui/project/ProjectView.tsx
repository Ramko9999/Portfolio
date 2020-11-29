import React from "react";
import { Project } from "../../interfaces/Project";
import ProjectTile from "./ProjectTile";
import {List} from "antd";


type Props = {
    projects: Project[]
}


const ProjectView = ({projects}:Props) => {

    return (
    
     <div style={{
        overflow: "auto",
        width: "80%",
        minWidth: "500px",
        margin: "0 auto",
        padding: "10px",
        alignContent: "center",
        textAlign: "center"
      }}>
        <div style={
            {
                fontSize: "300%",
                color: "black"
            }
        }>
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
                    column: 2,
                }}
                itemLayout="vertical"
                size="large"
                dataSource={projects}
                renderItem={(data, index) => (
                    <ProjectTile
                        {...data}
                    />
                )}
            />
        </div>
    </div>);
}

export default ProjectView;