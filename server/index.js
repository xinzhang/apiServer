"use strict";

/* eslint-disable no-console */

import restify from 'restify';
import config from './config';
import routes from './routes';
import logHelper from './helpers/logHelper';
import fs from 'fs';

// handle application shutdown gracefully
function gracefulShutdown() {
	logHelper.info("Shutting down the API server");
	process.exit();
}

let server = restify.createServer();

routes(server);

process.on('SIGTERM', gracefulShutdown);    // catch kill
process.on('SIGINT', gracefulShutdown);     // catch terminate (ctrl-c)

server.listen(process.env.PORT || config.port);

