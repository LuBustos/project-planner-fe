import {Text} from 'react-native';
import Wave from '../../assets/Wave';

const Header = ({title, title_style, header_style}) => {
  return (
    <>
      <Wave style={header_style} />
      <Text style={title_style}>{title}</Text>
    </>
  );
};

export default Header;
