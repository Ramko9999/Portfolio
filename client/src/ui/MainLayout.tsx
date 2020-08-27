import React, { useState } from "react"
import ProjectView from "./project/ProjectView";
import BlogView from "./blog/BlogView";
import ExperienceView from "./experience/ExperienceView";
import { Layout} from "antd";
import HomeView from "./home/HomeView";



const {Content} = Layout;


const MainLayout = () => {

  return (
    <Layout>
     <Content style={{
        marginTop: "17%",
        float: "left",
        overflow: "auto"
      }} >
      <HomeView/>
      <div id="experience-view" style={
        {
          marginTop: "27%"
        }
      }>
        <ExperienceView/>
      </div>
      <div id="project-view" style={
        {
          marginTop: "27%",
        }
      }>
        <ProjectView/>
      </div>
      <div id="blog-view" style={
        {
          marginTop: "27%",
        }
      }>
        <BlogView/>
      </div>
    </Content>
    </Layout>

  );

}

export default MainLayout;