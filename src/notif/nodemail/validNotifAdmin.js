const { createTransporter } = require("../nodemail/transporter");
const sendConfirmationEmailAdmin = (userEmail) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: 'EasySchool <ruukazu@gmail.com>',
        to: userEmail,
        subject: 'Confirmacion de registro de Administrador',
        html: `
            <p>Estimado Administrado,</p>
            
            <p>Le extendemos un cordial saludo y le damos la bienvenida a la aplicación EasySchool.</p>
            
            <p>
                Agradecemos su participación y esperamos que disfrute de todos los beneficios que nuestra comunidad educativa tiene para ofrecer.
            </p>
            
            <p>Atentamente,</p>
            <p>El equipo de EasySchool</p>
            
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7lASO96V-SoGbSwGyJpHoF1OTaycauf-LL-gBRW76MDaSXT0DJc_h7gYA8_aQRqcyAI&usqp=CAU" alt="EasySchool Image">
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = {
    sendConfirmationEmailAdmin,
};