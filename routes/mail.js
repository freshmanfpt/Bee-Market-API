const re = /^[\w-\._\+%]+@fpt.edu.vn/;
const router = require("express").Router();
var mailerService = require("nodemailer");
const transporter = mailerService.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
      user: 'beemarketpoly@gmail.com',
      pass: 'Thanh123',
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
    try {
        const status = await forgotEmail(email);
      res.status(200).json(status);
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
                    <span>Tài khoản của bạn là ${username}</span>`,
        });
    }
    else throw 'Invalid Mail';
};
async function forgotEmail(email) {
    if (re.test(email.toLowerCase())) {
        return await transporter.sendMail({
            to: email,
            from: '"Beemarket" <no-reply@localhost>',
            subject: 'Quên mật khẩu Bee Market',
            html: `<h4><a href="http://localhost:3000">Bấm vào đây để reset mật khẩu</a></h4>`,
        });
    }
    else throw 'Invalid Mail';
}
module.exports = router;