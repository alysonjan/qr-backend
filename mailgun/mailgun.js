const nodeMailer = require('nodemailer')
const nodeMailGun = require('nodemailer-mailgun-transport')
// var request = require('request');
// const { dataURLtoFile } = require('../utils/qr')

// const auth = {
//     auth: {
//         api_key: 'f15ab5285446d26c3e6f654f51d59689-f2340574-3af49900',
//         domain: 'sandboxcc912d3419f24419af0df96da3b41d03.mailgun.org',
//     }
// }

// const transporter = nodeMailer.createTransport( nodeMailGun(auth) )



// const sendMailGun = async (receiverMail, qrcode) => { 
//     var file = dataURLtoFile(qrcode,'myqr.png')

//     const mailOptions = {
//         from : 'QR ATTENDANCE <swu-cite@gmail.com>',
//         to: receiverMail,
//         subject: 'Welcome to Swu-cite Qr Attendace System',
//         text: 'Testing some Mailgun awesomeness!',
//         html: '<img src="cid:myqr.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
//         attachment: file
//     }
//     transporter.sendMail(mailOptions, function(err, data){
//         if (err){
//             console.log('Error ', err)
//         }else {
//             console.log('Message sent!!')
//         }
//     })

// }

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'mervin.marvin44@ethereal.email',
//         pass: 'n2yvjfRVXVcwDMETYM'
//     }
// });

// nodeMailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodeMailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'mervin.marvin44@ethereal.email',
//             pass: 'n2yvjfRVXVcwDMETYM'
//         }
//     });
// });



const sendMailGun = async (receiverMail, qrcode) => { 

    var mailConfig;
    if (process.env.NODE_ENV === 'production' ){
        // all emails are delivered to destination
        mailConfig = {
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'real.user',
                pass: 'verysecret'
            }
        };
    } else {
        // all emails are catched by ethereal.email
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'mervin.marvin44@ethereal.email',
                pass: 'n2yvjfRVXVcwDMETYM'
            }
        };
        let transporter = nodeMailer.createTransport(mailConfig);

        const mailOptions = {
            from : 'SWU-CITE QR ATTENDANCE SYSTEM <swu-cite@gmail.com>',
            to: receiverMail,
            subject: 'Welcome to Swu-cite Qr Attendace System',
            html: `<div>
            <img src=${qrcode} alt="Girl in a jacket" width="300" height="300">
            <br>
            <a href="${qrcode}" target="_blank" rel="noopener noreferrer">Download your QR CODE here!</a>
            </div>`,
        }
        transporter.sendMail(mailOptions).then(info=>{
            console.log('Preview URL: ' + nodeMailer.getTestMessageUrl(info));
        });
        
    }

}


module.exports = sendMailGun