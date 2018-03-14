import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import logHelper from '../helpers/logHelper';

export default function(server) {
	server.get('/api/test', (req, res) => {
		res.json({status: 'ok'});
	});

	/**
	 * @api {get} /api/myradio/:lat/:lng Retrieve nearest stations using postcode
	 * @apiName getStationsByLatLng
	 * @apiGroup MyRadios
	 *
	 * @apiDescription This endpoint retrieves the stations list by lat lng
	 *
	 * @apiHeader {GUID}    key API key
	 *
	 * @apiParam {lat} latitude
   * @apiParam {lng} longitude
	 *
	 * @apiSuccess {String}   title         Station name
	 * @apiSuccess {String}   description   Station description
	 * @apiSuccess {String}   track         Station current playing track
	 * @apiSuccess {String}   imageUrl      Station current playing image URL
	 * @apiSuccess {Object}   station       Station properties as JSON object
	 * @apiSuccess {Number[]} coordinates   Station GPS co-ordinates as longitude/latitude pair
	 *
	 * @apiError (InternalServerError) {String} 500  Description of internal server error
	 *
	 */
	server.get('/api/myradio/:lat/:lng', (req, res) => {
    logHelper.info(`retrieve myradios by lat lng: ${req.params.lat}, ${req.params.lng} `);
    res.json({});
  });

}
