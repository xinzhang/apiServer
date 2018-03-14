import config from '../config/index';
import moment from 'moment';
import fs from 'fs';
import mailhelper from './mailHelper';

/* eslint-disable no-console */

export default class logHelper {
	static info(message) {

		let nowStr = moment().format("DD/MM/YYYY @ HH:mm:ss");
		if(config.environment === 'development') {
			// always log info messages to the console in dev
			console.log(`${nowStr}: (Information) ${(typeof message === 'object') ? JSON.stringify(message) : message}`);
		} else {
			if (config.logging.logLevel === "info") this.log("information", message);
		}
	}

	static warn(message) {
		if(config.logging.logLevel === "info" || config.logging.logLevel === "warn") this.log("warning",message);
	}

	static error(message) {
		this.log('error',message);
	}

	static exception(ex) {
		this.log('exception',`${ex.name}: ${ex.message}`);
	}

	static log(logType, message) {
		let nowStr = moment().format("DD/MM/YYYY @ HH:mm:ss");
		let logMessage = `${nowStr}: (${logType}) ${(typeof message === 'object') ? JSON.stringify(message) : message}`;

		switch(config.logging.mode) {
			case "logfile" :
				fs.appendFileSync(config.logging.logFilepath || "assetapi.log", logMessage);
				break;
			case "email" :
				mailhelper.sendEmail(config.logging.logEmail, 'Error in AssetAPI',logMessage);
				break;
			case "console" :
			default:
				console.log(logMessage);
				break;
		}
	}
}
