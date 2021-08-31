import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Animated,
  Easing,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000',
    lineHeight: 18,
  },
  iconButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    height: 40,
  },
  inputButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#334155',
    justifyContent: 'center',
    height: 40,
  },
  inputButtonText: {
    fontSize: 14,
    color: '#FFF',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#A9A9A9',
    // borderColor: '#0D47A1',
    minHeight: 52,
  },
  label: {
    fontWeight: '500',
    marginVertical: 5,
    fontSize: 14,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const resetIcon = require('../../assets/reset.png');
const shuffleIcon = require('../../assets/shuffle.png');

const CustomInput = ({
  value,
  label,
  placeholder,
  onChangeText,
  button,
  buttonText,
  onButtonPress,
  keyboardType,
  icon,
  multiline,
  animation,
}) => {
  const _renderIcon = () => {
    switch (icon) {
      case 'reset':
        return resetIcon;
      case 'shuffle':
        return shuffleIcon;
      default:
        return;
    }
  };

  const _renderImage = () => {
    return (
      <Image
        source={_renderIcon()}
        style={[
          {
            width: 24,
            height: 24,
          },
        ]}
      />
    );
  };
  return (
    <View style={{marginVertical: 10}}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <View style={{flex: 1}}>
          <TextInput
            onChangeText={onChangeText}
            value={value}
            style={styles.input}
            placeholder={placeholder}
            multiline={multiline}
            keyboardType={keyboardType || 'default'}
          />
        </View>
        {button && (
          <TouchableOpacity
            style={icon ? styles.iconButton : styles.inputButton}
            onPress={() => {
              onButtonPress();
            }}>
            {buttonText && (
              <Text style={styles.inputButtonText}>{buttonText}</Text>
            )}
            {icon && _renderImage()}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
