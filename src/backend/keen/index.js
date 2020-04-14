const Keen = require('keen-tracking');

const client = new Keen({
	projectId: process.env.KEEN_PROJECT_ID,
	writeKey: process.env.KEEN_WRITE_KEY
});

exports.logActivity = (req, params) => {
	if (process.env.NODE_ENV === 'dev') return;

	return client.recordEvent('endpoints', {
		'protocol': req.protocol || '',
		'key': params.key || '',
		'accessibility': params.accessibility || '',
		'type': params.type || '',
		'participants': params.participants || '',
		'price': params.price || ''
	}, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
	});
}
