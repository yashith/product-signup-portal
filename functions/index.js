const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send
*/
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

exports.autoSendEmail = functions.firestore
    .document("/Signup details/{userId}")
    .onCreate((snap, context) => {
      const user = snap.data();
      const mailOptions = {
        from: "Yashith <yashith98@gmail.com>",
        to: user.email,
        subject: "You have successfully registered to Something",
        html: `<h1>Hi ${user.firstname}</h1>
                  <br />
              `, // email content in HTML
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          functions.logger.error(err);
        } else if (info) {
          functions.logger.log(info);
        }
      });
    });
