import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import useLocation from './../hooks/useLocation';
import { fetchWeather } from './../services/weatherService';

export default function WeatherScreen() {
  const { location, errorMsg } = useLocation();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      fetchWeather(location.coords.latitude, location.coords.longitude)
        .then(setWeather)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text>{weather.weather[0].description}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
        style={{ width: 100, height: 100 }}
      />
      <Text>Sensação térmica: {weather.main.feels_like}°C</Text>
      <Text>{new Date().toLocaleString('pt-BR')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  temp: { fontSize: 48 }
});
