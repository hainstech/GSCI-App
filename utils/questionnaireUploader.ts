import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '../globals';
import { FilledQuestionnaire, User } from '../types';

const storeQuestionnaire = async (
  questionnaire: FilledQuestionnaire
): Promise<void> => {
  const storedQuestionnaires = await AsyncStorage.getItem(
    'filledQuestionnaires'
  );
  const questionnaires = storedQuestionnaires
    ? JSON.parse(storedQuestionnaires)
    : [];
  questionnaires.push(questionnaire);
  await AsyncStorage.setItem(
    'filledQuestionnaires',
    JSON.stringify(questionnaires)
  );

  Alert.alert(
    'Saved to storage',
    'The questionnaire has been saved successfully'
  );
};

export const pushStoredQuestionnaires = async (): Promise<void> => {
  try {
    const storedQuestionnaires = await AsyncStorage.getItem(
      'filledQuestionnaires'
    );
    const questionnaires = storedQuestionnaires
      ? JSON.parse(storedQuestionnaires)
      : [];
    if (questionnaires.length > 0) {
      const token = await getToken();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const url = await getQuestionnairesUrl();
      const body = JSON.stringify(questionnaires);
      const response = await axios.post(url, body, { headers });
      if (response.status !== 201) {
        throw new Error('Error uploading questionnaires');
      }
      await AsyncStorage.removeItem('filledQuestionnaires');
      Alert.alert(
        'Questionnaires pushed',
        'The questionnaires have been pushed successfully'
      );
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred while pushing the questionnaires');
  }
};

export const pushQuestionnaire = async (
  questionnaire: FilledQuestionnaire
): Promise<void> => {
  try {
    const token = await getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const url = await getQuestionnairesUrl();
    const body = JSON.stringify([questionnaire]);
    await axios.post(url, body, { headers });
    await pushStoredQuestionnaires();
    console.log('Questionnaires pushed');
  } catch (error) {
    console.log('Adding the questionnaire to the queue');
    storeQuestionnaire(questionnaire);
  }
};

const getToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    return token;
  } catch (error) {
    Alert.alert(
      'Error',
      'You are not logged in. The questionnaire will be uploaded automatically when you log in.'
    );
    throw new Error('No token found');
  }
};

const getQuestionnairesUrl = async (): Promise<string> => {
  const storedUser = await AsyncStorage.getItem('user');
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  if (!user) {
    throw new Error('No user found');
  }
  return `${API_URL}/carer/${user.carerId}/questionnaires`;
};
