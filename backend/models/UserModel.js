import mongoose from "mongoose";
//import {Schema, model} from "mongoose"; -< UNTEN DANN NUR NEW SCHEMA
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      lowercase: true 
    },
    salt:{type: String, required:true, select: false},
    hash:{type: String, required:true, select: false},


    name: String,
    description: String,
    image: {
        type: {
            url: String,
            imageId: String
        }
    },
   // inventory: [{type: mongoose.Types.ObjectId, ref: "Inventory"}]
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