
import User from "./models/UserModel.js";
import { Router } from "express";


export const userRouter = Router();

// ! User ausgeben
userRouter.get("/user/aut", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// ! SignUp
userRouter.post("/user/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let user = new User({ name, email });
  user.setPassword(password);
  console.log(password);
  user = await user.save();

  res.send({ message: "New user created", data: user });
});

// ! Login
userRouter.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+hash").select("+salt");

  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    res.send({ message: "Success", data: user });
  } else {
    res.status(404).send({
      message: "Failed login",
      error: { message: "Password and Email combination is wrong" },
    });
  }
});

userRouter.get("/secure", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+hash").select("+salt");
  // um User zu finden und hash u salt zu selektieren
  // diese PW erstellt gleichen Hash wie in der datenbank
  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    res.send({ message: "Success PW", data: user, authenticated: true });
  } else {
    res.status(404).send({
      message: "Login failed",
      error: {
        message: "PW Email Combi falsch",
      },
    });
  }
});