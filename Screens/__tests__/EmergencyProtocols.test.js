import EmergencyProtocols from "../EmergencyProtocols";

test("renders correctly", () => {
    const tree = renderer.create(<EmergencyProtocols />).toJSON();
    expect(tree).toMatchSnapshot();
    });