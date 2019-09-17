var http = require('http');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var creds = require('./credentials');
var formater = require('./orderFormater');

const jsonParser = bodyParser.json();
const transporter = nodemailer.createTransport({
  service: creds.mailService,
  auth: {
    user: creds.serviceEmail,
    pass: creds.servicePassword
  }
});

const requestHandler = (req, res) => {
  if(req.method === 'POST') {
    jsonParser(req, res, (error) => {
      const formattedOrder = formater.formatOrder(req.body);
      const mailOptions = {
        from: creds.serviceEmail,
        to: creds.serviceTargetEmail,
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
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(8080, (err) => {
  if (err) {
    return console.log("An error occured:\n", err);
  }
});
