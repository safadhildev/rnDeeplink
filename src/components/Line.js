import React from 'react';
import {View} from 'react-native-animatable';

const Line = ({vertical, color}) => {
  if (vertical) {
    return (
      <View
        style={{
          width: 1,
          height: '100%',
          backgroundColor: color || '#CBD5E1',
          marginVertical: 5,
        }}>
        {}
      </View>
    );
  }

  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: color || '#CBD5E1',
        marginVertical: 5,
      }}>
      {}
    </View>
  );
};

export default Line;
