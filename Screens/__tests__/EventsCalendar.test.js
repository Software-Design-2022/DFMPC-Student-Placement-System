import EventsCalendar from '../EventsCalendar';

import { render, fireEvent, waitFor } from '@testing-library/react-native';

renderer.render(<EventsCalendar />);
const rendered = renderer.getRenderOutput();

it('renders correctly', () => {
  expect(rendered).toMatchSnapshot();
});