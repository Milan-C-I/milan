const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "milannodemailer@gmail.com",
    pass: "mlnq xgii yoyk ctyq",
  },
});