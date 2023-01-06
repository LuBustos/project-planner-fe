import {render} from '@testing-library/react-native';
import GuestModal from '../guest';

const theme = {
    
}

const onClose = jest.fn()
const visible = true

test('render GuestModal without errors', () => {
  wrapper = render(<GuestModal onClose={onClose} visible={visible} theme={theme} />);

  expect(wrapper).toBeDefined();
});
