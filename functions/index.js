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
    user: "yashith98@gmail.com",
    pass: "ldpcwhxborsqouyd",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;
    const name = req.query.name;
    const product = req.query.prod;

    const mailOptions = {
      from: "Yashith <yashith98@gmail.com>",
      to: dest,
      subject: "You have successfully registered to " + product,
      html: "<h1>Hi " + name + `</h1>
                <br />
            `, // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});
