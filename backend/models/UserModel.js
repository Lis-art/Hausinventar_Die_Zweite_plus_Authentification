import mongoose from "mongoose";
//import {Schema, model} from "mongoose"; -< UNTEN DANN NUR NEW SCHEMA
import crypto from "crypto";
import { Schema, model } from "mongoose";

const isEmail = (string) => {
    const [name, domainWithTLD, ...rest] = string.split("@");
    if (rest.length || !name || !domainWithTLD) {
      return false;
    }
  
    const [domain, tld] = domainWithTLD.split(".");
    if (tld.length < 2 || !domain) return false;
  
    return true;
  };
  
  export const userSchema = new Schema({
    name: { type: String, required: [true, "Please specify your name"] },
    email: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      validate: {
        validator: isEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    salt: { type: String, required: true, select: false },
    hash: { type: String, required: true, select: false },
  });
  


userSchema.methods.setPassword = function (password){
    //salt - für jeden User eigenen erstellen
    this.salt = crypto.randomBytes(64).toString("hex")
    //password mit salt hashen
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    //muss beides im schema gespeichert werden
}





userSchema.methods.verifyPassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

    return this.hash === hash
    //hashes werden verglichen
    //bei nicht Übereinstimmung kommt false
}

export const User = mongoose.model("User", userSchema);
export default User;