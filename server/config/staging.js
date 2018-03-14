export default {
	port: 8080,
	logging: {
		mode: 'console',        // console, email, or logfile
		logLevel: 'info',       // info, warn, error
		logFilepath: 'assetapi.log',
		logEmail: 'dev-support@sca.com.au'
  },
	gcpRedis: {
		// DEV / TEST
		hostName: 'gcp_address',
		port: 6379,
		password: 'gcp_password',
		keepAliveIntervalMins: 2
  },
  contentApi: {
    url: 'http://contentapi.com'
  },
  firebase: {

  },
  mailer: {
    server: "smtp.dummy.mailserver.com",
    username: "username",
    password: "password"
  }
};
