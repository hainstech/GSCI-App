import Constants from 'expo-constants';
const { manifest } = Constants;

// export const API_URL = 'https://yoki-wqqoimymxa-ue.a.run.app/';
export const API_URL =
  typeof manifest?.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost?.split(`:`).shift()?.concat(`:3000`)}`
    : `https://yoki-wqqoimymxa-ue.a.run.app/`;

export const colors = {
  danger: '#ff6060',
};
