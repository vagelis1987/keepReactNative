import React, {useContext, useState} from 'react';
import {Button, TextInput, View, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={userName}
          placeholder="Enter Username"
          onChangeText={text => setUserName(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={() => {
            login(userName, password);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default LoginScreen;
