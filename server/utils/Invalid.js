// to check if data is valid

const valid = (taskTitle, createdBy, assignedTo, status) => {
  if (!taskTitle || !createdBy || !assignedTo || !status) {
    return "Enter all feilds";
  }

  if (
    !(status === "Created" || status === "Completed" || status === "Ongoing")
  ) {
    return "Invalid Status";
  }

  return true;
};

module.exports = valid;
