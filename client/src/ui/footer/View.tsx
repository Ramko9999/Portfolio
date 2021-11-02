import React from "react";
import "../Main.css";
import LINKS from "../../api/Links";


const FooterView = () => {

    return (
        <div className="section" >
            <div className="section-name" >
                Wow! You really scrolled down here!
            </div>
            <div className="strong-font" style={
                {
                    marginTop: "2%",
                    fontWeight: "normal",
                    textAlign: "center"
                }
            }>
                <div style={
                    {
                        display: "inline-block"
                    }
                }>
                    Wanna see the code for this website?
                </div>
                <div className="clickable" style={
                    {
                        textDecoration: "underline",
                        display: "inline-block",
                        paddingLeft: "9px"
                    }
                } onClick={() => { window.open(LINKS.PORTFOLIO_SOURCE) }}>
                    Source Code
                </div>

            </div>
        </div>
    )
}


export default FooterView;