
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

const sandbox = "sandbox7d81553460c24cd88ab838aebd2ec3f6.mailgun.org";

const defaultOptions = {
    to: ["lkesselheim@gmail.com"],
	subject: "Hello",
	html: "<h1>Testing some Mailgun awesomeness!</h1>"
}

let mg;

export const sendMail = async ({to, subject, html} = defaultOptions) => {
    
    if(!mg){
        mg = mailgun.client({
        username: "api",
        key: 
            process.env.MAILGUN_API_KEY || 
            "577ee04b1568472d4ffae3ff71b357f8-4e034d9e-03566aa7",
        });  
    }
    
    return mg.messages.create(sandbox, {
        from: `Excited User <mailgun@${sandbox}`,
        to: to,
        subject: subject,
        html: html,
    })
};

