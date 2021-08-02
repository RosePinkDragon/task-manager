const valid = (taskTitle, createdBy, assignedTo, status) => {
  if (!taskTitle || !createdBy || !assignedTo || !status) {
    throw Error("Enter all feilds");
  }

  if (
    !(status === "Created" || status === "Completed" || status === "Ongoing")
  ) {
    throw Error("Invalid Status");
  }

  return;
};
module.exports = valid;
