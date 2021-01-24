import UsageApi from "../api/Usage";
import Graph from "./Graph";
import { useState, useEffect } from "react";
import { Day, Date } from "../Types";



const format = (days: Day[]) => {
    let output: any = [["Day", "Views", "Reads"]];
    days.forEach((day) => {
        output.push([day.day_id, day.views, day.reads]);
    });
    return output;
}

const Dashboard = () => {

    const [data, setData] = useState<Day[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [start, setStart] = useState<Date>({ month: "January", day: 20, year: 2021 });
    const [end, setEnd] = useState<Date>({ month: "January", day: 23, year: 2021 });

    useEffect(() => {
        UsageApi.getMockUsage(start, end, (err) => {
            console.log(err);
        }).then((days) => {
            setData(days);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);


    if (isLoading) {
        return (<div>
            Loading data... Hang on!
        </div>);
    }

    return (
        <div style={{
            width: "90%",
            textAlign: "center"
        }}>
            <div style={{
                fontSize: 28,
                marginBottom: "5%",
                marginTop: "2%"
            }}>
                Usage Tracking
            </div>
            <div>
                <Graph data={format(data)} />
            </div>
        </div>)
};

export default Dashboard;