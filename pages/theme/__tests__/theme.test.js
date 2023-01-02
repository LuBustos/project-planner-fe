import {render} from '@testing-library/react-native';
import Theme from '../index';

const route = {
  params: {
    userId: 1,
  },
};

const props = {
  route,
};

test('render Theme without errors', () => {
  wrapper = render(<Theme {...props} />);

  expect(wrapper).toBeDefined();
});
