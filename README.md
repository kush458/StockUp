# StockUp 📈

A minimalist Stock Market app built with React to view the most vital stock data and relevant news related to stocks.

This app is built using the following APIs:

* [IEX Cloud API](https://iexcloud.io/) for most active stocks and key insights.
* [twelve data API](https://twelvedata.com/) for retrieving line chart data.
* [polygon API](https://polygon.io/) for retrieving relevant news related to a company.

## Installation

Feel free to clone and play with this project!

Before doing so, you'll need to create a .env file in the root of your app directory with an [IEX Cloud API](https://iexcloud.io/) key, a [twelve data API](https://twelvedata.com/) key and a [polygon API](https://polygon.io/) key:
```
REACT_APP_IEX_KEY=your-key
REACT_APP_12_DATA_KEY=your-key
REACT_APP_POLYGON_KEY=your-key
```
⚠️Caveat: Please never publish a react app with a .env file (containing private keys) stored on the client side! The creation of the aforementioned .env file is just for testing the app locally.

Once this is done, navigate to the root of the project and run the following commands:
```
npm i
npm start
```

## App Demo

https://user-images.githubusercontent.com/55066573/188295327-e24ec904-d5b8-4b9f-83cc-391de18d0e31.mp4
