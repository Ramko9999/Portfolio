import React from "react";
import {useSpring, animated} from "react-spring";
import {Row, Col} from "antd";
import Link from "../util/Link";


const HomeView = ()=>{
    const animationProps = useSpring({
        opacity: 1,
        marginTop: 0,
        from: {
            opacity: 0,
            marginTop: -500
        }
    });


    return (
        <animated.div style={animationProps}>
            <div style={{
                margin: "auto",
                width: "80%",
                minWidth: "200px",
                textAlign: "center"
            }}>
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
                     <Col span={4}>
                        <Link url="https://github.com/Ramko9999" name="Ramko9999" icon="github"/> 
                     </Col>
                     <Col span={4}>
                        <Link url="https://medium.com" name="Ramki Pitchala" icon="medium"/>
                     </Col>
                   </Row>
               </div>
            </div>
        </animated.div>
    )
}

export default HomeView;