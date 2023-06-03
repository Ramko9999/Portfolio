import {
  AiFillMediumSquare,
  AiFillGithub,
  AiFillLinkedin,
  AiFillMail,
} from "react-icons/ai";
import {
  FaDev
} from "react-icons/fa"
import LINKS from "../../Links";
import "./About.css";

const View = () => {
  return (
    <div className="section about">
      <div>
        <div className="section-title">Hi! I am Ramki</div>
        <div className="section-subtitle">
          An engineer interested in scalability and entrepreneurship.
        </div>
        <div className="links">
          <AiFillGithub
            className="clickable icon"
            onClick={() => window.open(LINKS.GITHUB)}
          />
          <AiFillMediumSquare
            className="clickable icon"
            onClick={() => window.open(LINKS.MEDIUM)}
          />
          <FaDev
            className="clickable icon"
            onClick={() => window.open(LINKS.DEV_TO)}
          />
          <AiFillLinkedin
            className="clickable icon"
            onClick={() => window.open(LINKS.LINKEDIN)}
          />
          <AiFillMail
            className="clickable icon"
            onClick={() => window.open(LINKS.MAIL)}
          />
        </div>
      </div>
    </div>
  );
};

export default View;
