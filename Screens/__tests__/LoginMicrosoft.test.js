import { restart } from "nodemon";
import { setUserVariables, retrieveUser } from "../LoginMicrosoft";
import "../global";
authUserID = "1";
authName = "John";
authLastName = "Green";


authEmail = "john_green_test@outlook.com";
function check()
{
    //call function to retrieve user
    retrieveUser();
    //ensure that global variables are set
    expect(authUserID).toBe("1");
    expect(authName).toBe("John");
    expect(authLastName).toBe("Green"); 
}

test("check", check); //test to check if the user is retrieved correctly

describe("LoginMicrosoft", () => { //describe the test 
    it("checks database for existeing email", () => { //it checks the database for existing email
        check(); //call the check function
    }); 

});





