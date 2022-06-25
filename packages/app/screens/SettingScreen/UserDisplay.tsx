import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../../components/Card';
import { colors } from '../../globals';
import { User } from '../../types';

export default function UserDisplay({
  user,
  signOut,
}: {
  user: User;
  signOut: () => void;
}) {
  return (
    <View
      style={{
        width: '60%',
      }}
    >
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              padding: 7,
            }}
          >
            Signed in as: {user.email}
          </Text>
          <TouchableOpacity
            style={{
              padding: 7,
              backgroundColor: colors.danger,
              borderRadius: 10,
            }}
            onPress={() => {
              signOut();
            }}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}
