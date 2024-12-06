import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/coincidencias');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Usuarios</Text>
        <TouchableOpacity onPress={handleNavigate} style={styles.button}>
          <Text style={styles.buttonText}>Coincidencias</Text>
        </TouchableOpacity>
      </View>

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
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#ffd33d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
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
  listContent: {
    justifyContent: 'space-around',
  },
});
