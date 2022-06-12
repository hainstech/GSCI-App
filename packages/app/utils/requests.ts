import axios from 'axios';
import Constants from 'expo-constants';
import { Questionnaire } from '../types';
const { manifest } = Constants;

const URI = `http://${manifest?.debuggerHost
  ?.split(':')
  ?.shift()
  ?.concat(`:3000`)}`;

// get resquest to /questionnaire
export const getQuestionnaires = async (): Promise<Questionnaire[]> => {
  const response = await axios.get(`${URI}/questionnaire`);
  return response.data;
};
