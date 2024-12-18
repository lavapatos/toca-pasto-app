import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert('tus contraseñas hacen menos match que tu con el resto de seres humanos');
      } else {
        try {
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              correo: email,
              password: password,
              nombre: 'name',
            }),
          });

          const data = await response.text();

          if (response.status === 302) {
            alert('Muy bien, sabes escribir');
          } else {
            alert(data);
          }
        } catch (error) {
          alert('Error con el server :((');
        }
      }
    } else {
      alert('Yapo weon llena todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Regístrate</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={handleRegister} color="#ffd33d" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '50%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
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
    borderRadius: 10, //igual los dejo ahí
  },
});

export default RegisterScreen;
