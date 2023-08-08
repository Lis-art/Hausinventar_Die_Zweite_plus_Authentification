
import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Configure Mailgun Client
const mailgun = new Mailgun(formData);

// Our sandbox domain form mailgun
const sandbox = "sandbox7d81553460c24cd88ab838aebd2ec3f6.mailgun.org";

// When send mail gets no parameter use this default setup
const defaultOptions = {
    to: ["lkesselheim@gmail.com"],
	subject: "Hello",
	html: "<h1>Testing some Mailgun awesomeness!</h1>"
}

// Mailgun client cache
// on first run we create a mailgun client
// once the client is created we can skip this
// process
let mg;

export const sendMail = async ({to, subject, html} = defaultOptions) => {
    
    if(!mg){
        mg = mailgun.client({
        username: "api",
        key: 
            process.env.MAILGUN_API_KEY 
        });  
    }
    
    return mg.messages.create(sandbox, {
        from: `Excited User <mailgun@${sandbox}`,
        to: to,
        subject: subject,
        html: html,
    })
};

