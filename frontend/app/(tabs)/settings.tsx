import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  const [name, setName] = useState('USER_NAME');
  const [career, setCareer] = useState('Ingeniería en Virginidad');

  //en teoria aca va lode back
  const handleSaveChanges = () => {
    alert('Cambios hechos');
    //su tonto mysql
  };

  const goBack = () => {
    router.push('./(tabs)/');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Ajustes del Perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Escribe tu nombre"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Carrera:</Text>
        <TextInput
          style={styles.input}
          value={career}
          onChangeText={setCareer}
          placeholder="Escribe tu carrera"
          placeholderTextColor="#999"
        />
      </View>

        <View style={styles.buttonContainer}>
            <Button title="Guardar Cambios" color="#ffd33d" onPress={handleSaveChanges} />
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Volver" color="#ff3333" onPress={goBack} />
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
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ffd33d',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});
