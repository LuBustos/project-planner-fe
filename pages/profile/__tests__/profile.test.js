import {render} from '@testing-library/react-native';
import Profile from '../index';

const route = {
  params: {
    userId: 1,
  },
};

const props = {
  route,
};

test('render Profile without errors', () => {
  wrapper = render(<Profile {...props} />);

  expect(wrapper).toBeDefined();
});
