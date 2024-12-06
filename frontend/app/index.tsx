import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { Link,useRouter } from 'expo-router';



const LoginView = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const  router = useRouter();
  const handleLogin = () => {
    if (email && password) {
      // Cambiar cuando tengamos backend
      router.push('/(tabs)');
    } else {
      alert('No hay logueo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicia sesión</Text>
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
      <View style={styles.buttonContainer}>
        <Button 
          title="Iniciar sesión" 
          color='#ffd33d' 
          onPress={handleLogin} 
        />
      </View>
      <Text style={styles.registerText}>¿No tienes cuenta?</Text>
      <Link href="/register" style={styles.button}>
        Regístrate aquí
      </Link>
    </View>
  );
};

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginView onLogin={() => setIsLoggedIn(true)} />
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
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
    marginTop: 20,
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
    borderRadius: 10,
  },
  registerText: {
    color: '#fff',
    marginTop: 10,
  },
});
