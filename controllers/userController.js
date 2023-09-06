const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");
const { create } = require("../models/User");

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user by id
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Add an friend to a user
  addFriend(req, res) {
    console.log("You are adding a friend");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a user
  removeFriend(req, res) {
    console.log("You are removing a friend");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
