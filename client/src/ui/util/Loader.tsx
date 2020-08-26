import React from "react";
import {Spin} from "antd";

const Loader = () =>{
    return (
        <div
          style={{
            textAlign: "center",
            padding: "60px"
          }}
        >   
          <Spin size={"large"} />
        </div>
      )
}
export default Loader;