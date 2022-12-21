import {View, Text, TouchableOpacity} from 'react-native';
import Wave from '../../assets/Wave';
import SocialMedia from '../../assets/Social Media';
import styles from '../../styles.js';
import {useTheme} from '@react-navigation/native';
import {Button} from '../../components/index'


const Home = props => {
  const {navigation} = props;
  console.log(props);

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
          left: -70,
          top: -10,
        }}
      />
      <Text style={{...styles.subtitle, color: colors.text}}>Littlegiants</Text>
      <Text style={{...styles.title, color: colors.text}}>Project planner</Text>
      <SocialMedia
        style={{
          position: 'absolute',
          left: 50,
          top: 200,
        }}
      />
      <View style={styles.form}>
        <Button onPress={() => goToLogin(true)} text={'Opret bruger'} theme={colors} />
        <Button onPress={() => goToLogin(false)} text={'Log ind'} theme={colors} />
      </View>
    </View>
  );
};

export default Home;
