import React, {useEffect, useRef, useState} from "react";
import {Line, defaults} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import {getDaysPassed} from '../utils/helpers'


defaults.set('animation', {
    delay: 0,
    duration: 200,
    easing: 'easeOutQuart'
});
let labels = [];
let graphData1 = [];
var options = {
    layout: {
        padding: {
            left: 18, 
            right: 0,
            bottom: 0,
            top: 7
        }
    },
    interaction: {
        mode: 'nearest',
        intersect: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    transitions: ['show'],
    plugins: { 
        legend: {
            display: false,
        },
        tooltip: {
            mode: "nearest", // https://www.chartjs.org/docs/2.7.3/general/interactions/modes.html
            intersect: false,
            //figure how to add dollar sign
            displayColors: false,
            callbacks: {
                label: function(context){
                    let l = context.parsed.y;
                    return "$" + l.toFixed(2);
                }
            },
        },
    },
    scales: {
        x: {  // not 'xAxes: [{' anymore (not an array anymore)
            display: false,
        },
        y: {
            ticks: {
                color: "rgba(255 255 255 / 0.61)",
                callback: function(value, index, values) {
                    return '$' + value.toFixed(2);
                },
            },
            grid: {
                color: "rgba(0 0 0 / 0.088)",
                display: true,
            }
        }
    },
    elements: {
        point: {
            radius: 0,
        },
        line: {
            borderCapStyle: 'square',
            borderJoinStyle: 'miter',
        },
    },
};

const Graph = (props) => {
    
    // Create a reference to Line component to update it later
    const lineReference = useRef();

    var Data = canvas => {
        const ctx = canvas.getContext("2d"); //This is the HTML canvas element
        const gradient = ctx.createLinearGradient(0, 0, 600, 10)
        gradient.addColorStop(0, "#7c83ff");
        gradient.addColorStop(1, "#61eefd");
        let gradientFillUp = ctx.createLinearGradient(0, 0, 0, 100); //Top to Bottom gradient
        gradientFillUp.addColorStop(0, "rgba(124, 131, 255, 0.412");
        gradientFillUp.addColorStop(0.1, "rgba(124, 131, 255, 0.31");
        gradientFillUp.addColorStop(0.25, "rgba(124, 131, 255, 0.25");
        gradientFillUp.addColorStop(1, "rgba(124, 244, 255, 0)");
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 4;
        ctx.shadowOffsetX = 0;
        return {
            labels,
            datasets: [
                {
                    lineTension: 0.1,
                    label: "",
                    pointBorderWidth: 0,
                    pointHoverRadius: 2.56,
                    borderColor: gradient, //Color of the Line
                    backgroundColor: gradientFillUp,//The fill color under the Line
                    pointBackgroundColor: gradient,
                    fill: true,
                    boderWidth: 1,
                    data: graphData1,
                    showLine: true,
                },
            ],

        };
    };

    //these are for top bar
    const [currentPrice, setCurrentPrice] = useState(0);
    const [change, setChange] = useState(1.08);
    const [changePercent, setChangePercent] = useState(1.08);

    //the following are for key insights
    const [marketCap, setMarketCap] = useState(0);
    const [volume, setVolume] = useState(0);
    const [peRatio, setPeRatio] = useState(0);
    const [week52High, setWeek52High] = useState(0); //in $

    //check if market is open
    const [isOpen, setIsOpen] = useState(false);

    //Set TimeLine for Api Call
    const [range, setRange] = useState("4h");
    const [numPoints, setNumPoints] = useState(13);

    //Keep track of current Timeline Range
    const [currRange, setCurrRange] = useState("1w");

    const symbol = props.stock.toLowerCase();
    const iexKey = process.env.REACT_APP_IEX_KEY;
    const twelveDataKey = process.env.REACT_APP_12_DATA_KEY;

    useEffect(() => {
        if(symbol){
            //For Basic & Key Info we're using IEX API with 50,000 credits per month
            fetch(
                `https://cloud.iexapis.com/stable/stock/${symbol}/quote?filter=symbol,avgTotalVolume,change,changePercent,isUSMarketOpen,latestPrice,peRatio,marketCap,week52High&token=${iexKey}`
            )
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setCurrentPrice(result.latestPrice);
                setChange(result.change);
                setChangePercent(result.changePercent);
                setMarketCap(result.marketCap);
                setVolume(result.avgTotalVolume);
                setPeRatio(result.peRatio);
                setWeek52High(result.week52High);
                setIsOpen(result.isUSMarketOpen);
            });
        }
    }, [symbol]);

    useEffect(() => {
        if(symbol){
            // Finally the following works, Thank God! because this clears the original array and since the original array is
            // being referenced by graphData1, the data there also changes, whereas assigning just [] makes a new array which
            // does not change the graphData1 as it still refers to the old array instance
            labels.length = 0;
            graphData1.length = 0;
            //for building graphs we're using twelvedata API with 800 credits or API calls per day
            fetch(
                `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${range}&outputsize=${numPoints}&apikey=${twelveDataKey}`
            )
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                console.log(range);

                for (let i=Object.keys(result["values"]).length-1; i>=0; i--){
                    //Great no need to use Object.keys, Thank God!
                    graphData1.push(result["values"][i].close);
                    labels.push(result["values"][i].datetime);
                }
            }).then(() => {
                //Thank God!!!!!!!, Finally, this works! update the current property of the reference not the reference itself.
                //setTimeout will throtlle update for 256ms 
                setTimeout(() => {lineReference.current.update()}, 256);
            });
        }
    }, [symbol, range, numPoints]);

    useEffect(() => {
        props.handleInsights(marketCap, volume, peRatio, week52High);
    }, [week52High]);

    useEffect(() => {
        if(symbol) {
            document.getElementById(currRange).focus();
        }
    }, [symbol]);

    return (
        <>
            <div className="stockIntro">
                    <h1>{props.stock}</h1>
                    <p>{props.company}</p>
                    {symbol && currentPrice && <h2>${currentPrice.toFixed(2)}</h2>}
                    {symbol && currentPrice && <div style={{
                        backgroundColor: change > 0 ? "rgb(21, 241, 131)" : "rgb(224, 4, 4)",
                        boxShadow: change > 0 ? "0px 0px 7px 0px #2ff384" : "0px 0px 9px 0px rgb(243, 70, 70)",
                    }}>{(change > 0) && <article>+{change.toFixed(2)}</article>}{(change <= 0) && <article>{change.toFixed(2)}</article>}</div>}
                    {<small style={{
                        color: changePercent > 0 ? "rgb(21, 241, 131)" : "#f3145b",
                        textShadow: changePercent > 0 ? "0px 0px 7.9px #2ff384" : "0px 0px 7.9px rgb(243, 70, 70)",
                    }}>{changePercent > 0 ? "+"+changePercent.toFixed(2) : changePercent.toFixed(2)}%</small>}
            </div>
            <div className="stockGraph">
                <div className="TimeLines">
                    <p>Market Status: <span style={{
                        color: isOpen ? "#3ae885" : "#f72568",
                        textShadow: isOpen ? "0px 0px 7px #2ff384" :  "0px 0px 7.9px rgb(243, 70, 70)",
                    }}>{isOpen ? "Open" : "Closed"}</span></p>
                    <button
                        onClick={() => {
                            setRange("1h");
                            setNumPoints(7);
                            setCurrRange("1d");
                        }}
                        id="1d"
                    >1D</button>
                    <button
                        onClick={() => {
                            setRange("4h");
                            setNumPoints(13);
                            setCurrRange("1w");
                        }}
                        id="1w"
                    >1W</button>
                    <button
                        onClick={() => {
                            setRange("1day");
                            var numDays = getDaysPassed();
                            setNumPoints(numDays);                          
                            setCurrRange("ytd");
                        }}
                        id="ytd"
                    >YTD</button>
                    <button
                        onClick={() => {
                            setRange("1day");
                            setNumPoints(30);
                            setCurrRange("1m");
                        }}
                        id="1m"
                    >1M</button>
                    <button 
                        onClick={() => {
                            setRange("1week");
                            setNumPoints(52);
                            setCurrRange("1y");
                        }}
                        style={{marginRight: "1.8%"}}
                        id="1y"
                    >1Y</button>
                </div>
                <div className="graphWrapper">
                    <Line data={Data} options={options} ref={lineReference} />
                </div>
            </div>
        </>
    );
};

export default Graph;