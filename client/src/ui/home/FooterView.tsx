import React from "react";


const FooterView = () => {

    const contacts = {
        linkedin: " Linkedin",
        email: "Email"
    }
    return (
        <div style={
            {
                overflow: "auto",
                width: "80%",
                minWidth: "500px",
                margin: "0 auto",
                padding: "10px",
                alignContent: "center",
                textAlign: "center",
                marginBottom: "5%",

            }
        }>
            <span style={
                {
                    fontSize: "300%",
                    color: "black"
                }
            }>
                So you made it this far...
            </span>
            <div style = {
                {
                    justifyContent: "space-between"
                }
            }>
                <div style={
                    {
                        display: "inline-block"
                    }
                }>
                    Thank you for visiting my site. Please feel free to with me connect on
            </div>
                <div className="clickable" style={
                    {
                        textDecoration: "underline",
                        display: "inline-block",
                        paddingLeft: "9px"
                    }
                }>
                    {`   ${contacts.linkedin}`}
                </div>

            </div>
        </div>
    )
}


export default FooterView;