import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Sae } from 'react-native-textinput-effects';

export default (props) => (
  <View>
    <Text>{ props.label }</Text>
    <TextInput
      onTextChange = { props.onChangeText }
      value = { props.value }
      style={{
        alignSelf: "stretch"
      }}
    />
  </View>
)
