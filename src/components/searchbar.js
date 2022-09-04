import React, { useEffect, useState } from "react";
import { TickerSymbols } from "../utils/Ticker";


const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredStocks, setFilteredStocks] = useState([]);
    useEffect(() => {
        const regex = new RegExp(`${inputValue.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')}`, "i");
        let n = inputValue.length;
        setFilteredStocks(
            //Thank God!! subString came into use just finely
            // TickerSymbols.filter((val) => val.symbol.substring(0, n).includes(inputValue.toUpperCase())).slice(0, 7)
            TickerSymbols.filter((val) => regex.test(val.symbol.substring(0, n))).slice(0, 7)
        );
    }, [inputValue]);
    
    return (
        <>
            <nav className="navBar">
                <a className="name" href="/">
                    StockUp
                </a>
                <div className="searchBar">
                    <input 
                    type="text" 
                    placeholder="🔎︎ Search your Stock"
                    value={inputValue}
                    // the following onchnage ensures that we only look at values(stock symbols) which are valid(less than 5 chars)
                    onChange={(e) => {
                        e.target.value.length <= 5 ? setInputValue(e.target.value) : setInputValue(inputValue);
                    }}
                    ></input>
                    {inputValue && filteredStocks[0] &&
                    <div className="results">
                        <ul>
                            {filteredStocks.length &&
                                filteredStocks.map((val) => (
                                    <li key={val.symbol} 
                                        onClick={() => {
                                            setInputValue("");
                                            props.handleSearch(val.symbol);
                                            props.handleCompany(val.name);
                                        }}>
                                        {val.symbol}
                                        <p>
                                            {val.name}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>}
                    {inputValue && !filteredStocks[0] &&
                    <div className="results">
                        <ul>
                            <li>
                                Not a Valid Stock!
                            </li>
                        </ul>
                    </div>}
                </div>
            </nav>
        </>
    );
}; 

export default SearchBar;