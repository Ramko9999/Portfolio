import fetch from "node-fetch";
import CONFIG from "../config";

class ProjectApi{

    static async getProjects(){
        let ep = CONFIG.URL + "/projects";
        try{
            let response = await fetch(ep);
            if(response.status !== 200){
                throw Error("Failed to get projects")
            }
            let json = await response.json();
            return json.projects;
        }
        catch(error){
            throw Error(error.message);
        }
    }
}

export default ProjectApi;