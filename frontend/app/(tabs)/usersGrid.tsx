import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';

interface User {
  id: string;
  name: string;
  image: string;
}

const users: User[] = [
  { id: '1', name: 'Usuario 1', image: 'https://placeimg.com/100/100/people' },
  { id: '2', name: 'Usuario 2', image: 'https://placeimg.com/100/100/people' },
  { id: '3', name: 'Usuario 3', image: 'https://placeimg.com/100/100/people' },
  { id: '4', name: 'Usuario 4', image: 'https://placeimg.com/100/100/people' },
  { id: '5', name: 'Usuario 5', image: 'https://placeimg.com/100/100/people' },
  { id: '6', name: 'Usuario 6', image: 'https://placeimg.com/100/100/people' },
  { id: '9', name: 'Usuario 7', image: 'https://placeimg.com/100/100/people' },
  { id: '8', name: 'Usuario 8', image: 'https://placeimg.com/100/100/people' },
  { id: '9', name: 'Usuario 9', image: 'https://placeimg.com/100/100/people' },
  { id: '10', name: 'Usuario 10', image: 'https://placeimg.com/100/100/people' },
  { id: '11', name: 'Usuario 11', image: 'https://placeimg.com/100/100/people' },
  { id: '12', name: 'Usuario 12', image: 'https://placeimg.com/100/100/people' },
  { id: '13', name: 'Usuario 13', image: 'https://placeimg.com/100/100/people' },
  { id: '14', name: 'Usuario 14', image: 'https://placeimg.com/100/100/people' },
];

export default function UsersGrid() {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }: { item: User }) => (
          <View style={styles.userCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 10,
    //justifyContent: 'center',
  },
  listContent: {
    justifyContent: 'space-around',
  },
  userCard: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    maxWidth: 150,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    color: '#fff',
    marginTop: 10,
  },
});
