import EventsCalendar from '../EventsCalendar';

describe('EventsCalendar', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<EventsCalendar />);
        expect(wrapper).toMatchSnapshot();
    });
});