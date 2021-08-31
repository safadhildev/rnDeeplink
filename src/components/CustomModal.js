import React, {Children} from 'react';
import {View, Text} from 'react-native-animatable';
import RNModal from 'react-native-modal';

const CustomModal = ({show, onClose, children}) => {
  return (
    <RNModal
      animationIn="slideInUp"
      isVisible={show}
      swipeDirection="down"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeThreshold={50}
      //   onRequestClose={onRequestClose}
      style={{
        flex: 1,
        marginTop: 50,
        marginHorizontal: 0,
        marginBottom: 0,
      }}>
      {children}
    </RNModal>
  );
};

export default CustomModal;
