import React from 'react';

import {TextInput, View} from 'react-native';

const Input = ({placeHolder, onChangeText, secureTextEntry, value, inputStyle}) => {
  return (
    <>
      <TextInput
        value={value}
        style={inputStyle}
        placeHolder={placeHolder}
        onChangeText={onChangeText}
        securetextEntry={secureTextEntry}
      />
    </>
  );
};
export default Input;
