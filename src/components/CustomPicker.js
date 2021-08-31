import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
    // marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#A9A9A9',
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

const CustomPicker = ({label, selectedValue, onValueChange, data}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Picker
          mode={'dropdown'}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{height: 50, alignItems: 'center'}}>
          {data?.map(item => (
            <Picker.Item label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomPicker;
