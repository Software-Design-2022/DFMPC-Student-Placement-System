import EventsCalendar from '../Screens/CalendarView';

import { render, fireEvent, waitFor } from '@testing-library/react-native';

renderer.render(<EventsCalendar />);
const rendered = renderer.getRenderOutput();

it('renders correctly', () => {
  expect(rendered).toMatchSnapshot();
});