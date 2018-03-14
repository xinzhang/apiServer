import config from '../config';
import myRadioRoutes from './myRadioRoutes';
import restify from 'restify';

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
	origins: ['*'],
	allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'key']
});

export default function(server) {
	server.pre(cors.preflight);
	server.use(cors.actual);
	server.use(restify.plugins.fullResponse());
	server.use(restify.plugins.queryParser());
	server.use(restify.plugins.jsonBodyParser({mapParams: true}));
	server.use(restify.plugins.gzipResponse());

	// myRadio routes
	myRadioRoutes(server);
}
