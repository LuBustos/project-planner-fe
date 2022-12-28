import {Text, View} from 'react-native';
import Wave from '../../assets/Wave';
import Filter from '../filter';
import Profile from '../profile';
import {useNavigation, useTheme} from '@react-navigation/native';

const Header = ({
  title,
  title_style,
  header_style,
  theme,
  height,
  userId,
  profilePhoto,
  isFilter = false,
  isProfile = false,
  handlerFilters,
}) => {
  const {navigate} = useNavigation();
  const {colors} = useTheme();

  const goToProfile = () => {
    navigate('Profile', {
      userId: userId,
    });
  };

  return (
    <>
      <View
        style={{
          height: height,
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
              <Profile onPress={goToProfile} profilePhoto={profilePhoto}/>
            </View>
          ) : null}
          {isFilter ? (
            <View
              style={{
                position: 'absolute',
                top: '20%',
                alignSelf: 'center',
              }}>
              <Filter theme={theme} handlerFilters={handlerFilters} />
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
