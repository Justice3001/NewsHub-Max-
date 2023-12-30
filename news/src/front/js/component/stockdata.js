import React, { useState, useEffect } from "react";
import axios from "axios";

const StockData = () => {
  const [stockData, setStockData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [loadingStock, setLoadingStock] = useState(true);
  const [loadingNews, setLoadingNews] = useState(false);
  const [showNews, setShowNews] = useState(true);

  const stocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "AMZN", name: "Amazon" },
    { symbol: "GOOGL", name: "Google" },
    { symbol: "NVDA", name: "Nvidia" },
    { symbol: "TSLA", name: "Tesla" },
    { symbol: "NFLX", name: "Netflix" },
    // Add more stocks as needed
  ];

  const fetchStockData = async (symbol) => {
    const apiKey = "aMiFIwe1FiUWWphCK1fDKG9_gpc8pY5j"; // Replace with your actual Polygon API key

    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${apiKey}`
      );

      console.log("Received stock data:", response.data);

      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoadingStock(false);
    }
  };

  const fetchNewsData = async (query) => {
    const apiKey = "fdd1aee90ddd3637423bb20da2bf0ad1";
    const country = "us"; // Add the country parameter
    const language = "en"; // Add the language parameter

    try {
      setLoadingNews(true);

      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${query}&country=${country}&language=${language}&apikey=${apiKey}`
      );

      console.log("Received news data:", response.data);

      setNewsData(response.data);
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleFetchNewsClick = () => {
    if (stockData && stockData.results && stockData.results.length > 0) {
      const selectedStockSymbol = stockData.results[0].T;
      fetchNewsData(selectedStockSymbol);
    }
  };

  const handleFetchStockClick = () => {
    const symbol = getRandomStockSymbol();
    fetchStockData(symbol);
  };

  const handleToggleNews = () => {
    setShowNews(!showNews);
  };

  const getRandomStockSymbol = () => {
    const randomIndex = Math.floor(Math.random() * stocks.length);
    return stocks[randomIndex].symbol;
  };

  useEffect(() => {
    const defaultStockSymbol = getRandomStockSymbol();
    fetchStockData(defaultStockSymbol);
  }, []); // Empty dependency array ensures the effect runs only on mount

  if (
    loadingStock ||
    !stockData ||
    !stockData.results ||
    stockData.results.length === 0
  ) {
    return <p>Loading stock data...</p>;
  }

  const firstResult = stockData.results[0];

  // Format timestamp in 12-hour format
  const formattedTimestamp = new Date(firstResult.t).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const selectedStock = stocks.find((stock) => stock.symbol === firstResult.T);

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <h2 className="card-title">
            Stock Data for {selectedStock.name} ({firstResult.T})
          </h2>
          <p className="card-text">
            <strong>Open:</strong> {firstResult.o}
            <br />
            <strong>High:</strong> {firstResult.h}
            <br />
            <strong>Low:</strong> {firstResult.l}
            <br />
            <strong>Close:</strong> {firstResult.c}
            <br />
            <strong>Volume:</strong> {firstResult.v}
            <br />
            <strong>Timestamp:</strong> {formattedTimestamp}
            <br />
          </p>
          <button
            className="btn btn-primary m-2"
            onClick={handleFetchNewsClick}
          >
            Fetch News
          </button>
          <button
            className="btn btn-secondary m-2"
            onClick={handleFetchStockClick}
          >
            Fetch New Stock
          </button>
          <button className="btn btn-info m-2" onClick={handleToggleNews}>
            {showNews ? "Hide News" : "Show News"}
          </button>
        </div>
      </div>

      {showNews && (
        <div className="card mx-auto mt-3" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h2 className="card-title">News Data</h2>
            {loadingNews ? (
              <p>Loading news data...</p>
            ) : (
              newsData &&
              newsData.articles.map((article) => (
                <div key={article.id}>
                  <h5>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </h5>
                  <p>
                    <p>{article.description}</p>
                    <strong>Date Published:</strong>{" "}
                    {new Date(article.publishedAt).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </p>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
