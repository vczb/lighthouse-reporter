import mongoose from "mongoose";
// TODO: use import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");

const UserModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      unique: true,
    },
    password: String,
  })
);

const User = {
  async delete(id: string) {
    const user = await UserModel.deleteOne({
      id,
    });

    return user.deletedCount > 0;
  },
  async edit(id: string, data: any) {
    const user = await UserModel.updateOne({ _id: id }, data);

    return user.modifiedCount > 0;
  },
  async create(email: string, password: string) {
    const user = new UserModel({
      email: email,
      password: bcrypt.hashSync(password, 8),
    });

    const result = await user.save();

    return result;
  },
  async authenticate(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) return false;

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return false;

    const token: string = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    return {
      email: user.email,
      accessToken: token,
    };
  },
};

export { User };
