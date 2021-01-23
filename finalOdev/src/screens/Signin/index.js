import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import Button from '../../components/Button';
import Loading from '../../components/Loading';

export default function Signin({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      console.log('user', user);
      navigation.navigate('home', { user: user.email });
    } else {
      setLoading(false);
    }
  }

  function onPressRegister() {
    navigation.navigate('register')
  }

  function onPressLogin() {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Uyarı', 'Lütfen alanları eksiksiz doldurun')
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          console.log('User signed in!');
          setLoading(false);
          navigation.navigate('home', { user: username });
        })
        .catch(error => {
          setLoading(false);
          Alert.alert(error.code);
        });
    }
  }

  return (
    loading ? <Loading /> :
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.headerText}>HABER UYGULAMASINA HOŞGELDİNİZ</Text>
          <Text style={[styles.headerText, { fontWeight: '500' }]}>Lütfen giriş yapın</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder='E-posta adresinizi girin'
              onChangeText={(text) => setUsername(text)} />
            <TextInput
              style={styles.input} placeholder='Şifrenizi girin'
              secureTextEntry
              onChangeText={(text) => setPassword(text)} />
            <Button
              buttonText='Giriş Yap'
              onPress={onPressLogin}
            />
            <TouchableOpacity onPress={onPressRegister}>
              <Text style={styles.link}>Hesabınız yok mu ? Hemen kaydolun</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  wrapper: {
    height: '75%',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5
  },
  headerText: {
    textAlign: 'center',
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 24
  },
  inputView: {
    height: '40%',
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  input: {
    height: 35,
    width: '90%',
    borderWidth: 1,
    borderRadius: 8,
    margin: 8
  },
  link: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    margin: 8
  }
});