import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function UserProfile() {
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const router = useRouter();

  const handleLogout = () => {
    alert('Se cerró y debería tirar al login');
    router.push('../');
  };

  const handleSchedule = () => {
    alert('Mostrar horario');
    router.push('./schedule');
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Deja ver las fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const goToSettings = () => {
    router.push('../settings');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsIcon} onPress={goToSettings}>
        <Ionicons name="settings" size={30} color='#ffd33d' />
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage}>
        <Image style={styles.profileImage} source={{ uri: image }} />
      </TouchableOpacity>

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
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 50,
    padding: 10,
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
