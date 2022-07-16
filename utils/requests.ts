import axios from 'axios';
import { API_URL } from '../globals';
import { Questionnaire } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getQuestionnaires = async (): Promise<Questionnaire[]> => {
  let questionnaires = [];

  try {
    const response = await axios.get(`${API_URL}/questionnaire`);
    await AsyncStorage.setItem('questionnaires', JSON.stringify(response.data));
    console.log('Used the API questionnaires');
    questionnaires = response.data;
  } catch (error) {
    console.log('Used the cached questionnaires');
    const questionnairesString = await AsyncStorage.getItem('questionnaires');
    if (questionnairesString) {
      questionnaires = JSON.parse(questionnairesString);
    }
  }

  return questionnaires;
};
