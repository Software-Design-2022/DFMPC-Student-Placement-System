import {eventsData} from '../EventsCalendar';
import {db} from '../../firebase';
const add = require('./EventsCalendar.js');


jest.mock('./EventsCalendar.js', () => {
  return {
    add: jest.fn()
  };
});

//Set Test Data
const data = {
    name: "Test Event",
      start_date: "2022-10-14",
      end_date: "2022-10-15",
      id: Math.max(50, Math.floor(Math.random() * 150)),
      programme: "TestProgramme",
}

//function to check that data is added to firestore database
async function check () {
    await add.sendToFirestore(data);
    const q = query(collection(db, "notifications").where("name", "==", data.name)); //retrieve data where name matches test data
    const events = await getDocs(q);
    events.forEach((doc) => {
        expect(doc.data().name).toBe("Test event");
        expect(doc.data().start_date).toBe("2022-10-14");
        expect(doc.data().end_date).toBe("2022-10-15");
        expect(doc.data().programme).toBe("TestProgramme");
    });
}


describe('EventsCalendar', () => {
  it('correctly sends events to calendar', () => {
      check();
  });
});