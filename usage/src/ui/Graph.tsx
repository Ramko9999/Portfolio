import Chart from "react-google-charts";

type props = {
    data: any[]
}

const Graph = ({data}: props) => {

    return (<Chart
        chartType="Bar"
        height={"500px"}
        width={"100%"}
        data={data}
       />);
};

export default Graph;