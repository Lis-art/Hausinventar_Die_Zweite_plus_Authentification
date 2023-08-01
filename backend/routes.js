
import User from "./models/UserModel.js";
import { Router } from "express";
//import { generateAccessToken } from "./authToken.js";


export const userRouter = Router();

/* // ============ für Cookie Haltbarkeit =====
const hoursInMillisek = (hours) => { return 1000 *  60 * 60 * hours;
};
 */

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

/*     //===========TOKEN ==============
    const token = generateAccessToken({ email })
    console.log(token);
    res.cookie("auth", token, {httpOnly: true, maxAge: hoursInMillisek(4)})
    // Gültigkeit in millisek (4h)
    // mit httpOnly nicht für JS lesbar
 */
    //next step middelware in auth datei

    res.send({ message: "Success", data: user });
  } else {
    res.status(404).send({
      message: "Failed login",
      error: { message: "Password and Email combination is wrong" },
    });
  }
});


// ! JSON Web Token
// wie ein schlüssel mit Ablaufdatum, Token wird immer mit 3 Sektionen erstellt. 1. Header = Algorithmus, 2. = Payload = nicht verschlüsselt (Bernd), 3. Verifizierungssignatur = wie werden Daten verschlüsselt, mit Secret (wie Fingerabdruck)
// npm jasonwebtoken



// ! Cookie (parser) Test
/* userRouter.get("/secure/cookieTest", authenticateToken, async (req, res) => {

})
 */

// # Clerk.com / firebase.com / superbase.com /auth0.com -> erstellen einem den ganzen Auth./Login Kram






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