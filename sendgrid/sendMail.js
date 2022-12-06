const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.EMAIL_API)

const sendMail = async msg => {
  try {
    await sgMail.send(msg)
    console.log('email sent')
  } catch (err) {
    console.log(err.message)
  }
}

const sendQrCodeMail = async (receiverMail, qrcode) => {
  console.log(receiverMail)
  const msg = {
    to: receiverMail,
    from: 'alpanambitan.swu@phinmaed.com',
    templateId: process.env.ALEN_TEMPLATE,
    dynamic_template_data: {
      qrcode: qrcode,
    },
  }
  await sendMail(msg)
}

module.exports = sendQrCodeMail