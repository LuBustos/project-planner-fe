import {Text} from 'react-native';
import Wave from '../../assets/Wave';
import Filter from '../filter';
import Profile from '../profile';

const Header = ({
  title,
  title_style,
  header_style,
  theme,
  isFilter = false,
  isProfile = false,
}) => {
  return (
    <>
      <Wave style={header_style} />
      <Text style={title_style}>{title}</Text>
      {isProfile ? <Profile /> : null}
      {isFilter ? <Filter theme={theme} /> : null}
    </>
  );
};

export default Header;
