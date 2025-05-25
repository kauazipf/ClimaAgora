import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia!';
  if (hour < 18) return 'Boa tarde!';
  return 'Boa noite!';
};

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()}</Text>
      <Button title="Ver clima agora" onPress={() => navigation.navigate('Weather')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  greeting: { fontSize: 28, marginBottom: 20 }
});
