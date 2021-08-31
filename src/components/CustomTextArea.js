import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 60,
    paddingVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginVertical: 3,
  },

  hint: {
    fontSize: 14,
    color: '#9E9E9E',
    alignSelf: 'flex-end',
  },
  subtitle: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#37474F',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#CFD8DC',
    borderRadius: 5,
  },
  textWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 50,
  },
});

const CustomTextArea = ({label, value, onPress, hint, error}) => {
  return (
    <>
      {label && <Text style={styles.subtitle}>{label}</Text>}
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={onPress} style={styles.textWrapper}>
          <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
      {error && <Text style={[styles.hint, {color: '#F44336'}]}>{error}</Text>}
    </>
  );
};

export default CustomTextArea;
