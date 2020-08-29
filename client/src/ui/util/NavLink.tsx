import React from "react";
import "../Main.css";

type Props = {
    url: string,
    name: string
    children: React.ReactNode,
}
const NavLink = (props:Props) => {
    const {url, name, children} = props;

    return (
    <div className="clickable" onClick={()=> {
        window.open(url);
     }}>
         {children}
         {name}
    </div>)
}

export default NavLink;