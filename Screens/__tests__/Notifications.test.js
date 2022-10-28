import Notifications from '../Notifications';

describe('Notifications', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper).toMatchSnapshot();
    });
});