import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../components';
import Header from '../../components/header';
import Input from '../../components/input';
import {useFields} from '../../hooks';
import t from '../../localization';
import {createUser, login} from '../../services/user.service.js';
import styles from '../../styles';
import {errorMessage} from '../../utils/snackbar';
import {saveData} from '../../utils/storage';

const login_styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 2,
    textAlign: 'left',
    marginLeft: 22,
  },
  form: {
    marginTop: -100,
    padding: 20,
    alignSelf: 'center',
  },
});

const initial_form = {
  username: '',
  password: '',
};

const Login = props => {
  const {colors} = useTheme();
  const {fields, onChangeFields, cleanFields} = useFields(initial_form);
  const {
    route: {params},
    navigation,
  } = props;

  const goTo = async id => {
    cleanFields();
    await saveData(id, params.isCreateAccount ? true : false);
    if (params.isCreateAccount) {
      try {
        navigation.navigate('Profile', {
          userId: id,
          isCreateAccount: true,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate('Dashboard', {
        userId: id,
      });
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
      if (params.isCreateAccount) {
        const response = await createUser(fields);
        if (response && response.success) {
          goTo(response.data);
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
    } else {
      errorMessage(t.pass_user_empty);
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
        title={params.isCreateAccount ? t.opret_bruger : t.log_ind}
        title_style={{...styles.second_title, color: colors.text}}
        arrowTop={'13%'}
      />
      <View style={login_styles.form}>
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
        />
        <View style={{alignItems: 'center', marginTop: 65}}>
          <Button
            text={params.isCreateAccount ? t.fortsæt : t.log_ind}
            theme={colors}
            onPress={submit}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
