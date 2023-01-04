import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import SocialMedia from '../../assets/Social Media';
import Wave from '../../assets/Wave';
import { Button } from '../../components/index';
import t from '../../localization/index';
import styles from '../../styles.js';
import { textStyle } from '../../mixin';

'use strict';

const homeStyles = StyleSheet.create({
  mainTitle: {
    position: 'absolute',
    left: '10%',
    top: '13.86%',
    ...textStyle('600', 18, 27),
    alignSelf: 'center'
  },
});



const Home = props => {
  const {navigation} = props;

  const goToLogin = (isCreateAccount) => {
    navigation.navigate('Login',{
      isCreateAccount: isCreateAccount
    });
  };

  const {colors} = useTheme();

  return (
    <View>
      <Wave
        style={{
          left: -75,
          top: -10,
        }}
      />
      <Text style={{...homeStyles.mainTitle, color: colors.text}}>Littlegiants</Text>
      <Text style={{...styles.title, color: colors.text}}>Project planner</Text>
      <SocialMedia
        style={{
          position: 'absolute',
          left: 50,
          top: 200,
        }}
      />
      <View style={styles.form}>
        <Button onPress={() => goToLogin(true)} text={t.opret_bruger} theme={colors} />
        <Button onPress={() => goToLogin(false)} text={t.log_ind} theme={colors} />
      </View>
    </View>
  );
};

export default Home;
