import {render, screen, fireEvent} from '@testing-library/react-native';
import Dashboard from '../index';
import { View } from 'react-native';

const route = {
    params: {
        userId: 1
    }
}

const props = {
    route,
}

test('render Dashboard without errors', () => {
  wrapper = render(<Dashboard {...props}/>);

  expect(wrapper).toBeDefined();
});

//Click in the box
//Complete a task?
//Click in the add butto
//Check if the modal open
//try to scroll?