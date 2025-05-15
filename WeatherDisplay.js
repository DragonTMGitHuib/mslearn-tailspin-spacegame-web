import React, { useEffect, useState } from 'react';

// props: city（都市名）
const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // MCPサーバー連携（仮エンドポイントと仮レスポンス構造）
        const response = await fetch('https://example.com/mcp/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city }),
        });
        if (!response.ok) throw new Error('天気情報の取得に失敗しました');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) return <div>天気情報を取得中...</div>;
  if (error) return <div>エラー: {error}</div>;
  if (!weather) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '2rem',
      fontSize: '1.2rem'
    }}>
      <h2>{city}の天気</h2>
      <div>気温: {weather.temperature}℃</div>
      <div>天気: {weather.description}</div>
      <div>湿度: {weather.humidity}%</div>
    </div>
  );
};

export default WeatherDisplay;
