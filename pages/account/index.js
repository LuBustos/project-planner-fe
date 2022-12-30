import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../components';
import Header from '../../components/header';
import Input from '../../components/input';
import {useFields} from '../../hooks';
import {getUserById, updateUser} from '../../services/user.service.js';
import {errorMessage} from '../../utils/snackbar';
import login_styles from '../login/styles.scss';
import {textStyle} from '../../mixin';
import t from '../../localization';

const styles = StyleSheet.create({
  title: {
    ...textStyle('600', 18, 27),
    letterSpacing: 1,
    marginLeft: 27,
    marginBottom: 30,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  form: {
    alignSelf: 'center',
  }
});

const initial_form = {
  username: '',
  password: '',
  avatar: '',
};

const Account = props => {
  const {colors} = useTheme();
  const {fields, onChangeFields, saveAllFields} = useFields(initial_form);
  const {
    route: {params},
    navigation,
  } = props;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await getUserById(params.userId);
    if (response.success) {
      saveAllFields(response.data);
    } else {
      errorMessage('Ooops! something happened');
    }
  };

  const isEmpty = text => (text.length === 0 ? true : false);

  const validation = () => {
    const {username, password} = fields;
    if (!isEmpty(username) && !isEmpty(password)) {
      return true;
    }

    return false;
  };

  const submit = async () => {
    if (validation()) {
      const response = await updateUser(params.userId, fields);
      if (response.success) {
        navigation.navigate('Dashboard', {
          userId: params.userId,
        });
      }
    } else {
      errorMessage('Password or username empty');
    }
  };

  return (
    <View>
      <Header
        height={'55%'}
        header_style={{
          left: -55,
          top: -150,
        }}
        isGoBack
        isAccount
        profilePhoto={fields.avatar}
        arrowTop={'23%'}
        userId={params.userId}
      />
      <View style={styles.container}>
        <Text style={{...styles.title, color: colors.backgroundButton}}>
          {t.konto}
        </Text>
        <View style={styles.form}>
          <Input
            label={t.brugernavn}
            label_styles={login_styles.label}
            theme={colors}
            onChangeText={text => onChangeFields('username', text)}
            value={fields.username}
          />
          <Input
            label={t.adgangskode}
            label_styles={login_styles.label}
            theme={colors}
            secureTextEntry={true}
            onChangeText={text => onChangeFields('password', text)}
            value={fields.password}
            clearTextOnFocus
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 45}}>
          <Button text={t.gem} theme={colors} onPress={submit} />
        </View>
      </View>
    </View>
  );
};

export default Account;
