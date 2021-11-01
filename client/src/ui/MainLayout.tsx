import React, { useState, useEffect } from "react"
import ProjectView from "./project/View";
import ExperienceView from "./experience/View";
import AboutView from "./about/View";
import DataApi from "../api/Data";
import { Experience } from "../interfaces/Experience";
import { Project } from "../interfaces/Project";
import Loader from "./util/Loader";
import ParticlesBackground from "./particles/ParticlesBackground";
import FooterView from "./footer/View";
import "./Main.css";
import RequestStatus from "./util/RequestStatus";


const MainLayout = () => {

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.LOADING);
  const [workData, setWorkData] = useState<Experience[]>([]);
  const [educationData, setEducationData] = useState<Experience[]>([]);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    DataApi.getData().then((data) => {
      if (data.error) {
        setRequestStatus(RequestStatus.ERROR);
      }
      else {
        const { projects, work, education } = data;
        setProjectData(projects);
        setWorkData(work);
        setEducationData(education);
      }
    }).catch((r) => {
      setRequestStatus(RequestStatus.ERROR);
    }).finally(() => {
      setRequestStatus(RequestStatus.SUCCESS);
    });

    return () => { }
  }, []);


  if (requestStatus === RequestStatus.ERROR) {
    return (
      <div style={{ background: "#dae5ed" }}>
        <div style={{ marginTop: "17%", textAlign: "center" }}>
          <div className="large-font">
            Sorry! Couldn't fetch the portfolio data at this time.
          </div>
        </div>
      </div>)
  }

  if (requestStatus === RequestStatus.LOADING) {
    return (
      <div style={{ background: "#dae5ed" }}>
        <div style={{ marginTop: "17%", textAlign: "center" }}>
          <Loader />
        </div>
      </div>)
  }

  return (
    <div style={{ position: "relative" }}>
      <ParticlesBackground />
      <div className="portfolio-overlay">
        <div style={
          {
            marginTop: "17%",
            float: "left",
            overflow: "auto",
            width: "100%"
          }
        }>
          <AboutView />
          <div id="education-view" style={
            {
              marginTop: "27%",
            }
          }>
            <ExperienceView experiences={educationData} sectionName="Education" />
          </div>
          <div id="work-experience-view" style={
            {
              marginTop: "27%",
            }
          }>
            <ExperienceView experiences={workData} sectionName="Work Experience" />
          </div>
          <div id="project-view" style={
            {
              marginTop: "27%",
            }
          }>
            <ProjectView projects={projectData} />
          </div>
          <div id="footer-view" style={
            {
              marginTop: "7%",
            }
          }>
            <FooterView />
          </div>
        </div>
      </div>
    </div>
  );

}

export default MainLayout;