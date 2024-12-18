import { Text, View, StyleSheet, ScrollView, Button, Linking } from 'react-native';

export default function AboutScreen() {
  const handleDonatePress = () => {
    Linking.openURL('https://donate.unrwa.org/monthly/~my-donation');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Acerca de TocaPasto</Text>
      <Text style={styles.text}>
        TocaPasto es un espacio para encontrar personas afines a tu caos universitario. Conecta con quienes comparten tus tiempos libres, descansos y, por supuesto, tu necesidad de escapar del estrés académico.
      </Text>
      <Text style={styles.text}>
        Olvídate de las típicas apps: aquí lo que importa es pasar un buen rato y hacer conexiones auténticas mientras navegas por el día a día universitario.
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Donar" color="#FFD33D" onPress={handleDonatePress} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#25292e',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD33D',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',  
    paddingHorizontal: 20,
  },
});
