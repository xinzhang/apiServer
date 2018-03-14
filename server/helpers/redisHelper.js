import redis from 'redis';
import logHelper from '../helpers/logHelper';
import config from '../config/index';

// define the redisHelper API
// ------------------------

class redisCacheClass {
	constructor() {
		this.opt = {
			port: config.gcpRedis.port,
			host: config.gcpRedis.hostName,
      password: config.gcpRedis.password,

			retry_strategy: function (options) {
				logHelper.info(`retry_strategy called with ${JSON.stringify(options,null,4)}`);
				if (options.error && options.error.code === 'ECONNREFUSED') {
					// End reconnecting on a specific error and flush all commands with a individual error
					return new Error('The server refused the connection');
				}
				if (options.total_retry_time > 1000 * 60 * 60) {
					// End reconnecting after a specific timeout and flush all commands with a individual error
					return new Error('Retry time exhausted');
				}
				if (options.times_connected > 10) {
					// End reconnecting with built in error
					return undefined;
				}
				// reconnect after
				return Math.min(options.attempt * 1000, 3000);
			}
    };

    if(!config.gcpRedis.password) delete this.opt.password;

		this._dbConnection = redis.createClient(this.opt);

		this._dbConnection.on("error", function (err) {
			if (typeof err === 'string' || err instanceof String) {
				logHelper.error(`Redis Error: ${err}`);
			} else {
				logHelper.error(`Redis Error: ${JSON.stringify(err)}`);
			}
    });

    this._client.on("reconnecting", function(msg) {
			logHelper.info(`redis client reconnecting: ${JSON.stringify(msg)}`);
		});

		this._client.on("end", function(msg) {
			logHelper.info(`redis connection has emitted an end status with message: ${msg}`);
		});

		setInterval(() => { this.ensureConnected(config.azureRedis.password); }, 1000 * 60 * (config.azureRedis.keepAliveIntervalMins || 2));
	}

	ensureConnected() {
		logHelper.info('ensuring redis connection ');
		this._dbConnection.auth(config.azureRedis.password, (msg) => {
			logHelper.info(`auth completed with: ${JSON.stringify(msg)}`);
		});
	}

	get client() {
		return this._dbConnection;
	}
}

let redisClient = new redisCacheClass();

// ensure the API is never changed
// -------------------------------

Object.freeze(redisClient);

// export the redisHelper API only
// -----------------------------

export default redisClient;
