import {render} from '@testing-library/react-native';
import FormModal from '../index';

const theme = {};

const onClose = jest.fn();
const refreshScreen = jest.fn();
const userId = 1;
const taskId = 1;

test('render FormModal without errors', () => {
  wrapper = render(
    <FormModal
        onClose={onClose}
        owner={userId}
        refreshScreen={refreshScreen}
        task_id={taskId}
        theme={theme}
        update={false}
        visible={true}
    />,
  );

  expect(wrapper).toBeDefined();
});
