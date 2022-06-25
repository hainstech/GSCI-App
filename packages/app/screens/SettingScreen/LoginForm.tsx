import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { LoginTextInput } from '../../components/TextInput';

interface LoginFormProps {
  handleSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ handleSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={{
        width: '60%',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
          alignSelf: 'center',
        }}
      >
        Sign In
      </Text>
      <LoginTextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <LoginTextInput
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        title="Sign In"
        onPress={() => {
          handleSubmit(email, password);
        }}
      />
    </View>
  );
}
