import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from '../components/Themed';
import { Token, User } from '../types';
import LoginForm from './SettingScreen/LoginForm';
import { Container } from '../components/Container';
import axios from 'axios';
import { API_URL } from '../globals';
import UserDisplay from './SettingScreen/UserDisplay';

export default function SettingsScreen() {
  const [token, setToken] = useState<Token | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const fetchedToken = await AsyncStorage.getItem('token');
      const fetchedUser = await AsyncStorage.getItem('user');
      if (fetchedToken) {
        setToken(fetchedToken);
      }
      if (fetchedUser) {
        setUser(JSON.parse(fetchedUser));
      }
    })();
  }, []);

  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <Container>
      {user ? (
        <UserDisplay user={user} signOut={signOut} />
      ) : (
        <LoginForm handleSubmit={handleSubmit} />
      )}
    </Container>
  );
}
