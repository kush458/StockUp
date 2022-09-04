import React from "react";
import {abbrNum, addCommas} from '../utils/helpers';

const KeyInsights = (props) => {
    return (
        <>
            <div className="keyInfoBox">
                <div className="innerInfoBox" >
                    <div style={{
                        marginTop: "0.61%",
                        marginRight: "1%"
                    }}>
                        <p>Market Cap</p>
                        <h1>{abbrNum(props.marketInfo)}</h1>
                    </div>
                    <div style={{
                        marginTop: "0.61%",
                        marginLeft: "1%",
                    }}>
                        <p>Avg Total Volume</p>
                        <h1>{addCommas(props.volumeInfo)}</h1>    
                    </div>
                    <div style={{
                        marginTop: "1.8%", 
                        marginRight: "1%",
                    }}>
                        <p>P/E Ratio</p>
                        <h1>{props.peInfo === null ? "--": props.peInfo}</h1>
                    </div>
                    <div style={{
                        marginTop: "1.8%",
                        marginLeft: "1%",
                    }}>
                        <p>52 Week High</p>
                        <h1>${props.week52info}</h1>                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default KeyInsights;