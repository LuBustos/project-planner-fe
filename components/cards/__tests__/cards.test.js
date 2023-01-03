import {fireEvent, render} from '@testing-library/react-native';
import Cards from '../index';

const mockOnCompleteTask = jest.fn();
const text = 'Title box';
const mockOnPressCard = jest.fn();
const mockOnReminder = jest.fn()

test('render FormModal without errors', () => {
  wrapper = render(
    <Cards onPress={mockOnPressCard} onCompleteTask={mockOnCompleteTask}>
      {text}
    </Cards>,
  );

  expect(wrapper).toBeDefined();
});

test('card should be pressed', () => {
  wrapper = render(
    <Cards onPress={mockOnPressCard} onCompleteTask={mockOnCompleteTask} />,
  );
  const card = wrapper.getByTestId('card_test');

  fireEvent.press(card);

  expect(mockOnPressCard).toHaveBeenCalledTimes(1);
});

//complete method called
test('complete method should be called', () => {
    wrapper = render(
      <Cards onPress={mockOnPressCard} onCompleteTask={mockOnCompleteTask} />,
    );
    const completeIcon = wrapper.getByTestId('complete_test');
  
    fireEvent.press(completeIcon);
  
    expect(mockOnCompleteTask).toHaveBeenCalledTimes(1);
});

test('reminder method should be called', () => {
  wrapper = render(
    <Cards onPress={mockOnPressCard} onCompleteTask={mockOnCompleteTask} onReminderTask={mockOnReminder}/>,
  );
  const clockIcon = wrapper.getByTestId('reminder_test');

  fireEvent.press(clockIcon);

  expect(mockOnReminder).toHaveBeenCalledTimes(1);
});
