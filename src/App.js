import React, { useState } from 'react';
import './App.css';
import './style.css';
import SearchBar from './components/searchbar';
import Graph from './components/graph';
import KeyInsights from './components/keyInfo';
import News from './components/news';
import MostActiveStocks from './components/mostActive';


function App() {
  const [stock, setStock] = useState("GOOG");
  const [company, setCompany] = useState("Alphabet Inc");
  const [marketCap, setMarketCap] = useState(0);
  const [volume, setVolume] = useState(0);
  const [peRatio, setPeRatio] = useState(0);
  const [week52High, setWeek52High] = useState(0); //in $

  const handleSearch = (stock) => {
    setStock(stock);
  }

  const handleCompany = (company) => {
    setCompany(company);
  }

  const handleInsights = (marketCap, volume, peRatio, week52High) => {
    setMarketCap(marketCap);
    setVolume(volume);
    setPeRatio(peRatio);
    setWeek52High(week52High);
  }

  return (
    <>
        <video className="video-bg" autoPlay loop muted>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
        {/* pass handleSearch to SearchBar and call it from there while passing the selected stock to it */}
        <SearchBar handleSearch={handleSearch} handleCompany={handleCompany} />
        <div className="container">
          <div className="graph">
            <Graph stock={stock} company={company} handleInsights={handleInsights} />
          </div>
          <div className="profitCalc">
            <MostActiveStocks stock={stock} />
          </div>
          <div className="line-break"></div>
          <div className="keyInfo">
            <KeyInsights marketInfo={marketCap} volumeInfo={volume} peInfo={peRatio} week52info={week52High} />
          </div>
          <div className="news">
            <News stock={stock} />
          </div>
        </div>
    </>
  );
}

export default App;
