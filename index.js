/* Your Code Here */

function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map((employeeRecord) =>
    createEmployeeRecord(employeeRecord)
  );
}

function createTimeInEvent(dateStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10),
  });

  return this;
}

function createTimeOutEvent(dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10),
  });

  return this;
}

function hoursWorkedOnDate(dateOfForm) {
  const timeInEvent = this.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === dateOfForm
  );

  const timeOutEvent = this.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === dateOfForm
  );

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(dateOfForm) {
  const hoursWorked = hoursWorkedOnDate.call(this, dateOfForm);

  return hoursWorked * this.payPerHour;
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(arrayOfEmployeeRecords, firstName) {
  return arrayOfEmployeeRecords.find(
    (record) => record.firstName === firstName
  );
}

function calculatePayroll(arrayOfEmployeeRecords) {
  // Remember to set 0 as the initial value
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor.call(rec);
  }, 0);
}
