const connection = require("../config/connections");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create array to seed the users
  const users = [
    {
      username: "user1",
      email: "test1@test.com",
    },
    {
      username: "user2",
      email: "test2@test.com",
    },
  ];

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  //   await Course.collection.insertOne({
  //     courseName: "UCLA",
  //     inPerson: false,
  //     students: [...students],
  //   });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
