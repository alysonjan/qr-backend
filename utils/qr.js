const QRCode = require('qrcode')
const generateQrCode = async (jsonData) => {
    try {
        const response = await QRCode.toDataURL(JSON.stringify(jsonData))
        return response
    } catch (err) {
        console.log(err.message)
    }
}

const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}



module.exports = {generateQrCode, dataURLtoFile };
