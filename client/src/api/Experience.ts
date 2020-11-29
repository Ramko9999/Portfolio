import CONFIG from "../config";
import fetch from "node-fetch";

class ExperienceApi {

    static async getExperiences(){
        let ep = CONFIG.URL + "/exp";
        try{
            let response = await fetch(ep);
            if(response.status !== 200){
                throw Error("Failed to get experience");
            }
            let json = await response.json();
            return json.experience;
        }
        catch(error){
            throw Error(error.message);
        }
    }
}

export default ExperienceApi;