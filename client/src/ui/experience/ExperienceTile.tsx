import React, { useState } from "react";
import { Tooltip } from "antd";
import { Experience } from "../../interfaces/Experience";
import "./ExperienceTile.css";


type Props = {
    experience: Experience
}


const ExperienceTile = (props: Props) => {
    const { experience } = props;
    const { company, from, to, points, background, position, logo } = experience;
    const [expanded, setExpanded] = useState(false);

    const getBody = () => {
        if (!expanded) {
            return null;
        }
        else {
            return (
                <div style={
                    {
                        marginTop: "3%",
                    }
                }>
                    <span style={{ fontSize: "125%" }}>
                        Background: {background}
                    </span>
                    <div style={{ marginLeft: "2%", marginTop: "2%" }}>
                        {getBullets()}
                    </div>
                </div>);
        }
    }

    const getBullets = () => {
        return points.map((point) => {
            return (
                <div>
                    <div style={
                        {
                            marginLeft: "2%",
                            marginTop: "2%",
                        }
                    }>
                        <div style={
                            {
                                color: "#f06",
                                display: "inline-block"
                            }
                        }>
                            {">"}
                        </div>
                        {`   ${point}`}
                    </div>
                </div>
            )
        });
    }

    const getTip = () => {
        if (expanded) {
            return "Click To Collapse";
        }
        else {
            return "Click To Expand";
        }
    }

    return (
        <div id="exp-tile" onClick={() => { setExpanded(!expanded) }} style={
            {
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "gray",
                borderRadius: "5px",
                textAlign: "justify",
                background: "white",
                minHeight: "85px",
                marginTop: "2%",
                color: "black"
            }
        }>
            <Tooltip title={getTip()}>
                <div style={
                    {
                        paddingTop: "2%"
                    }
                }>
                    <div style={
                        {
                            marginLeft: "2%",
                            marginRight: "2%",
                            marginBottom: "2%"
                        }
                    }>
                        <div style={{
                            verticalAlign: "middle",


                        }}>
                            <div style={
                                {
                                    margin: "auto",
                                    display: "inline-block",
                                }
                            }>
                                <img style={
                                    {
                                        maxWidth: "50px",
                                        maxHeight: "50px",
                                    }
                                } src={logo} alt="Logo" />
                            </div>
                            <span style={
                                {
                                    fontSize: "175%",

                                }
                            }>
                                <div style={
                                    {
                                        display: "inline-block",
                                        marginLeft: "2%",
                                    }
                                }>
                                    {position}
                                </div>
                                <div className="clickable" style={
                                    {
                                        marginLeft: "2%",
                                        display: "inline-block",
                                        color: "#f06",
                                    }
                                }>
                                    @{company}
                                </div>
                                <div style={{
                                    marginLeft: "2%",
                                    display: "inline-block"
                                }}>
                                    {from} - {to}
                                </div>
                            </span>
                        </div>
                        <div>
                            {getBody()}
                        </div>
                    </div>
                </div>
            </Tooltip>

        </div>
    )
}

export default ExperienceTile;