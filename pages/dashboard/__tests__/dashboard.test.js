import { fireEvent, render } from '@testing-library/react-native';
import Dashboard from '../index';

const route = {
  params: {
    userId: 1,
  },
};

const props = {
  route,
};

const mockOpenCreateOrUpdateTask = jest.fn();

jest.mock('../../../hooks/useDashboard', () => ({
  __esModule: true,
  default: props => ({
    ...props,
    openCreateOrUpdateTask: () => mockOpenCreateOrUpdateTask(),
    open: {
      open: true,
    },
    tasks: [],
    handlerFilters: jest.fn(),
  }),
}));

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
