import React from "react";
import {GithubOutlined} from "@ant-design/icons";
import "../Main.css";

type Props = {
    url: string,
    name: string
    icon: string,
}
const Link = (props:Props) => {
    const {url, name, icon} = props;

    return (
    <div className="clickable" onClick={()=> {
        window.open(url);
     }}>
         {name}
    </div>)
}

export default Link;