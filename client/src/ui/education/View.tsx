import { CSSProperties } from "react";
import { Education } from "../../Interface";
import "./Education.css";

type Props = {
  educations: Education[];
};

const View = ({ educations }: Props) => {
  return (
    <div className="section">
      <div className="education-list">
        <div className="section-title">Education</div>
        {educations.map(({ name, degree, from, to, display }, index) => {
          const educationStyle: CSSProperties = {
            backgroundColor: display.background,
            color: display.text,
            fontFamily: display.font,
          };

          return (
            <div key={index} className="education" style={educationStyle}>
              <div className="education-name">{name}</div>
              <div className="education-meta">
                <div>{degree}</div>
                <div>{`${from} - ${to}`}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default View;
