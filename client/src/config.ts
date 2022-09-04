const productionUrl = "https://ramapitchala.pythonanywhere.com";
const developmentUrl = "http://127.0.0.1:5000";

const CONFIG = {
    URL: process.env.REACT_APP_URL === "prod" ? productionUrl : developmentUrl
};

export default CONFIG;