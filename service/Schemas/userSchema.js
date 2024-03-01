const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
});

const User = model("user", userSchema);

const requiredUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Missing required 'email' - field",
  }),

  password: Joi.string().min(6).required().messages({
    "any.required": "Missing required 'password' - field",
  }),
});

module.exports = { User, requiredUserSchema };
