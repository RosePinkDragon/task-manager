const mocks = {
  User: () => ({
    id: () => casual.integer(0, 120),
    email: casual.email,
    name: casual.name,
  }),
};

module.exports = mocks;
