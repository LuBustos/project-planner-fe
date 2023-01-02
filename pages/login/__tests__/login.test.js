import {render} from '@testing-library/react-native';
import Login from '../index';

const route = {
  params: {
    userId: 1,
  },
};

const props = {
  route,
};

test('render Login without errors', () => {
  wrapper = render(<Login {...props} />);

  expect(wrapper).toBeDefined();
});
