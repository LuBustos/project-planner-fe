import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Wave from '../../assets/Wave';
import Filter from '../filter';
import Profile from '../profile';
import {useNavigation, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import t from '../../localization';

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 16,
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    marginTop: 8,
    marginLeft: 10,
  },
});

const Header = ({
  title,
  title_style,
  header_style,
  theme,
  height,
  userId,
  profilePhoto,
  handlerFilters,
  filters,
  isFilter = false,
  isProfile = false,
  isGoBack = false,
  isAccount = false,
  arrowTop = '27%',
}) => {
  const {navigate, goBack} = useNavigation();
  const {colors} = useTheme();

  const goToAccount = () => {
    navigate('Account', {
      userId: userId,
      isCreateAccount: false,
    });
  };

  const goToProfile = () => {
    navigate('Profile', {
      userId: userId,
      isCreateAccount: false,
    });
  };

  return (
    <>
      <View
        style={{
          height: height,
        }}>
        <Wave style={header_style}>
          {isAccount ? (
            <View
              style={{
                position: 'absolute',
                top: '23%',
                alignSelf: 'center',
              }}>
              <Profile profilePhoto={profilePhoto} height={100} width={100} />
              <TouchableOpacity onPress={goToProfile}>
                <Text style={styles.text}>{t.change_profile}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {isProfile ? (
            <View
              style={{
                position: 'absolute',
                top: '8%',
                right: '7%',
                alignSelf: 'flex-end',
              }}>
              <Profile onPress={goToAccount} profilePhoto={profilePhoto} />
            </View>
          ) : null}
          {isFilter ? (
            <View
              style={{
                position: 'absolute',
                top: '20%',
                alignSelf: 'center',
              }}>
              <Filter theme={theme} handlerFilters={handlerFilters} filters={filters}/>
            </View>
          ) : null}
          {isGoBack ? (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'flex-start',
                top: arrowTop,
                marginLeft: 15,
              }}>
              <TouchableOpacity onPress={goBack}>
                <Icon name="long-arrow-left" size={30} color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '17.39%',
            }}>
            <Text style={{...title_style, color: colors.text}}>{title}</Text>
          </View>
        </Wave>
      </View>
    </>
  );
};

export default Header;
