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
    from: 'ajaxdev22@gmail.com',
    templateId: 'd-25e2f36753a84d8ab5cbf82d8b86a93e',
    dynamic_template_data: {
      qrcode: qrcode,
    },
  }
  await sendMail(msg)
}

module.exports = sendQrCodeMail