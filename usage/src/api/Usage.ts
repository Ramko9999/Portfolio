import fetch from "node-fetch";
import CONFIG from "../Config";
import {Day, Date} from "../Types";

class UsageApi{

    static async getUsage(start:Date, end:Date) {
        const ep = CONFIG.URL + "/analytics";
        try{
            const response = await fetch(ep, 
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        start_date: start,
                        end_date: end
                    })
                });

            if(response.status !== 200){
                throw Error("Failed to get usage analytics");
            }
            const json = await response.json();
            const days:Day[] = json.days;
            return days;
        }
        catch(error){   
            throw Error(error.message);
        }
    };
}

export default UsageApi;