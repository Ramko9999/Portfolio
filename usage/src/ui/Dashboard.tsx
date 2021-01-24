import UsageApi from "../api/Usage";
import Graph from "./Graph";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { Day, Date } from "../Types";
import "react-datepicker/dist/react-datepicker.css";

const monthParser: { [index: string]: number } = {
    "JANUARY": 0,
    "FEBRUARY": 1,
    "MARCH": 2,
    "APRIL": 3,
    "MAY": 4,
    "JUNE": 5,
    "JULY": 6,
    "AUGUST": 7,
    "SEPTEMBER": 8,
    "OCTOBER": 9,
    "NOVEMBER": 10,
    "DECEMBER": 11
};

const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

const format = (days: Day[], start:Date, end:Date) => {
    let output: any = [["Day", "Views", "Reads"]];
    let current = toJSDate(start);
    let endJSDate = toJSDate(end);
    let index = 0;
    while(current <= endJSDate){
        if(index < days.length){
            const split = days[index].day_id.split("-");
            const year = parseInt(split[0]);
            const month = parseInt(split[1]) - 1;
            const day = parseInt(split[2]);
            const display = months[current.getMonth()] + " " + current.getDate(); 
            if(year === current.getFullYear() && month === current.getMonth() && day === current.getDate()){
                output.push([display, days[index].views, days[index].reads]);
                index++;
            }
            else{
                output.push([display, 0, 0]);
            }
        }
        current.setDate(current.getDate() + 1);
    }
    return output;
}

const toJSDate = ({ month, day, year }: Date) => {
    const jsDate = new globalThis.Date();
    jsDate.setMonth(monthParser[month.toUpperCase()]);
    jsDate.setFullYear(year);
    jsDate.setDate(day);
    return jsDate;
}

const Dashboard = () => {

    const [data, setData] = useState<Day[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [start, setStart] = useState<Date>({ month: "January", day: 20, year: 2021 });
    const [end, setEnd] = useState<Date>({ month: "January", day: 23, year: 2021 });

    useEffect(() => {
        UsageApi.getUsage(start, end).then((days) => {
            setData(days as Day[]);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [start, end]);


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
                marginBottom: "2%",
                marginTop: "2%"
            }}>
                Usage Tracking
            </div>
            <div>
                <div style={{
                    marginBottom: "5%",
                }}>
                    <span style={{
                        display: "inline-block",
                        paddingRight: "10px"
                    }}>
                        {"From "} 
                    </span>
                    <div style={{
                        display: "inline-block",
                        paddingRight: "10px"
                    }}>
                        <DatePicker selected={toJSDate(start)} onChange={(date: globalThis.Date) => {
                            if (date !== null) {
                                const month = months[date.getMonth()];
                                const day = date.getDate();
                                const year = date.getFullYear();
                                const selectedStart: Date = {
                                    month: month,
                                    day: day,
                                    year: year
                                }

                                if(date >= toJSDate(end)){
                                    date.setDate(date.getDate() + 1);
                                    const selectedEnd : Date = {
                                        month : months[date.getMonth()],
                                        day: date.getDate(),
                                        year: date.getFullYear()
                                    };
                                    setEnd(selectedEnd);
                                }
                                setStart(selectedStart);
                            }
                        }}/>
                    </div>
                    <span style={{
                        display: "inline-block",
                        paddingRight: "10px"
                    }}>
                        {" to"} 
                    </span>
                    <div style={{
                        display: "inline-block"
                    }}>
                        <DatePicker selected={toJSDate(end)} onChange={(date: globalThis.Date) => {
                            if (date !== null) {
                                const month = months[date.getMonth()];
                                const day = date.getDate();
                                const year = date.getFullYear();
                                const selectedEnd: Date = {
                                    month: month,
                                    day: day,
                                    year: year
                                }
                                setEnd(selectedEnd);
                            }
                        }} filterDate={(date) => {
                            return date >= toJSDate(start)   
                        }}/>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div>
                <Graph data={format(data, start, end)} />
            </div>
        </div>)
};

export default Dashboard;