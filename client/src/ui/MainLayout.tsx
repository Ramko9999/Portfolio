import { useState, useEffect } from "react";
import ProjectView from "./project/View";
import ExperienceView from "./experience/View";
import AboutView from "./about/View";
import EducationView from "./education/View";
import DataApi from "../api/Data";
import { Experience, Project, Education } from "../Interface";
import Loader from "./util/Loader";
import FooterView from "./footer/View";
import RequestStatus from "./util/RequestStatus";

const MainLayout = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.LOADING
  );
  const [workData, setWorkData] = useState<Experience[]>([]);
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [projectData, setProjectData] = useState<Project[]>([]);

  useEffect(() => {
    DataApi.getData()
      .then((data) => {
        const { projects, work, education } = data;
        setProjectData(projects);
        setWorkData(work);
        setEducationData(education);
        setRequestStatus(RequestStatus.SUCCESS);
      })
      .catch((r) => {
        setRequestStatus(RequestStatus.ERROR);
      });

    return () => {};
  }, []);

  if (requestStatus === RequestStatus.ERROR) {
    return (
      <div className="notice">
        Sorry! Couldn't fetch the portfolio data at this time.
      </div>
    );
  }

  if (requestStatus === RequestStatus.LOADING) {
    return (
      <div className="notice">
        <Loader />
      </div>
    );
  }

  return (
    <div className="portfolio">
      <AboutView />
      <EducationView educations={educationData} />
      <ExperienceView experiences={workData} />
      <ProjectView projects={projectData} />
      <FooterView />
    </div>
  );
};

export default MainLayout;
