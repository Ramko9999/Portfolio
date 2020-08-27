import React, { useState, useEffect } from "react";
import ProjectApi from "../../api/Project";
import { Project } from "../../interfaces/Project";
import ProjectTile from "./ProjectTile";
import {List} from "antd";
import ScrollLink from "../util/ScrollLink";



const ProjectView = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<Project[] | null>(null);

    useEffect(() => {
        ProjectApi.getProjects().then((dat) => {
            setData(dat["projects"])
            setLoading(false)
        }).catch((error) => {
            setError(true);
            setLoading(false);
        });
    }, []);


    if (loading || data === null) {
        return null;
    }

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
        <div>
            <List
                grid={{
                    gutter: 16,
                    column: 2,
                }}
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(data, index) => (
                    <ProjectTile
                        {...data}
                    />
                )}
            />
        </div>
        <ScrollLink target="blog-view" text="Go To Blogs"/>
    </div>);
}

export default ProjectView;