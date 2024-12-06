import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Matches() {
  const users = ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4', 'Usuario 5'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coincidencias</Text>

      <View style={styles.matchesContainer}>
        {users.map((user, index) => (
          <TouchableOpacity key={index} style={styles.userCard}>
            <Text style={styles.userText}>{user}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    color: '#ffd33d',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  matchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  userCard: {
    backgroundColor: '#ffd33d',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
