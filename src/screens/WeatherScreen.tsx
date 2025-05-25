import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/NavigationTypes';
import useLocation from '../hooks/useLocation';
import { fetchWeather } from '../services/weatherService';

export default function WeatherScreen() {
  const { location, errorMsg } = useLocation();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (location) {
      fetchWeather(location.coords.latitude, location.coords.longitude)
        .then(setWeather)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (errorMsg) return <Text style={styles.error}>{errorMsg}</Text>;
  if (loading) return <ActivityIndicator size="large" color="#028220" />;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temp}>{weather.main.temp.toFixed(0)}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>
      <Text style={styles.feels}>Sensação térmica: {weather.main.feels_like.toFixed(0)}°C</Text>
      <Text style={styles.date}>{new Date().toLocaleString('pt-BR')}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar para Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('Mapa')}>
        <Text style={styles.backButtonText}>Ver no Mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  temp: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#028220',
  },
  desc: {
    fontSize: 20,
    color: '#555',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  feels: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  date: {
    marginTop: 16,
    fontSize: 14,
    color: '#888',
  },
  error: {
    color: '#D00',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#028220',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  mapButton: {
    marginTop: 10,
    backgroundColor: '#028220',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
