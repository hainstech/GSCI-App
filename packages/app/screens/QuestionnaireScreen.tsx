import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { Container } from '../components/Container';
import { RootStackScreenProps } from '../types';

export default function QuestionnaireScreen({
  route,
}: RootStackScreenProps<'Questionnaire'>) {
  const { questionnaire } = route.params;
  return (
    <Container>
      <Text>{questionnaire.title}</Text>
    </Container>
  );
}
