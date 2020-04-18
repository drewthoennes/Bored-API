/*
 * overwriteDBCollection.js
 * Overwrites a collection from your mLab instance\
 *
 * node overwriteDBCollection.js <collection> <input>
 *
 * @arg		collection	The name of the collection to be retrieved
 * @arg     input		The JSON to be used to overwite the collection
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

exec(`mongoimport -h ${MONGODB_HOST} -d ${MONGODB_DB} -c ${process.argv[2]} -u ${MONGODB_USERNAME} -p ${MONGODB_PASSWORD} --file ${process.argv[3]} --drop`).then((stdout, stderr) => {
	if (stderr && stderr !== '') throw new Error(stderr);

	console.log(chalk.green(`Successfully overwrote collection`));
}).catch(err => {
	console.log(chalk.red(err));
});
