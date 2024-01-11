const nodemailer = require("nodemailer"); //Aquí creamos la función de email

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ivancodespace@gmail.com",
    pass: "leaz kksn lbfn qlpl",
  },
});

const sendEmail = async (nombre, correo, asunto, texto) => {
  try {
    const mailOptions = {
      from: "ivancodespace@gmail.com", //el correo que usamos para enviar los emails
      to: correo, //para quien va dirigido
      subject: asunto, //el asunto
      html: `<h1>${nombre}${texto}</h1>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("exito en el envío");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendEmail };
