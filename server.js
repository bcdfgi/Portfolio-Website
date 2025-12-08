require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT=3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'images')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'pages', 'home_page.html'));
});


app.post('/contact', async (req, res) => {
  const { name, email, message} = req.body;
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_EMAIL_PASS
    }
  });
  const mailOptions ={
    from:`"Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
    to: process.env.CONTACT_EMAIL,
    subject:`New Message from ${name}`,
    text: `
    Name: ${name}
    Email: ${email}
    Message:
    ${message},`,
    replyTo: email
    
  };
  try{
    await transporter.sendMail(mailOptions);
    res.send('Thank you! Your message has been sent.');
  } catch(error){
    console.error(error);
    res.status(500).send('Error sending message.Please try again later.')


  };



});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});