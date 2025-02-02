import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const initialAnswers = [
  { id: '1', question: 'Seberapa puas Anda dengan layanan kami?', answer: 'Sangat puas' },
  { id: '2', question: 'Apa yang dapat kami tingkatkan?', answer: 'Pelayanan lebih cepat' },
  { id: '3', question: 'Apakah Anda akan merekomendasikan layanan kami kepada orang lain?', answer: 'Ya, pasti' }
];

export default function SurveyResultsScreen() {
  const { id } = useLocalSearchParams();
  const [answers, setAnswers] = useState(initialAnswers);

  const handleAnswerChange = (answerId, text) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((item) =>
        item.id === answerId ? { ...item, answer: text } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hasil Survei: {id}</Text>
      <Text style={styles.description}>Berikut adalah jawaban survei yang telah Anda isi. Anda dapat mengeditnya jika diperlukan.</Text>
      
      <FlatList
        data={answers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.answerContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <TextInput
              style={styles.input}
              value={item.answer}
              onChangeText={(text) => handleAnswerChange(item.id, text)}
            />
          </View>
        )}
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
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
  answerContainer: {
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
