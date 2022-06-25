import Constants from 'expo-constants';
const { manifest } = Constants;

export const API_URL =
  typeof manifest?.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost?.split(`:`).shift()?.concat(`:3000`)}`
    : `http://api:com`;

export const colors = {
  danger: '#ff6060',
};
