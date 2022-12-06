const sib = require('sib-api-v3-sdk')

const client = sib.ApiClient.instance

const apiKey = client.authentications['api-key']

apiKey.apiKey  = process.env.SENDBLUEAPI

const tranEmailApi = new sib.TransactionalEmailsApi()

const sender = {
    email: 'ajaxdev22@gmail.com'
}

const sendEmailToStudent = async(receiverEmail, qrcode) => {
    const receivers = [
        {
            email: receiverEmail,
        }
    ]
    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject:'Swu-Cite Qr Attendance System',
        htmlContent: "<html><body>Some content here<br><img src={{ params.LOGO_IMAGE_URL}} alt='logo' width='108' height='83'><br></body></html>",
        params:{
            LOGO_IMAGE_URL:qrcode.toString()
        },
    }).then('Email sent')
    .catch(console.log)
}

module.exports = sendEmailToStudent