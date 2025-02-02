import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const questions = [
  { id: '1', text: 'Seberapa puas Anda dengan layanan kami?' },
  { id: '2', text: 'Apa yang dapat kami tingkatkan?' },
  { id: '3', text: 'Apakah Anda akan merekomendasikan layanan kami kepada orang lain?' }
];

export default function SurveyScreen() {
  const { id } = useLocalSearchParams();
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, text) => {
    setAnswers({ ...answers, [questionId]: text });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey: {id}</Text>
      <Text style={styles.description}>Silakan isi survei ini dengan jawaban yang sesuai.</Text>
      
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.text}</Text>
            <TextInput
              style={styles.input}
              placeholder="Jawaban Anda"
              value={answers[item.id] || ''}
              onChangeText={(text) => handleAnswerChange(item.id, text)}
            />
          </View>
        )}
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Kirim Jawaban</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    width: '100%',
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});