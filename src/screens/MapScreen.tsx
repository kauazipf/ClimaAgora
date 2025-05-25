import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/NavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useLocation from '../hooks/useLocation';

export default function MapScreen() {
  const { location, errorMsg } = useLocation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (errorMsg) return <Text style={styles.error}>{errorMsg}</Text>;
  if (!location) return <Text style={styles.loading}>Carregando localização...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mapa da sua localização</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Você está aqui"
        />
      </MapView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.goBack()}>
        <Text style={styles.fabText}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    height: 60,
    backgroundColor: '#028220',
    justifyContent: 'center',
    paddingHorizontal: 16,
    elevation: 4,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#028220',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 50,
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    marginTop: 50,
    color: '#D00',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});
