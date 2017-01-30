// 引入 nodemailer
var nodemailer = require('nodemailer');
var config = require('config-lite');

// 创建一个SMTP客户端配置


// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config.mail);

// 创建一个邮件对象
var mail = {
    // 发件人
    from: 'DayCache <classTC@163.com>',
    // 主题
    subject: 'Hello DayCache',
    // 收件人
    to: '330223051@qq.com',
    // 邮件内容，HTML格式
    text: 'This from DayCache Mail'
};

// 发送邮件
transporter.sendMail(mail, function(error, info){
    if(error) return console.log(error);
    console.log('mail sent:', info.response);
});
