
import User from "./models/UserModel.js";
import { Router } from "express";
import { authentificateToken, generateAccessToken } from "./authToken.js";
import multer from "multer";


export const userRouter = Router();

// ============ für Cookie Haltbarkeit =====
const hoursInMillisek = (hours) => { return 1000 *  60 * 60 * hours;
};

const multerMiddleware = multer();


// ! User ausgeben
userRouter.get("/user/aut", async (req, res) => {
  const users = await User.find();
  res.send(users);
});


// ! SignUp / Create Profile
// # hat er etwas anders !
userRouter.post("/user/signup", multerMiddleware.none(), async (req, res) => {
  const { name, email, password } = req.body;
  let user = new User({ name, email });
  user.setPassword(password);
  console.log(password);

  try {
    user = await user.save();
    return res.send({ message: "New user created", data: user });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).send({error: "An unkonown error ocurred"});
});
// # Duplication error fehlt hier


// ! Login
userRouter.post("/user/login", multerMiddleware.none(), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+hash").select("+salt");

  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {

    //===========TOKEN ==============
    const token = generateAccessToken({ email })
    console.log(token);
    res.cookie("auth", token, {httpOnly: true, maxAge: hoursInMillisek(4)})
    // Gültigkeit in millisek (4h) -> Cookie solltekürzer als Token haltbar sein
    // mit httpOnly nicht für JS lesbar

    //next step Cookie Parser middelware in auth datei -> da Validierung über Cookie stattfindet

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
userRouter.get("/secure/cookieTest", authentificateToken, async (req, res) => {
  console.log(req.userEmail);
  res.send("SUCCESS SECURE PATH")
})
 



/* 
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
}); */



//# mail

userRouter.post("/resetPassword", async (req,res) =>{
  const {email} = req.body;
  try {
    await createResetToken(email)
    return res.sendStatus(200)
  } catch (error) {
    if(error?.message === "No User with this email"){
      return res.status(404).send({error: "User not found"})
    }
    return res.status(500).send({error: "Unknown Error occurred"});
  }
  
});

// zum testen neuen user erstellen mit eigener Email(von mailGun anmeldung) den user dann in db posten

// email adresse auf mailgun verifizieren - sending - domain - rechts author.Recip. - input feld- trash mail eingeben - save 
// trashmail öffnen und so lange öffnen bis verif.mail ankommt
// mail öffnen - verifizieren
// bei mailgun warten bis verif.
// wieder in trahmail - 2. mail verif.
// nun bei mailgun verif.
// thunderclient: new POST req - http://localhost:3000/api/user/resetPassword
// JSON { "email": "eigene Email", name: "Lisa", passwort:""}
// bei mailgun im reporting checken ob mail raus ist
// wieder bei trashmail schauen ob angekommen