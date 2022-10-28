import getList from "../notificationHelper";

describe("getList", () => {
    var notifications = getList();
    expect(notifications).toBe([]);
});