import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import Button from '../../components/Button';
import Loading from '../../components/Loading';

export default function Signup({ navigation }) {

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');

  function onPressRegister() {
    if (username.trim() === '' || pass === '' || repass === '') {
      Alert.alert('Uyarı', 'Lütfen alanları eksiksiz doldurunuz');
    }
    else if (pass.trim() !== repass.trim()) {
      Alert.alert('Uyarı', 'Şifreler eşleşmiyor');
    }
    else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(username, pass)
        .then(() => {
          Alert.alert('User account created');
          setLoading(false);
          navigation.navigate('login');
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
        <Text style={styles.label}>Lütfen aşağıdaki alanları eksiksiz doldurun.</Text>
        {/* <TextInput style={styles.input} placeholder='Kullanıcı adı' /> */}
        <TextInput
          style={styles.input}
          placeholder='E-posta adresi'
          onChangeText={(text) => setUsername(text)} />
        <TextInput
          style={styles.input}
          placeholder='Şifre'
          secureTextEntry
          onChangeText={(text) => setPass(text)} />
        <TextInput style={styles.input}
          placeholder='Şifre tekrar'
          secureTextEntry
          onChangeText={(text) => setRepass(text)} />
        <Button buttonText='Kayıt Ol' onPress={onPressRegister} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    margin: 12,
    fontWeight: 'bold'
  },
  input: {
    height: 35,
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 8,
    elevation: 5
  }
});

