import React, { useEffect, useState } from "react";

const MostActiveStocks = (props) => {

    const [mostActive, setMostActive] = useState([]);

    const iexKey = process.env.REACT_APP_IEX_KEY;

    const numStocks = 5;

    // We're using IEX API for most active stocks
    useEffect(() => {
        fetch(
            `https://cloud.iexapis.com/stable/stock/market/list/mostactive?&listLimit=${numStocks}&filter=symbol,change,latestPrice,companyName&token=${iexKey}`
        )
        .then(res => res.json())
        .then((result) => {
            setMostActive(result);
            console.log("sliced mostActive", result);
        });
    }, [])


    return (
        <div className="profitContainer">
            <h1>Most Active</h1>
            <ul>
                 {mostActive && mostActive.map((val) =>
                    <> 
                        <hr/>
                        <li key={val.symbol}>
                            <h2>{val.symbol}</h2>
                            <p>{val.companyName.length > 35 ? val.companyName.slice(0, 35) + "..." : val.companyName}</p>
                            <h3>${val.latestPrice.toFixed(2)}</h3>
                            <div key={val.symbol} style={{
                                backgroundColor: val.change > 0 ? "rgb(21, 241, 131)" : "rgb(224, 4, 4)",
                                boxShadow: val.change > 0 ? "0px 0px 7px 0px #2ff384" : "0px 0px 9px 0px rgb(243, 70, 70)",
                            }}>
                                {val.change > 0 && <article>+{val.change ? val.change.toFixed(2): "0.00"}</article>}
                                {val.change <= 0 && <article>{val.change ? val.change.toFixed(2): "0.00"}</article>}
                            </div>
                        </li>
                    </>
                )}
                <hr/>
            </ul>
        </div>
    );
}

export default MostActiveStocks;
