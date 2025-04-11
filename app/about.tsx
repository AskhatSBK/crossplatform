import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const key_func = [
  'Divide into groups',
  'Create group name',
  'Division by (skill, age, etc.)',
  'Export to Google Sheet',
  'Invitation to group',
];

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>{"About Us"}</Text>
        <Text style={styles.header}>{"Random Team Generator"}</Text>
        <Text style={styles.header}>
          {"\nKey Features:"}
        </Text>
        {/* Feature list */}
        {key_func.map((item, index) => (
          <Text key={index} style={styles.item}>{`\u2022 ${item}`}</Text>
        ))}

        {/* Info block */}
        <Text style={styles.text}>
          {"\nFramework: React Native (Expo)\nDatabase: Firebase\nWe will use Google Sheets API"}
        </Text>

        {/* Welcome message */}
        <Text style={styles.text}>
        Developed by Sabitkhanov Askhat, Ashenov Bexulatn in the scope of the course "Crossplatform Development" at Astana IT University.
        Mentor (Teacher): Assistant Professor Abzal Kyzyrkanov
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 4,
  },
}); 