import React, {useState, useEffect} from "react";
import {Blog} from "../../interfaces/Blog";
import Loader from "../util/ScrollLink";
import BlogApi from "../../api/Blog";

const BlogView = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Blog[] |null>(null);
    const [error, setError] = useState(false);

    useEffect(()=>{
        BlogApi.getBlogs().then((dat:any)=>{
            setData(dat["blogs"]);
            console.log(dat["blogs"]);
        }).catch((e)=>{
            setError(true);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);


    if(loading || data === null){
        return null;
    }
    return <div> Blogs </div>;
}

export default BlogView;