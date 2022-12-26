import {StyleSheet, Text, View} from 'react-native';
import Wave from '../../assets/Wave';
import Filter from '../filter';
import Profile from '../profile';
import {useNavigation, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {textStyle} from '../../mixin';
import styles_2 from './style.scss';

const Header = ({
  title,
  title_style,
  header_style,
  theme,
  height,
  userId,
  isFilter = false,
  isProfile = false,
}) => {
  const {navigate} = useNavigation();
  const {colors} = useTheme();

  const goToProfile = () => {
    navigate('Profile',{
      userId: userId
    });
  };

  return (
    <>
      <View
        style={{
          height: height,
          // display: 'flex',
          // flexDirection: 'column',
          // flex: 1,
        }}>
        <Wave style={header_style}>
          {isProfile ? (
            <View
              style={{
                position: 'absolute',
                top: '8%',
                right: '7%',
                alignSelf: 'flex-end',
              }}>
              <Profile onPress={goToProfile} />
            </View>
          ) : null}
          {isFilter ? (
            <View
              style={{
                position: 'absolute',
                top: '20%',
                alignSelf: 'center',
              }}>
              <Filter theme={theme} />
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
