const Keen = require('keen-tracking');

const client = new Keen({
	projectId: process.env.KEEN_PROJECT_ID,
	writeKey: process.env.KEEN_WRITE_KEY
});

// TODO: Redo instrumentation

exports.logActivity = (req, params) => {
	if (process.env.NODE_ENV === 'dev') return;

	const {protocol, key, accessibility, type, participants, price} = params || {};

	return client.recordEvent('endpoints', {
		protocol,
		key,
		accessibility,
		type,
		participants,
		price
	}, err => {
		if (err) console.log(err);
	});
};
