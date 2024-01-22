import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { colors } from '../api/constants/color';
export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.button_color,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        width:300,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
