const sgMail = require('@sendgrid/mail')
const { EMAIL_API } = require('../configs/security')

sgMail.setApiKey(EMAIL_API)

const sendMail = async msg => {
  try {
    await sgMail.send(msg)

    console.log('email sent')
  } catch (err) {
    console.log(err.message)
  }
}

const sendQrCodeMail = async (receiverMail, qrcode) => {

  imageb64 = qrcode.replace('data:image/png;base64,' , ''); 

  const msg = {
    to: receiverMail,
    from: 'alpanambitan.swu@phinmaed.com',
    subject: "Swu-Cite Qr Attendance System",
    html :'<img src="cid:myimagecid" />',
    attachments: [
      {
        filename: "imageattachment.png",
        content: imageb64,
        content_id: "myimagecid",
      }
    ]

  }
  // const msg = {
  //   to: receiverMail,
  //   from: 'alpanambitan.swu@phinmaed.com',
  //   templateId: process.env.ALEN_TEMPLATE,
  //   dynamic_template_data: {
  //     qrcode: qrcode,
  //   },
  // }
  await sendMail(msg)
}

module.exports = sendQrCodeMail