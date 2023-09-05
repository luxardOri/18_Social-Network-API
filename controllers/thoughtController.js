const { Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  async createThought(req, res) {
    console.log("create thought");
    try {
      const newThought = await Thought.create(req.body);
      if (newThought) {
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { thoughts: newThought._id } },
          { new: true }
        );
      }
      res.json("Thought Created");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a course
  deleteThought(req, res) {
    Course.findOneAndDelete({ _id: req.params.courseId })
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No course with that ID" })
          : Student.deleteMany({ _id: { $in: course.students } })
      )
      .then(() => res.json({ message: "Course and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateThought(req, res) {
    Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No course with this id!" })
          : res.json(course)
      )
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
