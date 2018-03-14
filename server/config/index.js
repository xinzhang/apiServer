import dev from './development';
import systest from './systest';
import uat from './uat';
import staging from './staging';
import prd from './production';

/* eslint-disable no-console */

let config;
let env = process.env.NODE_ENV || 'development';

switch (env) {
	case 'production':
		config = prd;
		break;

	case 'systest':
		config = systest;
		break;

	case 'development':
		config = dev;
		break;

	case 'uat':
		config = uat;
		break;

  case 'staging':
		config = staging;
		break;

	default:
		console.error('NODE_ENV environment variable not set');
		process.exit(1);
}

config.environment = env;

console.log("Running in environment: " + env + ' on port: ' + (process.env.PORT || config.port));

export default config;
