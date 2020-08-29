import React from "react";
import { animated, useSpring } from "react-spring";
import { Link } from "react-scroll";

type Props = {
  target: string,
  text: string
}

const ScrollLink = (props: Props) => {
  const { target, text } = props;
  const delayProps = useSpring({
    opacity: 1,
    from: {
      opacity: 0
    },
    delay: 2000
  })


  return (
    <animated.div style={delayProps}>
      <div className="clickable" style={
        {
          marginTop: "10%",
          fontSize: "200%"
        }
      }>
        <Link
          activeClass="clickable"
          to={target}
          spy={true}
          smooth={true}
          duration={500}
        >
          <span style={{color: "#f06"}}>
            {text}
          </span>
        </Link>
      </div>
    </animated.div>
  )
}

export default ScrollLink;