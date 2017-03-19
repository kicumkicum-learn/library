const childProcess = require('child_process');

exec('npm run start.api');
exec('npm run start.ui');


/**
 * @param {string} command
 */
function exec(command) {
	const child = childProcess.exec(command);
	child.stdout.on('data', (data) => console.log(data.replace(/\n$/, '')));

	child.stderr.on('data', (data) => console.error(data));
	child.on('error', (err) => console.error(err));

	child.on('close', (code) => console.log(`${child.title} is closed. code: ${code}`));
}
