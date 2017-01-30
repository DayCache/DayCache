var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(config.mail);

module.exports = function(mail){
    // 应用默认配置
    mail = _.merge({}, defaultMail, mail);

    // 发送邮件
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};
