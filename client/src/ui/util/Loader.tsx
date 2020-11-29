import React, {useState, useEffect} from "react";


const loadingMessages = ["Fetching projects from Github...", "Parsing experience from server...", "Beautifying components..."];

const Loader = () => {
    const [index, setIndex] = useState<number>(0);

    useEffect(()=>{
       const timer = setInterval(()=>{
            let currentIndex = index;
            currentIndex++;
            currentIndex %= loadingMessages.length;
            setIndex(currentIndex);
        }, 400);

        return ()=>{
          clearInterval(timer); 
        }
    }, []);


    return (<div style={
        {
         marginTop: "17%", 
         textAlign: "center",
        }
    }>  
        <span style={{fontSize: "300%"}}>
            {loadingMessages[index]}
        </span>
    </div>);
}

export default Loader;