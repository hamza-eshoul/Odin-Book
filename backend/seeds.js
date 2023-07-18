const User = require("./models/userModel");
const { faker } = require("@faker-js/faker");

async function createRandomUser() {
  const fakeUser = new User({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  await fakeUser.save();
}

const createMultipleUsers = () => {
  return faker.helpers.multiple(createRandomUser, {
    count: 10,
  });
};

module.exports = createMultipleUsers;
