import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { Link,useRouter } from 'expo-router';


export default function UserProfile() {
  const router = useRouter();
  const handleLogout = () => {
    alert('Se cerró y debería tirar al login');
    router.push('../');
  };

  const handleSchedule = () => {
    alert('Mostrar horario');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri:'https://via.placeholder.com/150'}}
      />
      <Text style={styles.name}>USER_NAME</Text>
      <Text style={styles.details}>Carrera: Ingeniería en Virginidad</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.details}>Sexo: 0%</Text>
        <Text style={styles.details}>Género: Lírico</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Horario" color="#ffd33d" onPress={handleSchedule} />
        </View>
        <View style={styles.button}>
          <Button title="Log Out" color="#ff3333" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  details: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 22,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  },
});

