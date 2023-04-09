const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express()
const port = 8000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});



app.post('/api/form', (req, res) => {
  let data =req.body;
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'admin@sweeze.in',
        pass: 'halwaparatha'
      }
    });

    let mailOptions = {
      from: data.email,
      to: 'admin@sweeze.in',
      subject: 'New form submission',
      text: 'Form data: ' + JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
