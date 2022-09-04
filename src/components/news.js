import React, { useEffect, useState } from "react";
import HashLoader from 'react-spinners/HashLoader';


const News = (props) => {

    //set Image Sources
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');

    //set URL Sources
    const [URL1, setURL1] = useState('');
    const [URL2, setURL2] = useState('');
    const [URL3, setURL3] = useState('');
  
    //set Title Sources
    const [title1, setTitle1] = useState('');
    const [title2, setTitle2] = useState('');
    const [title3, setTitle3] = useState('');

    //set summary Sources
    const [summary1, setSummary1] = useState('');
    const [summary2, setSummary2] = useState('');
    const [summary3, setSummary3] = useState('');
      
    //Setup loader
    const [isLoading, setIsLoading] = useState(true);

    const symbol = props.stock;
    const polygonKey = process.env.REACT_APP_POLYGON_KEY;

    useEffect(() => {
        if(symbol) {
            setIsLoading(true);
            //For news we're using polygon with max 5 API calls per minute
            fetch(
                `https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=3&apiKey=${polygonKey}`
            )
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if(result.results[0] && result.results[1] && result.results[2]){

                    result.results[0] ? setImg1(result.results[0].image_url) : setImg1(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);
                    result.results[1] ? setImg2(result.results[1].image_url) : setImg1(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);
                    result.results[2] ? setImg3(result.results[2].image_url) : setImg1(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);

                    setURL1(result.results[0].article_url);
                    setURL2(result.results[1].article_url);
                    setURL3(result.results[2].article_url);

                    setTitle1(result.results[0].title.slice(0, 52) + "...");
                    setTitle2(result.results[1].title.slice(0, 52) + "...");
                    setTitle3(result.results[2].title.slice(0, 52) + "...");

                    result.results[0].description ? setSummary1(result.results[0].description.slice(0, 80) + "...") : setSummary1("No Info!");
                    result.results[1].description ? setSummary2(result.results[1].description.slice(0, 92.5) + "...") : setSummary2("No Info!");
                    result.results[2].description ? setSummary3(result.results[2].description.slice(0, 92.5) + "...") : setSummary3("No Info!");

                } else {

                    setImg1(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);
                    setImg2(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);
                    setImg3(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);
                    
                    setURL1(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);
                    setURL2(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);
                    setURL3(`https://storage.googleapis.com/iex/api/logos/${symbol}.png`);

                    setTitle1("No Info!");
                    setTitle2("No Info!");
                    setTitle3("No Info!");

                    setSummary1("No Info!");
                    setSummary2("No Info!");
                    setSummary3("No Info!");
                    
                }
            })
            .then(() => {
                setTimeout(() => {setIsLoading(false)}, 2000);
            });
        }
    }, [symbol]);

    return (
        <div className="newsContainer">
            <div style={
                    isLoading ? {flex: "1", justifyContent: "center", alignItems: "center"} :
                    {flex: "1"}
                } 
                onClick={
                    () => {
                        if(!isLoading){
                            window.open(URL1, '_blank');
                        }
                    }
                }>
                    {isLoading ? 
                    <HashLoader color="#ffffff" loading={true} size={50} margin={100} /> 
                    : 
                    <>
                        <img 
                            src={img1}  
                            alt='News img'
                        />
                        <p style={{marginLeft: "4.12%"}}>{title1}</p>
                        <article style={{marginLeft: "4.12%", marginRight: "3%"}}>{summary1}</article>
                    </>
                    }
            </div>
            <section style={{
                flex: "1.7", 
                flexDirection: "column", 
                paddingLeft: "1%",
                paddingTop: "1%",
                paddingBottom: "1%",
            }}>
                <div 
                style={
                    //alignItems centralizes items vertically, justifyContent centralizes content horizontally
                    isLoading ? {marginBottom: "1%", alignItems: "center", justifyContent: "center"} :
                    {marginBottom: "1%"}
                    } 
                onClick={() => {window.open(URL2, '_blank')}}>
                    {isLoading ? <HashLoader color="#ffffff" loading={true} size={50} margin={100} /> :
                    <>
                        <img alt='News img' src={img2} />
                        <section>
                            <p>{title2}</p>
                            <article>{summary2}</article>
                        </section>
                    </>
                    }
                </div>
                <div 
                style={
                    //alignItems centralizes items vertically, justifyContent centralizes content horizontally
                    isLoading ? {marginTop: "2%", alignItems: "center", justifyContent: "center"} :
                    {marginTop: "2%"}
                } 
                onClick={() => {window.open(URL3, '_blank')}}>
                    {isLoading ? <HashLoader color="#ffffff" loading={true} size={50} margin={100} /> :
                    <>
                        <img alt='News img' src={img3} />
                        <section>
                            <p>{title3}</p>
                            <article>{summary3}</article>
                        </section>
                    </>}
                </div>
            </section>
        </div>
    );
}

export default News;
