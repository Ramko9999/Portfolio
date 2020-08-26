import React, { useState } from "react"
import ProjectView from "./project/ProjectView";
import BlogView from "./blog/BlogView";
import ExpView from "./exp/ExpView";
import { Layout, Row, Col, Typography, Button } from "antd";
import HomeView from "./home/HomeView";

const PROJECT = "project";
const BLOG = "blog";
const EXPERIENCE = "exp";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout = () => {
  const [view, setView] = useState(PROJECT);

  const getComponent = () => {
    switch (view) {
      case PROJECT:
        return <ProjectView />
      case BLOG:
        return <BlogView />
      case EXPERIENCE:
        return <ExpView />
      default:
        return (<div>Select a view</div>)
    }
  }

  return (
    <Layout>
     <Content style={{
        marginTop: "17%",
        float: "left",
        overflow: "auto"
      }} >
      <HomeView/>
      {getComponent()}
    </Content>
    </Layout>

  );

}

export default MainLayout;