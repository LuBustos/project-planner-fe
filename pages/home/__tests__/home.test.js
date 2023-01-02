import {render} from '@testing-library/react-native';
import Home from '../index';

let wrapper;

test('render home without errors', () => {
  wrapper = render(<Home />);
  expect(wrapper).toBeDefined();
});
