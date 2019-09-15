var http = require('http');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var formater = require('./orderFormater');

// keep these empty when committing, shouldn't exactly
// be public knowledge
const SERVICE_EMAIL = '';
const SERVICE_PASSWORD = '';
const SERVICE_TARGET_EMAIL = '';
const MAIL_SERVICE = 'gmail';

const jsonParser = bodyParser.json();
const transporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  auth: {
    user: SERVICE_EMAIL,
    pass: SERVICE_PASSWORD
  }
});

const requestHandler = (req, res) => {
  if(req.method === 'POST') {
    jsonParser(req, res, (error) => {
      const formattedOrder = formater.formatOrder(req.body);
      const mailOptions = {
        from: SERVICE_EMAIL,
        to: SERVICE_TARGET_EMAIL,
        subject: `New order from ${req.body.customerName}`,
        text: formattedOrder
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.statusCode = 500;
          res.end();
        } else {
          res.statusCode = 200;
          res.end();
        }
      });
    });
  }
}

const server = http.createServer(requestHandler);

server.listen(8080, (err) => {
  if (err) {
    return console.log("An error occured:\n", err);
  }
});
