const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post('express.js', (req, res) => {
  const { name, email, reason, options } = req.body;

  // Create a transporter to send emails (configure with your email service)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jamaari@jamaari.com',
      pass: '19392000!'
    }
  });

  const mailOptions = {
    from: 'jamaari@jamaari.com',
    to: 'jamaari@jamaari.com',
    subject: 'New form submission',
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Reason for joining:</strong> ${reason}</p>
           <p><strong>Option selected:</strong> ${options}</p>`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
