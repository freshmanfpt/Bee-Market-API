const re = /^[\w-\._\+%]+@fpt.edu.vn/;
const router = require("express").Router();
var mailerService = require("nodemailer");
const transporter = mailerService.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
      user: 'thanhptph12015@fpt.edu.vn',
      pass: 'mritachi123',
    },
});
router.post("/send", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    try {
      const status = await sendEmail(email,username);
      res.status(200).json(status);
    } catch (err) {
      res.status(500).json(err);
    }
});
router.post("/forgot", async (req, res) => {
    const email = req.body.email;
    const code = makeid();
    console.log(email);
    try {
        const status = await forgotEmail(email,code);
      res.status(200).json({email,code});
    } catch (err) {
      res.status(500).json(err);
    }
});
async function sendEmail(email, username) {
    if (re.test(email.toLowerCase())) {
        return await transporter.sendMail({
            to: email,
            from: '"BeeMarket" <no-reply@localhost>',
            subject: 'Tạo tài khoản trên Bee Market',
            html: `<h2>Tài khoản của bạn được tạo thành công bây giờ bạn có đăng nhập vào ứng dụng</h2>
                    <span>Tài khoản của bạn là ${username}`
                    ,
        });
    }
    else throw 'Invalid Mail';
};
async function forgotEmail(email,code) {
    if (re.test(email.toLowerCase())) {
        return await transporter.sendMail({
            to: email,
            from: '"Beemarket" <no-reply@localhost>',
            subject: 'Quên mật khẩu Bee Market',
            html: `
            <span>Mã đổi mật khẩu của bạn là <h3>${code}</h3></span></span><br>Form BeeMarketSupport</br>`,
        });
    }
    else throw 'Invalid Mail';
}

function makeid() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
module.exports = router;