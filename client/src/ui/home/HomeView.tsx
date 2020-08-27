import React from "react";
import {useSpring, animated} from "react-spring";
import {Row, Col} from "antd";
import NavLink from "../util/NavLink";
import ScrollLink from "../util/ScrollLink";


const HomeView = ()=>{
    const animationProps = useSpring({
        opacity: 1,
        from: {
            opacity: 0,
        }
    });

    return (
        <div style={{
            margin: "auto",
            width: "80%",
            minWidth: "200px",
            textAlign: "center"
        }}>
        <animated.div style={animationProps}>
            <div>
               <div style={
                   {
                       color:"black",
                       fontSize: "300%"
                   }
               }>
                   Hi there! I am Ramki Pitchala.
               </div>
               <div style={
                   {
                       width: "100%",
                       justifyContent: "center",
                       fontSize: "150%"
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
                     <Col span={2}>
                        <NavLink url="https://github.com/Ramko9999" name="Github">
                        </NavLink> 
                     </Col> 
                     <Col span={2}>
                        <NavLink url="https://medium.com/@ramapitchala" name="Medium">
                        </NavLink>
                     </Col>
                     <Col span={2}>
                        <NavLink url="https://www.linkedin.com/in/rama-krishna-pitchala/" name="Linkedin">
                        </NavLink>
                     </Col>
                     <Col span={2}>
                         <NavLink url="mailto:pitch034@umn.edu" name="Email">
                         </NavLink>
                     </Col>
                   </Row>
               </div>
            </div>
        </animated.div>
        <ScrollLink target="experience-view" text="Go To Experience"/>
        </div>
    )
}

export default HomeView;