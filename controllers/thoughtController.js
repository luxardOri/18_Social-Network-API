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
  // Create a reaction
  async createReaction(req, res) {
    try {
      const addReaction = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId,
      });
      if (addReaction) {
        await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { new: true }
        );
      }
      res.json("Reaction Added");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const removeReaction = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId,
      });
      if (removeReaction) {
        await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
        );
      }
      res.json("Reaction Removed");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
