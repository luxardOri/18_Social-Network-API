const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  async createThought(req, res) {
    console.log("create thought");
    try {
      const newThought = await Thought.create(req.body);
      if (newThought) {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._id } },
          { new: true }
        );
      }
      res.json("Thought Created");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const removeThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (removeThought) {
        await User.findOneAndUpdate(
          { username: removeThought.username },
          { $pull: { thoughts: removeThought._id } },
          { new: true }
        );
      }
      res.json("Thought Removed");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createReation(req, res) {
    Course.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteReation(req, res) {
    Course.findOneAndDelete({ _id: req.params.courseId })
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No course with that ID" })
          : Student.deleteMany({ _id: { $in: course.students } })
      )
      .then(() => res.json({ message: "Course and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
