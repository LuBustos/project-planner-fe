import {StyleSheet, Text, View} from 'react-native';
import Wave from '../../assets/Wave';
import Filter from '../filter';
import Profile from '../profile';
import {useNavigation, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {textStyle} from '../../mixin';

const styles = StyleSheet.create({
  title: {
    ...textStyle('800', 36, 54),
    letterSpacing: 4,
    alignSelf: 'center',
  },
  test: {
    // position: 'absolute',
    // top: '17.39%',
  },
});

const Header = ({
  title,
  title_style,
  header_style,
  theme,
  isFilter = false,
  isProfile = false,
}) => {
  const {navigate} = useNavigation();
  const {colors} = useTheme();

  const goToProfile = () => {
    navigate('Profile');
  };

  return (
    <>
      <Wave style={header_style} />
      {/* <View
        style={{
          display: 'flex',
          // justifyContent: ''
          position: 'relative',
          flexDirection: 'row',
          ...title_style,
        }}>
        <View style={{marginLeft: 'auto'}}>
          <Icon name={'long-arrow-left'} size={30} />
        </View>
        <View style={{marginLeft: 'auto'}}>
        </View>
      </View> */}
      <Text style={{...title_style, color: colors.text}}>{title}</Text>
      {isProfile ? <Profile onPress={goToProfile} /> : null}
      {isFilter ? <Filter theme={theme} /> : null}
    </>
  );
};

export default Header;
