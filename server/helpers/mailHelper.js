let nodemailer = require('nodemailer');
import config from '../config';

export default class mailHelper {

	static sendEmail(to, subject, body) {
		return new Promise((resolve,reject) => {
			let transporter = nodemailer.createTransport('smtps://' + config.mailer.username + ':' + config.mailer.password + '@' + config.mailer.server);
			let mailOptions = {
				from: '"MyRadio API " <my-radio-noreply@sca.com.au>',
				to: to, // list of receivers
				subject: subject, // Subject line
				html: body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					reject(error);
				}
				resolve(info);
			});
		});
	}
}
