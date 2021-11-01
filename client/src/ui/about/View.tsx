import {useSpring, animated} from "react-spring";
import {Row, Col} from "antd";
import {AiFillMediumSquare, AiFillGithub, AiFillLinkedin, AiFillMail} from "react-icons/ai";
import LINKS from "../../api/Links";
import "./About.css";


const View = ()=>{
    const animationProps = useSpring({
        opacity: 1,
        from: {
            opacity: 0,
        }
    });

    return (
        <div className="section">
        <animated.div style={animationProps}>
            <div>
               <div className="section-name">
                   Hi there! I am Ramki
               </div>
               <div className="strong-font" style={
                   {
                       textAlign: "center",
                       fontWeight: "normal"
                   }
               }>
                  I am a full-stack software engineer primarily focused on creating scalable solutions.
               </div>
               <div style={
                   {
                       marginTop: "2%"
                   }
               }>
                   <Row justify="center">
                     <Col span={4}>
                         <AiFillGithub className="clickable icon"
                         onClick={() => window.open(LINKS.GITHUB)}/>
                     </Col> 
                     <Col span={4}>
                         <AiFillMediumSquare className="clickable icon" 
                         onClick={()=> window.open(LINKS.MEDIUM)}/>
                     </Col>
                     <Col span={4}>
                         <AiFillLinkedin className="clickable icon"
                          onClick={() => window.open(LINKS.LINKEDIN)}/>
                     </Col>
                     <Col span={4}>
                         <AiFillMail className="clickable icon" onClick={()=> window.open(LINKS.MAIL)}/>
                     </Col>
                   </Row>
               </div>
            </div>
        </animated.div>
        </div>
    )
}

export default View;