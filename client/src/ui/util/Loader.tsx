import React, {useState, useEffect} from "react";


const loadingMessages = ["Fetching projects from Github...", "Parsing experience from server...", "Beautifying components..."];
const MESSAGE_DURATION = 400;

const Loader = () => {
    const [index, setIndex] = useState<number>(0);

    useEffect(()=>{
       const timer = setInterval(()=>{
            let currentIndex = index;
            currentIndex++;
            currentIndex %= loadingMessages.length;
            setIndex(currentIndex);
        }, MESSAGE_DURATION);

        return ()=>{
          clearInterval(timer); 
        }
    }, []);


    return ( 
        <div className="large-font">
            {loadingMessages[index]}
        </div>
    );
}

export default Loader;