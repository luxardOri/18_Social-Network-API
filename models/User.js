const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  thoughts: [thoughtSchema],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = model("user", userSchema);

module.exports = User;
