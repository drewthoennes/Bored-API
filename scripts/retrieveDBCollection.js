/*
 * retrieveDBCollection.js
 * Retrieves a collection from your mLab instance specified by the MONGODB_URI in the .env
 *
 * node retrieveDBCollection.js <collection> <output>
 *
 * @arg		collection	The name of the collection to be retrieved
 * @arg     output		The name of the output file
 */

require('module-alias/register');
const chalk = require('chalk')
const {
	exec,
	MONGODB_HOST,
	MONGODB_DB,
	MONGODB_USERNAME,
	MONGODB_PASSWORD
} = require('@s/utils');

if (process.argv.length < 4) {
	console.log(chalk.red('Invalid format: Missing necessary arguments'))
	return;
};

exec(`mongoexport -h ${MONGODB_HOST} -d ${MONGODB_DB} -c ${process.argv[2]} -u ${MONGODB_USERNAME} -p ${MONGODB_PASSWORD} -o ${process.argv[3]}`).then((stdout, stderr) => {
	if (stderr && stderr !== '') throw new Error(stderr);

	console.log(chalk.green(`Successfully retrieved collection as ${process.argv[3]}`));
}).catch(err => {
	console.log(chalk.red(err));
});
