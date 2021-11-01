import CONFIG from "../config";

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
        catch(error: any){
            throw Error(error.message);
        }
    }
}

export default BlogApi;