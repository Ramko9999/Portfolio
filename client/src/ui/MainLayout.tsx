import React, { useState } from "react"
import ProjectView from "./project/ProjectView";
import ExperienceView from "./experience/ExperienceView";
import { Layout } from "antd";
import HomeView from "./home/HomeView";
import FooterView from "./home/FooterView";



const { Content } = Layout;


const MainLayout = () => {

  return (
    <div style={{ background: "#dae5ed" }}>
      <div style={
        {
          marginTop: "17%",
          float: "left",
          overflow: "auto"
        }
      }>
        <HomeView />
        <div id="experience-view" style={
          {
            marginTop: "27%"
          }
        }>
          <ExperienceView />
        </div>
        <div id="project-view" style={
          {
            marginTop: "27%",
          }
        }>
          <ProjectView />
        </div>
        <div style={
          {
            marginTop: "15%"
          }
        }>
          <FooterView />
        </div>
      </div>
    </div>

  );

}

export default MainLayout;