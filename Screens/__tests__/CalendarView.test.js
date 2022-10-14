import {render, fireEvent} from '@testing-library/react-native';

import React from 'react';
import {CalendarView} from '../CalendarView';

describe('CalendarView', () => {
    it('renders correctly', () => {
        const tree = render(<CalendarView />);
        expect(tree).toMatchSnapshot();
    });
});