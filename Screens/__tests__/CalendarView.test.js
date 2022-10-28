import CalendarView from '../CalendarView';
import { render, fireEvent } from '@testing-library/react-native';
describe('CalendarView', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<CalendarView />);
        expect(wrapper).toMatchSnapshot();
    });
});