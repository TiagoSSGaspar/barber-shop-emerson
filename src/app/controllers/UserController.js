import * as Yup from "yup";

import User from "../models/User";

class UserController {

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(7)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const userEmailExist = await User.findOne({ where: { email: req.body.email } });
    if (userEmailExist) {
      return res.status(400).json({ error: "Usuario Já existe" });
    }
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(7),
      password: Yup.string().min(7).when("oldPassword", (oldPassword, field) => oldPassword ? field.required() : field),
      confirmPassword: Yup.string().when("password", (password, field) => password ? field.required().oneOf([Yup.ref("password")]) : field)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userEmailExist = await User.findOne({ where: { email } });

      if (userEmailExist) {
        return res.status(400).json({ error: "User already exists" });
      }

    }

    if (oldPassword && !(await user.cheackPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not macth" });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new UserController();
