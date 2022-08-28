const { User } = require("../models");

class SessionController {
  async signup(req, res) {
    // const { email, password } = req.body;

    // const user = await User.findOne({ where: { email } });

    console.log(req.body);

    res.status(200).json({
      ok: true,
    });

    return;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return res.json({
      user,
      token: user.generateToken(),
    });
  }
}

module.exports = new SessionController();
