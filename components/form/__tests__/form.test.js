import {render} from '@testing-library/react-native';
import FormModal from '../index';
import * as axios from 'axios';
import {act} from 'react-test-renderer';

jest.mock('axios');

const mock_initial_form = {
  title: '',
  description: '',
  to: [],
  tags: '',
  dueDate: null,
};

const theme = {};

const onClose = jest.fn();
const refreshScreen = jest.fn();
const userId = 1;
const taskId = 1;

const mockUserData = {
  data: [
    {
      id: 1,
      username: 'user 1',
      avatar: undefined,
    },
    {
      id: 2,
      username: 'user 2',
      avatar: './Test',
    },
  ],
  success: true,
};

const mockTaskData = {
  data: [
    {
      id: 1,
      username: 'task 1',
      description: 'description task',
    },
  ],
  success: true,
};

const mockSaveAllFields = jest.fn();
const mockOnChangeFields = jest.fn();

jest.mock('../../../hooks/useFields.js', () => ({
  __esModule: true,
  default: props => ({
    ...props,
    fields: mock_initial_form,
    onChangeFields: jest.fn(),
    saveAllFields: () => mockSaveAllFields(),
    cleanFields: jest.fn(),
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('Should render FormModal without errors', () => {
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

test('Should get users withour error', async () => {
  await act(async () => {
    await axios.get.mockResolvedValueOnce({status: 200, data: mockUserData});
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
  });

  expect(wrapper).toBeDefined();
});

test('Should get task by id and save the data withour errors', async () => {
  await act(async () => {
    await axios.get.mockResolvedValueOnce({status: 200, data: mockTaskData});
    await axios.get.mockResolvedValueOnce({status: 200, data: mockTaskData});

    wrapper = render(
      <FormModal
        onClose={onClose}
        owner={userId}
        refreshScreen={refreshScreen}
        task_id={taskId}
        theme={theme}
        update={true}
        visible={true}
      />,
    );
  });

  expect(wrapper).toBeDefined();
  expect(mockSaveAllFields).toHaveBeenCalledTimes(1);
});
