import CONFIG from "../config";
import fetch from "node-fetch";
import { Project } from "../interfaces/Project";
import { Experience } from "../interfaces/Experience";

type Data = {
    projects: Project[],
    experiences: Experience[],
    error: boolean,
    message?: string
}

class DataApi{
    
    static async getData(){
        let ep = CONFIG.URL + "/data";
        try{
            let response = await fetch(ep);
            if(response.status !== 200){
                throw Error("Failure to get the data");
            }
            let json:Data = await response.json();
            return json;
        }
        catch(error){
            throw Error(error.message);
        }
    }
}

export default DataApi;
