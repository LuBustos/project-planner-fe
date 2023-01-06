import {fireEvent, render} from '@testing-library/react-native';
import Dashboard from '../index';
import * as axios from 'axios';

const mockData = {
  data: [
    {
      id: 1,
      title: 'Test 1',
      description: 'Test description 1',
    },
    {
      id: 2,
      title: 'Test 2',
      description: 'Test description 2',
    },
  ],
  overdueTask: 0,
};

const route = {
  params: {
    userId: 1,
  },
};

const props = {
  route,
};

jest.mock('axios');

const mockOpenCreateOrUpdateTask = jest.fn();
const mockOpenReminderTask = jest.fn();
const mockSaveTask = jest.fn();
const mockOpenModalGuest = jest.fn()

jest.mock('../../../hooks/useDashboard', () => ({
  __esModule: true,
  default: props => ({
    ...props,
    openCreateOrUpdateTask: () => mockOpenCreateOrUpdateTask(),
    handlerOpenReminderModal: () => mockOpenReminderTask(),
    open: {
      open: true,
    },
    openReminderModal: {
      open: true,
    },
    tasks: [],
    saveTasks: () => mockSaveTask(),
    handlerFilters: jest.fn(),
    openModalGuest: () => mockOpenModalGuest()
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('render Dashboard without errors', () => {
  wrapper = render(<Dashboard {...props} />);

  expect(wrapper).toBeDefined();
});

test('addIcon should be defined & you should press it', () => {
  wrapper = render(<Dashboard {...props} />);
  const addIcon = wrapper.getByTestId('add_icon_test');

  expect(addIcon).toBeDefined();

  fireEvent.press(addIcon);

  expect(mockOpenCreateOrUpdateTask).toHaveBeenCalledTimes(1);
});

test('Get all task should receive a good response ', async () => {
  await axios.post.mockResolvedValueOnce({status: 200, data: mockData});

  wrapper = render(<Dashboard {...props} />);

  expect(axios.post).toHaveBeenCalledTimes(1);
});

test('Should open modal as user guest', async () => {
  const route = {
    params: {
      userId: null,
    },
  };

  const props_no_user = {
    route,
  };

  wrapper = render(<Dashboard {...props_no_user} />);

  expect(wrapper).toBeDefined();
  expect(mockOpenModalGuest).toHaveBeenCalledTimes(1);
});
