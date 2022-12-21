import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Wave from '../../assets/Wave';
import {useTheme} from '@react-navigation/native';
import {Button} from '../../components';
const styles = require('../../styles');
import login_styles from './styles.scss';
import Input from '../../components/input';
import Header from '../../components/header';

const Login = props => {
  const {colors} = useTheme();
  const {
    route: {params},
    navigation,
  } = props;

  const goTo = () => {
    if (params.isCreateAccount) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Dashboard');
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
        />
        <Input
          label={'Adgangskode'}
          label_styles={login_styles.label}
          theme={colors}
          secureTextEntry={true}
        />
        <View style={{alignItems: 'center', marginTop: 65}}>
          <Button
            text={params.isCreateAccount ? 'Fortsæt' : 'Log ind'}
            theme={colors}
            onPress={goTo}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
