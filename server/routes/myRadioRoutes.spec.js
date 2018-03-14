import restify from 'restify';
import routes from '../routes';
import config from '../config';
import request from 'supertest';
import {expect} from 'chai';

/* eslint-disable no-console */

describe('API endpoints', () => {
	let server;
	before((done) => {
		server = restify.createServer({
			name: 'MyRadioAPI.spec'
		});
		routes(server);
		done();
	});

	after((done) => {
		server.close();
		done();
	});

	describe('General', () => {
		it('should correctly access the test endpoint', (done) => {
			request(server)
				.get('/api/test')
				.expect(200, {status: 'ok'}, done);
		});
	});

	describe('Individual myradio api data', () => {
		it('should retrieve the default radio list', (done) => {
      let params = {
        lat: 35.966,
        lng: 120.23
      };
			let expected = {
			};
			request(server)
				.get(`/api/myradio/${params.lat}/${params.lng}`)
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, result) => {
					expect(err).to.not.exist;
					expect(result.text).to.exist;
					let res = JSON.parse(result.text);
					expect(expected).to.eql(res);
					done();
				});
		});
	});

});
