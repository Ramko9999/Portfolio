import CONFIG from "../config";
import fetch from "node-fetch";

class BlogApi{
    
    static async getBlogs(){
        let ep = CONFIG.URL + "/blogs";
        try{
            let response = await fetch(ep);
            if(response.status !== 200){
                throw Error("Failed to get blogs");
            }
            let json = await response.json();
            return json;
        }
        catch(error){
            throw Error(error.message);
        }
    }
}

export default BlogApi;