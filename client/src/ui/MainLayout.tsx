import React, {useState, useEffect} from "react"
import ProjectView from "./project/ProjectView";
import ExperienceView from "./experience/ExperienceView";
import HomeView from "./home/HomeView";
import FooterView from "./home/FooterView";
import ExperienceApi from "../api/Experience";
import ProjectApi from "../api/Project";
import {Experience} from "../interfaces/Experience";
import {Project} from "../interfaces/Project";
import Loader from "./util/Loader";


const MainLayout = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [expData, setExpData]  = useState<Experience[] | null>(null);
  const [projectData, setProjectData] = useState<Project[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    let promises = [ExperienceApi.getExperiences(), ProjectApi.getProjects()];
    Promise.all(promises).then((results)=>{
      const expDat = results[0];
      const projDat = results[1];
      setExpData(expDat);
      setProjectData(projDat);  
    }).catch((error) => {
      setIsError(true);
    }).finally(()=>{
      setIsLoading(false);
    })
  }, []);


  if(isError){
    return (
    <div style={{ background: "#dae5ed" }}>
      <div style={{marginTop: "17%", textAlign: "center"}}>
        <span style={{fontSize:"250%"}}>
          Sorry! Couldn't fetch the project and experience data at this time.
        </span>
      </div>
    </div>)
  }

  return (
    <div style={{ background: "#dae5ed" }}>
      {isLoading ? (<Loader/>) : (<div style={
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
          <ExperienceView experiences={expData as Experience[]}/>
        </div>
        <div id="project-view" style={
          {
            marginTop: "27%",
          }
        }>
          <ProjectView projects={projectData as Project[]}/>
        </div>
        <div style={
          {
            marginTop: "15=0%"
          }
        }>
          <FooterView />
        </div>
      </div>)
    }
    </div>
  );

}

export default MainLayout;