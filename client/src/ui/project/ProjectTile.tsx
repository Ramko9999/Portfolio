import React, { useState } from "react";
import { Card, Row, Col, Typography, Tag, Space, Tooltip } from "antd";
import { Project } from "../../interfaces/Project";
import {useSpring, animated} from "react-spring";
import "./ProjectTile.css";

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash * 100;
}

function intToRGB(i: any) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  const colorString = "00000".substring(0, 6 - c.length) + c;
  return colorString;
}


const { Title } = Typography;
const { Meta } = Card;

const ProjectHeader = (data: Project) => {
  const { url, name, description, topics, id, images } = data;


  return (
    <div style={{ padding: 5 }}>
      <Row justify="center">
        <Title level={1}>
          <Tooltip title="View Source Code">
            <span onClick={()=> {window.open(url)}}
            className="clickable" style={{
              color: "black",
              textDecoration: "underline",
            }}>
              {name}
            </span>
          </Tooltip>
        </Title>
      </Row>
      <Row justify="center">
        <Col>
          <div>
            {topics.map(topic => {
              return (
                <Tag key={topic} color={"#" + intToRGB(hashCode(topic))}>
                  {topic}
                </Tag>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}

const ProjectContent = (data: Project) => {
  const { url, name, description, topics, id, images } = data;

  return (
    <div>
      <Row justify="center">
        {images.map((image) => {
          return (
            <img style={{
              minWidth: "225px"
            }} width={`${Math.floor(100 / images.length)}%`} src={image} alt="" />
          );
        })}
      </Row>
    </div>

  );
}

type Props = {
  description: string,
  url: string
}

const ProjectText = (props: Props) => {
  const { description, url } = props;
  return (

    <div className="text">
      <div>
        <Space direction="vertical" size="middle">
          {description.split(".").map((sen: string) => {
            let txt = sen.trim();
            if (txt.length > 0) {
              txt += ".";
            }
            return <span>{txt}</span>
          })}
        </Space>
      </div>
      <span onClick={() => { window.open(url) }}
        className="clickable" style={
          {
            textDecoration: "underline",
            color: "white"
          }
        }>
        View Source Code
        </span>
    </div>)
}

const ProjectTile = (data: Project) => {
  const { url, name, description, topics, id, images } = data;
  const [hover, setHover] = useState(false);

  const animationProps = useSpring({opacity: 1, from: {opacity: 0}});
  let style;

  if (hover) {
    style = { "filter": "brightness(30%)" };
  }
  else {
    style = {}
  }

  return (
    <animated.div style={animationProps}>
    <div style={{ padding: "5%" }}>
      <Card
        style={{ width: "100%", minWidth: "500px" }}
        size={"small"}
        title={<ProjectHeader {...data} />}
        bodyStyle={{ paddingBottom: 0 }}
      >
        <Meta
          description={
            <div style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 5 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              <div style={style}>
                <Row justify={"center"} gutter={[0, 10]}>
                  <Col span={24}>
                    <ProjectContent {...data} />
                  </Col>
                </Row>
              </div>
              {hover && <ProjectText description={description} url={url} />}
            </div>
          }
        />
      </Card>
    </div>
    </animated.div>
  );
}

export default ProjectTile;