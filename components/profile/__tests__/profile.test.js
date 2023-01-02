import {render} from '@testing-library/react-native';
import ProfileComponent from '../index';

const onPress = jest.fn();
const profilePhoto = ''

test('render ProfileComponent without errors', () => {
  wrapper = render(
    <ProfileComponent
        onPress={onPress}
        profilePhoto={profilePhoto}
    />,
  );

  expect(wrapper).toBeDefined();
});
