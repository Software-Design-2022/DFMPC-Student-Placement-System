import {getSchedules } from "../RetrieveSchedules";

authUserID = "2"; //Set authUserID to existing user ID
var schedules = {
    student_id: "2",
}
function check()
{
    //call function to user specific schedule information
    
    expect(schedules.student_id).toBe("2"); //check that retrieved student ID matches preset authUserID
   
}


describe("RetrieveSchedules", () => {

    it("checks database for schedules associated with specific student ID", () => {
        check();
    });

  });