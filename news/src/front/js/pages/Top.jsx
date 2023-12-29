// NewsComponent.js
import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import SearchBar from '../component/SearchBar';
import WeatherComponent from '../component/weather';


const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPublishedAt = (publishedAt) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // Use 12-hour clock
      timeZone: 'UTC', // UTC time zone
    };

    return new Date(publishedAt).toLocaleString('en-US', options);
  };


  const searchNews = async (query) => {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=fdd1aee90ddd3637423bb20da2bf0ad1`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNews(data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleTopicSelect = (topic) => {
    // Trigger the searchNews function with the selected topic
    searchNews(topic);
  };

  useEffect(() => {
    // Fetch general top headlines when the component mounts
    searchNews('general');
  }, []); // Empty dependency array to ensure it only runs once when mounted

  return (
    <div>
      <Navbar onTopicSelect={handleTopicSelect} />
      <WeatherComponent/>
      <div className="container mt-4">
        <h1 className="mb-4">Top Headlines</h1>
        <SearchBar onSearch={searchNews} />
        <div className="row row-cols-1 row-cols-md-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            news.map((article) => (
              <div key={article.url} className="col mb-4">
                <div className="card">
                  <img
                    src={article.image}
                    className="card-img-top"
                    alt={article.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                    <p className="card-text">
                      <strong>Source:</strong> {article.source.name}
                    </p>
                    <p className="card-text">
                      <strong>Published At:</strong>{' '}
                      {formatPublishedAt(article.publishedAt)}
                    </p>
                    <a
                      href={article.url}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
