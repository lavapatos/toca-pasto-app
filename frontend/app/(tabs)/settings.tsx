import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function Settings() {
  const router = useRouter();

  const [name, setName] = useState('USER_NAME');
  const [career, setCareer] = useState('Ingeniería en Virginidad');
  const [gender, setGender] = useState('Mujer con Pene');
  const [rut, setRut] = useState('11091973-K');
  const [facultad, setFacultad] = useState('FIC');

  const handleSaveChanges = () => {
    alert('Cambios hechos');
  };

  const goBack = () => {
    router.push('./');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes del Perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rut:</Text>
        <TextInput
          style={styles.input}
          value={rut}
          onChangeText={setRut}
          placeholder="Rut"
          placeholderTextColor="#999"
        />
      </View>

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
        <Text style={styles.label}>Facultad:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={career}
            style={styles.picker}
            onValueChange={(itemValue) => setCareer(itemValue)}
          >
            <Picker.Item label="FIC" value="FIC" />
            <Picker.Item label="PSICO" value="PSICO" />
            <Picker.Item label="Facultad3" value="Facultad3" />
            <Picker.Item label="Facultad4" value="Facultad4" />
            <Picker.Item label="Facultad5" value="Facultad5" />
            <Picker.Item label="Facultad6" value="Facultad6" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Carrera:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={career}
            style={styles.picker}
            onValueChange={(itemValue) => setCareer(itemValue)}
          >
            <Picker.Item label="Ingeniería en Virginidad" value="Ingeniería en Virginidad" />
            <Picker.Item label="Carrera2" value="Carrera2" />
            <Picker.Item label="Carrera3" value="Carrera3" />
            <Picker.Item label="Carrera4" value="Carrera4" />
            <Picker.Item label="Carrera5" value="Carrera5" />
            <Picker.Item label="Carrera6" value="Carrera6" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Género:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={career}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Mujer con Vagina" value="Mujer con Vagina" />
            <Picker.Item label="Mujer con Pene" value="Mujer con Pene" />
            <Picker.Item label="No Mujer" value="No Mujer" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <View style={styles.button}>
          <Button title="Guardar Cambios" color="#ffd33d" onPress={handleSaveChanges} />
        </View>
        <View style={styles.button}>
          <Button title="Volver" color="#ff3333" onPress={goBack} />
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
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingLeft: 10,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  
  picker: {
    height: 40,
    color: '#000',
    fontSize: 10,
  },
});
