import fetch from "node-fetch";
import CONFIG from "../Config";
import {Day, Date} from "../Types";

class UsageApi{

    static async getMockUsage(start:Date, end:Date, onError:(e:string) => void){

        let output:Day[] = [];
        for(let i = 1; i < 32; i++){
            let views = Math.ceil(Math.random() * 100);
            let reads = Math.ceil(Math.random() * views);
            let viewers = Math.ceil(Math.random() * views);;
            output.push({
                day_id:"Jan. " + i,
                views: views,
                reads: reads,
                viewers: viewers
            });
        }
       
        return output;
    }

    static async getUsage(start:Date, end:Date, onError:(e:string) => void) {
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
            onError(error.message);
        }
    };
}

export default UsageApi;