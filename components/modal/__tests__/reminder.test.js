import {render} from '@testing-library/react-native';
import ReminderModal from '../reminder';

const theme = {
    
}

const onClose = jest.fn()
const visible = true

test('render ReminderModal without errors', () => {
  wrapper = render(<ReminderModal onClose={onClose} visible={visible} theme={theme} />);

  expect(wrapper).toBeDefined();
});
