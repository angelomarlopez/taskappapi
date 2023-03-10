import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Email is sent to recently created user with welcome message
 *
 * @param {*} email
 * @param {*} name
 */
export const send_welcome_email = (email, name) => {
  sgMail
    .send({
      to: email,
      from: process.env.EMAIL,
      subject: "Thanks for joining!",
      text: `Welcome to this Task App, ${name}. Hope you enjoy keeping track of your daily tasks.`,
    })
    .then(() => {
      console.log("Email sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Email is sent to recently deleted user with a goodbye message
 *
 * @param {*} email
 * @param {*} name
 */
export const send_cancelation_email = (email, name) => {
  sgMail
    .send({
      to: email,
      from: process.env.EMAIL,
      subject: "Sorry to see you go!",
      text: `Goodbye ${name}! I hope to see you back sometime soon. Is there anything we could have different?`,
    })
    .then(() => {
      console.log("Email sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};
