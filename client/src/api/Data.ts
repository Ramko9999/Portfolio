import { Project, Experience, Education } from "../Interface";

type Data = {
  projects: Project[];
  work: Experience[];
  education: Education[];
};

const API_URL = process.env.REACT_APP_API_URL;

class DataApi {
  static async getData() {
    let ep = API_URL + "/data";

    try {
      let response = await fetch(ep);
      if (response.status !== 200) {
        throw Error("Failure to get the data");
      }
      let json: Data = await response.json();
      return json;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
}

export default DataApi;
