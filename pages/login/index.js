import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Button} from '../../components';
import Header from '../../components/header';
import Input from '../../components/input';
import {useFields} from '../../hooks';
import login_styles from './styles.scss';
const styles = require('../../styles');
import {createUser, login} from '../../services/user.service.js';
import Snackbar from 'react-native-snackbar';
import {errorMessage} from '../../utils/snackbar';
const initial_form = {
  username: '',
  password: '',
};

const Login = props => {
  const {colors} = useTheme();
  const {fields, onChangeFields} = useFields(initial_form);
  const {
    route: {params},
    navigation,
  } = props;

  const goTo = id => {
    if (params.isCreateAccount) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Dashboard', {
        userId: id,
      });
    }
  };

  const submit = async () => {
    try {
      if (params.isCreateAccount) {
        const response = await createUser(fields);
        if (response && response.success) {
          goTo();
        } else {
          errorMessage(response.message);
        }
      } else {
        const response = await login(fields);
        if (response && response.success) {
          goTo(response.id);
        } else {
          errorMessage(response.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Header
        header_style={{
          left: -55,
          top: -120,
        }}
        title={params.isCreateAccount ? 'Opret bruger' : 'Log ind'}
        title_style={{...styles.second_title, color: colors.text}}
      />
      <View style={login_styles.form}>
        <Input
          label={'Brugernavn'}
          label_styles={login_styles.label}
          theme={colors}
          onChangeText={text => onChangeFields('username', text)}
        />
        <Input
          label={'Adgangskode'}
          label_styles={login_styles.label}
          theme={colors}
          secureTextEntry={true}
          onChangeText={text => onChangeFields('password', text)}
        />
        <View style={{alignItems: 'center', marginTop: 65}}>
          <Button
            text={params.isCreateAccount ? 'Fortsæt' : 'Log ind'}
            theme={colors}
            onPress={submit}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
