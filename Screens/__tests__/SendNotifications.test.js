import {EventNotification} from '../SendNotifications';
import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

describe('EventNotification', () => {
  it('renders correctly', () => {
    const tree = render(<EventNotification />);
    expect(tree).toMatchSnapshot();
  });
});