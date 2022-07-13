const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
admin.initializeApp();

/**
* Here we're using Gmail to send
*/
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", // add email
    pass: "", // add pass
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
const spreadsheetId = "1w6ledz_-765y2q3uFOEmKaZslgmoxJxu8t0TQgSib5s";
exports.populateSheet = functions.firestore
    .document("/Signup details/{userId}")
    .onCreate((snap, context) => {
      const list=[];
      const user = snap.data();
      if (user) {
        for (const item in user) {
          if (typeof item !== "undefined") {
            list.push(user[item]);
          }
        }
      }
      google.auth.getClient({
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      }).then((auth) => {
        console.info("This auth obj"+JSON.stringify(auth));
        const sheet = google.sheets({version: "v4", auth});
        sheet.spreadsheets.values.append({
          auth, // auth object
          spreadsheetId, // spreadsheet id
          range: "Sheet1!A:B", // sheet name and range of cells
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [list],
          },
        },
        (err, response) => {
          if (err) {
            functions.logger.error(err);
          }
        }
        );
      })
          .catch((err) => {
            functions.logger.error(err);
          });
    });
