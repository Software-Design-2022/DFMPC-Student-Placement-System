import {sendToFirestore, schedulePushNotification} from "../functions.js";
import {firebase} from "../../firebase";

const text = "test";
const msg = "test";

function check()
{
    var exists = false;
    sendToFirestore(text, msg);
    firebase
    .firestore()
    .collection("panic_button")
    .where(query === text)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            exists = true;
        });
        }
    );

    expect(exists).toBe(true);

}
test("sendToFirestore", () => {
    check();
    });