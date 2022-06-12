import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../components/Container';
import { Text, View } from '../components/Themed';
import { Questionnaire } from '../types';
import { getQuestionnaires } from '../utils/requests';
import { QuestionnairesButton } from './QuestionnairesScreen/QuestionnairesButton';

export default function QuestionnaireScreen() {
  const navigation = useNavigation();

  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const fetchedQuestionnaires = await getQuestionnaires();
        setQuestionnaires(fetchedQuestionnaires);
      })();
    }, [])
  );

  return (
    <Container>
      {questionnaires.map((questionnaire) => (
        <QuestionnairesButton
          key={questionnaire._id}
          title={questionnaire.title}
          onPress={() => {
            navigation.navigate('Questionnaire', { questionnaire });
          }}
        />
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
