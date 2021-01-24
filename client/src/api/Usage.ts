import fetch from "node-fetch";
import CONFIG from "../config";

class UsageApi{

    static async markRead(){
        let ep = CONFIG.URL + "/read";
        try{
            await fetch(ep);
        }
        catch(error){
            throw Error(error.message);
        }
    }
}

export default UsageApi;