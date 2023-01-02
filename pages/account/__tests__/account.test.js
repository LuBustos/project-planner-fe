import {fireEvent, render} from '@testing-library/react-native';
import Account from '../index';

const route = {
  params: {
    userId: 1,
  },
};

const props = {
  route,
};

const mockErrorMessage = jest.fn();

jest.mock('../../../utils/snackbar', () => ({
  errorMessage:() => mockErrorMessage()
}));

test('render Account without errors', () => {
  wrapper = render(<Account {...props} />);
  expect(wrapper).toBeDefined();
});

//validation true
test('validation method should return true', () => {
  wrapper = render(<Account {...props} />);
  const usernameField = wrapper.getByTestId('username_test');
  const passwordField = wrapper.getByTestId('password_test');
  const buttonField = wrapper.getByTestId('submit_test');

  fireEvent.changeText(usernameField, 'test');
  expect(usernameField.props.value).toBe('test');

  fireEvent.changeText(passwordField, '1234');
  expect(passwordField.props.value).toBe('1234');

  fireEvent.press(buttonField);

  expect(mockErrorMessage).toHaveBeenCalledTimes(0);
});

//validation false
test('validation method should return false', () => {
  wrapper = render(<Account {...props} />);
  const usernameField = wrapper.getByTestId('username_test');
  const passwordField = wrapper.getByTestId('password_test');
  const buttonField = wrapper.getByTestId('submit_test');

  fireEvent.changeText(usernameField, '');
  expect(usernameField.props.value).toBe('');

  fireEvent.changeText(passwordField, '_');
  expect(passwordField.props.value).toBe('_');

  fireEvent.press(buttonField);

  expect(mockErrorMessage).toHaveBeenCalledTimes(1);
});
