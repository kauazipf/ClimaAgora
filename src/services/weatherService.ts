import axios from 'axios';

const API_KEY = 'ff704301ab485137b4f3bc89d5d6145a'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeather(lat: number, lon: number) {
  const response = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'pt_br'
    }
  });
  return response.data;
}
