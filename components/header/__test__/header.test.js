import {render} from '@testing-library/react-native';
import Header from '../index';

const theme = {};

const handlerFilters = jest.fn();
const userId = 1;

test('render Header without errors', () => {
  wrapper = render(
    <Header
      theme={theme}
      handlerFilters={handlerFilters}
      userId={userId}
      title={'Test'}
      header_style={{}}
      title_style={{}}
      height={''}
      profilePhoto={''}
    />,
  );

  expect(wrapper).toBeDefined();
});
