import User from "./UserModel.js"
import {Schema, model} from mongoose;
import crypto from "crypto";
import { passwordResetMailTemplate } from "../lib/mailTemplates.js";

const restTokenSchema = new Schema ({
    userId: {
        type: Schema.types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 7200,
        // in sek 2h
    }
});
export const ResetToken = model("ResetToken", restTokenSchema);


export const createResetToken = async (userEmail) => {
    const user = await User.findOne({email: userEmail});
    if (!user){
        throw new Error("No User with this email")
    }
    //wenn wir einen Token vom user finden löschen wir diesen
    let token = await ResetToken.findOne({userId: user.id});
    if (token) await token.deleteOne();

    const resetToken = crypto.randomBytes(64).toString("hex");
    ResetToken.create({
        userId: user.id,
        token: resetToken,
        // optional dank default value
        createdAt: Date.now()
    })


    // ToDo: send Mail -> Mail Template nötig + Link erstellen

    // Link with Secret - URL von unserer Render App (local via .env setzen)
    const clientURL = process.env.RENDER_EXTERNAL_URL;
    const resetURL = new URL (
        `/passwordReset?token=${resetToken}&id=${user.id}`, clientURL
        );
    
    // create Email Template
    const mailHTML = passwordResetMailTemplate({
        name: user.name,
        resetLink: resetURL
    });

    // send Mail
    await sendMail({
        to:[user.email],
        subject: `${process.env.APP_NAME} Password Reset!`,
        html: mailHTML,
    });
}