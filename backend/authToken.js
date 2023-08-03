import jwt from "jsonwebtoken";


//userEmailObj = {email: ""}
//persist = eingeloggt bleiben
export function generateAccessToken(userEmailObj, persist = false){
    return jwt.sign(userEmailObj, process.env.TOKEN_SECRET, {expiresIn: persist ? "7d" : "4h"
    });
}

// in node bubble: node +  require ("crypto").randomBytes(64).toString("hex") => in console
// generiert TOKEN_SECRET String, den dann in .env packen 
// token in routes.js loggen + POST Anfrage über Thunderclient Login
// ! Einsatz von Cookies - damit nur Backend Token lesen kann
// Cookie wird bei jedem Request vom Browser mitgeschickt - gibt welche die nur Backend (HTTP only) lesen kann und andere für Frontend (lesbar)


// ! Middelware erstellen 
//prüft ob im Cookie valider Token ist wenn ja next wenn nicht error
export function authentificateToken (req, res, next){
    let token = null;
    if(req?.cookies?.auth){
        token = req.cookies.auth
        // ist cookie (req.cookies.auth) vorhanden? -> wenn ja ist das unser JWT Token
    }
    if(!token){
        const authHeader = req.headers["authorization"];
        token = authHeader && authHeader.split(" ")[1] 
        //wenn Token da gib nur den aus
    }

    if(token === null)return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err, user);
        if(err) return res.sendStatus(403)
        // forbidden -> token war falsch
        req.userEmail = user.email; 
        // jeder req der kommt kann Email abgreifen und damit abgleichen ob Email zu Token passt
        // so wird User in Datenbank gefunden
        next();
        // wenn es passt gehe weiter zur nächsten Middelware
    });
} 