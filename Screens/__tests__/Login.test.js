import Login from "./Screens/Login";
import {LoginFirebase} from "./functions";
import { render, fireEvent } from "@testing-library/react-native";
import { expect, it } from "@jest/globals";


const email = "johngreen@gmail.com";
const password = "123456";

function check()
{
    LoginFirebase();
    expect(found).toBe(false);
}



describe("Login", () => {
    it("renders correctly", () => {
        const wrapper = render(<Login />);
        expect(wrapper).toMatchSnapshot();
    });
    });

    describe("LoginFirebase", () => {
        check();
    });

