//Si aparece el test siendo usuario "GUEST"
import {render} from '@testing-library/react-native';
import GuestModal from '../guest';

// const route = {
//   params: {
//     userId: 1,
//   },
// };

// const props = {
//   route,
// };

const theme = {
    
}

const onClose = jest.fn()
const visible = true


test('render GuestModal without errors', () => {
  wrapper = render(<GuestModal onClose={onClose} visible={visible} theme={theme} />);

  expect(wrapper).toBeDefined();
});
